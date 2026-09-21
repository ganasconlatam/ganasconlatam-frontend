"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getPaymentMethods() {
  return prisma.paymentMethod.findMany({ orderBy: { order: "asc" } });
}

export async function createPaymentMethod(formData: FormData) {
  await requireAdmin();
  await prisma.paymentMethod.create({
    data: {
      name: String(formData.get("name") ?? "").trim(),
      type: String(formData.get("type") ?? "otro"),
      details: String(formData.get("details") ?? ""),
      enabled: formData.get("enabled") === "on",
      order: parseInt(String(formData.get("order") ?? "0")) || 0,
    },
  });
  revalidatePath("/admin/metodos-pago");
}

export async function updatePaymentMethod(id: string, formData: FormData) {
  await requireAdmin();
  await prisma.paymentMethod.update({
    where: { id },
    data: {
      name: String(formData.get("name") ?? "").trim(),
      type: String(formData.get("type") ?? "otro"),
      details: String(formData.get("details") ?? ""),
      enabled: formData.get("enabled") === "on",
      order: parseInt(String(formData.get("order") ?? "0")) || 0,
    },
  });
  revalidatePath("/admin/metodos-pago");
}

export async function togglePaymentMethod(id: string, enabled: boolean) {
  await requireAdmin();
  await prisma.paymentMethod.update({ where: { id }, data: { enabled } });
  revalidatePath("/admin/metodos-pago");
}

export async function deletePaymentMethod(id: string) {
  await requireAdmin();
  await prisma.paymentMethod.delete({ where: { id } });
  revalidatePath("/admin/metodos-pago");
}
