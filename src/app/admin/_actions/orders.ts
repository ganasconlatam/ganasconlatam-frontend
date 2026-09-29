"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import {
  sendEmail,
  emailVerificacionPago,
  emailPagoAprobado,
  emailPagoRechazado,
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

  if (order.buyerEmail) {
    const { html, attachments } = emailPagoAprobado({
      nombre: order.buyerName,
      titulo: order.raffle.title,
      imagenUrl: order.raffle.imageUrl,
      numeros: order.ticketNumbers.split(",").join(", "),
      totalBs: order.amountBs,
      totalUsd: order.amountUsd,
      referencia: order.reference,
    });
    await sendEmail({
      to: order.buyerEmail,
      subject: "¡Tu compra fue aprobada! · Ganas con Latam",
      html,
      attachments,
      tags: [{ name: "tipo", value: "compra-aprobada" }],
      idempotencyKey: `aprobado-${order.id}`,
    });
  }

  revalidatePath("/admin/boletos");
  revalidatePath("/admin");
  revalidatePath("/admin/participantes");
  revalidatePath("/admin/rifas");
  revalidatePath("/");
}

export async function rejectOrder(id: string, formData?: FormData) {
  await requireAdmin();
  const motivo = (formData?.get("motivo") as string | null)?.trim() || undefined;
  const order = await prisma.ticketOrder.update({
    where: { id },
    data: { status: "RECHAZADO" },
    include: { raffle: true },
  });

  if (order.buyerEmail) {
    const { html, attachments } = emailPagoRechazado({
      nombre: order.buyerName,
      titulo: order.raffle.title,
      imagenUrl: order.raffle.imageUrl,
      numeros: order.ticketNumbers.split(",").join(", "),
      totalBs: order.amountBs,
      totalUsd: order.amountUsd,
      referencia: order.reference,
      motivo,
    });
    await sendEmail({
      to: order.buyerEmail,
      subject: "Sobre tu compra en Ganas con Latam",
      html,
      attachments,
      tags: [{ name: "tipo", value: "compra-rechazada" }],
      idempotencyKey: `rechazado-${order.id}`,
    });
  }

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
  if (!order || !order.buyerEmail) return;
  const { html, attachments } = emailVerificacionPago({
    nombre: order.buyerName,
    titulo: order.raffle.title,
    imagenUrl: order.raffle.imageUrl,
    numeros: order.ticketNumbers.split(",").join(", "),
    totalBs: order.amountBs,
    totalUsd: order.amountUsd,
    referencia: order.reference,
  });
  await sendEmail({
    to: order.buyerEmail,
    subject: "Recibimos tu compra — pendiente de aprobación · Ganas con Latam",
    html,
    attachments,
    tags: [{ name: "tipo", value: "compra-pendiente" }],
  });
}

export async function deleteOrder(id: string) {
  await requireAdmin();
  await prisma.ticketOrder.delete({ where: { id } });
  revalidatePath("/admin/boletos");
}
