"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { safeHref, MAX_PROOF_CHARS } from "@/lib/safe";
import { normalizePaymentFields, fieldsToText } from "@/lib/payment";
import type { Prisma } from "@prisma/client";

export async function getPaymentMethods() {
  return prisma.paymentMethod.findMany({ orderBy: { order: "asc" } });
}

// Sanea la imagen/ícono del método de pago: solo data:image/* o http(s), con límite de tamaño.
function sanitizeImage(raw: string): string {
  const value = raw.trim();
  if (!value) return "";
  if (value.length > MAX_PROOF_CHARS) return "";
  return safeHref(value) ?? "";
}

export async function createPaymentMethod(formData: FormData) {
  await requireAdmin();
  const fields = normalizePaymentFields(String(formData.get("fields") ?? "[]"));
  await prisma.paymentMethod.create({
    data: {
      name: String(formData.get("name") ?? "").trim(),
      type: String(formData.get("type") ?? "otro"),
      fields: fields as unknown as Prisma.InputJsonValue,
      details: fieldsToText(fields),
      imageUrl: sanitizeImage(String(formData.get("imageUrl") ?? "")),
      enabled: formData.get("enabled") === "on",
      order: parseInt(String(formData.get("order") ?? "0")) || 0,
    },
  });
  revalidatePath("/admin/metodos-pago");
  revalidatePath("/");
}

export async function updatePaymentMethod(id: string, formData: FormData) {
  await requireAdmin();
  const newImage = sanitizeImage(String(formData.get("imageUrl") ?? ""));
  const removeImage = formData.get("removeImage") === "on";
  const fields = normalizePaymentFields(String(formData.get("fields") ?? "[]"));
  await prisma.paymentMethod.update({
    where: { id },
    data: {
      name: String(formData.get("name") ?? "").trim(),
      type: String(formData.get("type") ?? "otro"),
      fields: fields as unknown as Prisma.InputJsonValue,
      details: fieldsToText(fields),
      ...(newImage ? { imageUrl: newImage } : removeImage ? { imageUrl: "" } : {}),
      enabled: formData.get("enabled") === "on",
      order: parseInt(String(formData.get("order") ?? "0")) || 0,
    },
  });
  revalidatePath("/admin/metodos-pago");
  revalidatePath("/");
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
