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
    await sendEmail({
      to: order.buyerEmail,
      subject: "¡Tu compra fue aprobada! · Ganas con Latam",
      html: emailPagoAprobado({
        nombre: order.buyerName,
        titulo: order.raffle.title,
        imagenUrl: order.raffle.imageUrl,
        numeros: order.ticketNumbers.split(",").join(", "),
        totalBs: order.amountBs,
        totalUsd: order.amountUsd,
        referencia: order.reference,
      }),
    });
  }

  revalidatePath("/admin/boletos");
  revalidatePath("/admin");
  revalidatePath("/admin/participantes");
  revalidatePath("/admin/rifas");
  revalidatePath("/");
}

export async function rejectOrder(id: string) {
  await requireAdmin();
  const order = await prisma.ticketOrder.update({
    where: { id },
    data: { status: "RECHAZADO" },
    include: { raffle: true },
  });

  if (order.buyerEmail) {
    await sendEmail({
      to: order.buyerEmail,
      subject: "Sobre tu compra en Ganas con Latam",
      html: emailPagoRechazado({
        nombre: order.buyerName,
        titulo: order.raffle.title,
        imagenUrl: order.raffle.imageUrl,
        numeros: order.ticketNumbers.split(",").join(", "),
        totalBs: order.amountBs,
        totalUsd: order.amountUsd,
        referencia: order.reference,
        motivo,
      }),
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
  await sendEmail({
    to: order.buyerEmail,
    subject: "Recibimos tu compra — pendiente de aprobación · Ganas con Latam",
    html: emailVerificacionPago({
      nombre: order.buyerName,
      titulo: order.raffle.title,
      imagenUrl: order.raffle.imageUrl,
      numeros: order.ticketNumbers.split(",").join(", "),
      totalBs: order.amountBs,
      totalUsd: order.amountUsd,
      referencia: order.reference,
    }),
  });
}

export async function deleteOrder(id: string) {
  await requireAdmin();
  await prisma.ticketOrder.delete({ where: { id } });
  revalidatePath("/admin/boletos");
}
