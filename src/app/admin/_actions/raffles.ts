"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { RaffleStatus } from "@prisma/client";

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
  await prisma.raffle.create({ data });
  revalidatePath("/admin/rifas");
  revalidatePath("/");
  redirect("/admin/rifas");
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
