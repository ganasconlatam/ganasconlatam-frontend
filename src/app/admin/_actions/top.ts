"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getTopPurchases() {
  return prisma.topPurchase.findMany({ orderBy: { position: "asc" } });
}

export async function createTopPurchase(formData: FormData) {
  await requireAdmin();
  await prisma.topPurchase.create({
    data: {
      position: parseInt(String(formData.get("position") ?? "1")) || 1,
      name: String(formData.get("name") ?? "").trim(),
      detail: String(formData.get("detail") ?? ""),
      amount: parseFloat(String(formData.get("amount") ?? "0")) || 0,
    },
  });
  revalidatePath("/admin/top");
  revalidatePath("/");
}

export async function updateTopPurchase(id: string, formData: FormData) {
  await requireAdmin();
  await prisma.topPurchase.update({
    where: { id },
    data: {
      position: parseInt(String(formData.get("position") ?? "1")) || 1,
      name: String(formData.get("name") ?? "").trim(),
      detail: String(formData.get("detail") ?? ""),
      amount: parseFloat(String(formData.get("amount") ?? "0")) || 0,
    },
  });
  revalidatePath("/admin/top");
  revalidatePath("/");
}

export async function deleteTopPurchase(id: string) {
  await requireAdmin();
  await prisma.topPurchase.delete({ where: { id } });
  revalidatePath("/admin/top");
  revalidatePath("/");
}
