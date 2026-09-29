"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { RaffleStatus } from "@prisma/client";
import { sendEmail, emailNuevoSorteo } from "@/lib/email";

export async function getRaffles() {
  return prisma.raffle.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getRaffle(id: string) {
  return prisma.raffle.findUnique({ where: { id } });
}

function parseRaffleForm(formData: FormData) {
  return {
    code: String(formData.get("code") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    details: String(formData.get("details") ?? ""),
    imageUrl: String(formData.get("imageUrl") ?? ""),
    priceUsd: parseFloat(String(formData.get("priceUsd") ?? "0")) || 0,
    progress: parseFloat(String(formData.get("progress") ?? "0")) || 0,
    totalTickets: parseInt(String(formData.get("totalTickets") ?? "1000")) || 1000,
    drawDate: String(formData.get("drawDate") ?? ""),
    drawTime: String(formData.get("drawTime") ?? ""),
    status: String(formData.get("status") ?? "PROXIMA") as RaffleStatus,
  };
}

export async function createRaffle(formData: FormData) {
  await requireAdmin();
  const data = parseRaffleForm(formData);
  const raffle = await prisma.raffle.create({ data });

  // Avisar a los participantes con correo que se liberó un nuevo sorteo.
  await notifyNewRaffle(raffle);

  revalidatePath("/admin/rifas");
  revalidatePath("/");
  redirect("/admin/rifas");
}

// Notifica por correo a todos los participantes registrados (con email válido)
// que hay un nuevo sorteo disponible. Los fallos de envío no bloquean la creación.
async function notifyNewRaffle(raffle: {
  title: string;
  details: string;
  imageUrl: string;
  priceUsd: number;
  drawDate: string;
  drawTime: string;
  code: string;
}) {
  try {
    const participants = await prisma.participant.findMany({
      where: { email: { not: "" } },
      select: { email: true },
      distinct: ["email"],
    });
    const recipients = participants
      .map((p) => p.email.trim())
      .filter((e) => e.includes("@"));
    if (recipients.length === 0) return;

    const config = await prisma.siteConfig.findUnique({ where: { id: 1 } });
    const rate = config?.dollarRate ?? 0;

    const { html, attachments } = emailNuevoSorteo({
      titulo: raffle.title,
      descripcion: raffle.details,
      imagenUrl: raffle.imageUrl,
      precioUsd: raffle.priceUsd,
      precioBs: rate > 0 ? raffle.priceUsd * rate : undefined,
      fecha: raffle.drawDate,
      hora: raffle.drawTime,
      codigo: raffle.code,
    });

    for (const to of recipients) {
      await sendEmail({
        to,
        subject: `Nuevo sorteo disponible: ${raffle.title} · Ganas con Latam`,
        html,
        attachments,
        tags: [{ name: "tipo", value: "nuevo-sorteo" }],
        idempotencyKey: `nuevo-sorteo-${raffle.code}-${to}`,
      });
    }
  } catch (err) {
    console.error("[v0] Error notificando nuevo sorteo:", err);
  }
}

export async function updateRaffle(id: string, formData: FormData) {
  await requireAdmin();
  const data = parseRaffleForm(formData);
  await prisma.raffle.update({ where: { id }, data });
  revalidatePath("/admin/rifas");
  revalidatePath(`/admin/rifas/${id}`);
  revalidatePath("/");
  redirect("/admin/rifas");
}

export async function deleteRaffle(id: string) {
  await requireAdmin();
  await prisma.ticketOrder.deleteMany({ where: { raffleId: id } });
  await prisma.raffle.delete({ where: { id } });
  revalidatePath("/admin/rifas");
  revalidatePath("/");
}

// Cierre manual de la rifa seleccionando el ticket ganador
export async function closeRaffle(id: string, winnerTicket: string) {
  await requireAdmin();
  await prisma.raffle.update({
    where: { id },
    data: { status: "FINALIZADA", winnerTicket: winnerTicket.trim() },
  });
  revalidatePath("/admin/rifas");
  revalidatePath(`/admin/rifas/${id}`);
  revalidatePath("/");
}
