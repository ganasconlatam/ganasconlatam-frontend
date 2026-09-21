"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import {
  sendEmail,
  emailVerificacionPago,
  emailPagoAprobado,
} from "@/lib/email";

export async function getOrders(status?: "PENDIENTE" | "APROBADO" | "RECHAZADO") {
  return prisma.ticketOrder.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
    include: { raffle: true, paymentMethod: true },
  });
}

// Aprobar manualmente el comprobante -> envía correo de pago aprobado
export async function approveOrder(id: string) {
  await requireAdmin();
  const order = await prisma.ticketOrder.update({
    where: { id },
    data: { status: "APROBADO" },
    include: { raffle: true },
  });

  await sendEmail({
    to: order.buyerEmail,
    subject: "Pago aprobado - Ganas con Latam",
    html: emailPagoAprobado(
      order.buyerName,
      order.raffle.title,
      order.ticketNumbers
    ),
  });

  revalidatePath("/admin/boletos");
  revalidatePath("/admin");
  revalidatePath("/admin/participantes");
  revalidatePath("/admin/rifas");
  revalidatePath("/");
}

export async function rejectOrder(id: string) {
  await requireAdmin();
  await prisma.ticketOrder.update({
    where: { id },
    data: { status: "RECHAZADO" },
  });
  revalidatePath("/admin/boletos");
  revalidatePath("/admin");
  revalidatePath("/admin/participantes");
  revalidatePath("/admin/rifas");
  revalidatePath("/");
}

// Reenviar el correo de verificación de pago al comprador
export async function resendVerificationEmail(id: string) {
  await requireAdmin();
  const order = await prisma.ticketOrder.findUnique({
    where: { id },
    include: { raffle: true },
  });
  if (!order) return;
  await sendEmail({
    to: order.buyerEmail,
    subject: "Verificación de pago en proceso - Ganas con Latam",
    html: emailVerificacionPago(order.buyerName, order.raffle.title),
  });
}

export async function deleteOrder(id: string) {
  await requireAdmin();
  await prisma.ticketOrder.delete({ where: { id } });
  revalidatePath("/admin/boletos");
}
