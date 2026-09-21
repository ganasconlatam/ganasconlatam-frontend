"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getParticipants() {
  return prisma.participant.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { orders: true } } },
  });
}

export async function createParticipant(formData: FormData) {
  await requireAdmin();
  await prisma.participant.create({
    data: {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? ""),
      cedula: String(formData.get("cedula") ?? ""),
    },
  });
  revalidatePath("/admin/participantes");
}

export async function updateParticipant(id: string, formData: FormData) {
  await requireAdmin();
  await prisma.participant.update({
    where: { id },
    data: {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? ""),
      cedula: String(formData.get("cedula") ?? ""),
    },
  });
  revalidatePath("/admin/participantes");
}

export async function deleteParticipant(id: string) {
  await requireAdmin();
  await prisma.participant.delete({ where: { id } });
  revalidatePath("/admin/participantes");
}
