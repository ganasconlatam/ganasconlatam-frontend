"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getConfig() {
  return prisma.siteConfig.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });
}

export async function updateConfig(formData: FormData) {
  await requireAdmin();
  const dollarRate = parseFloat(String(formData.get("dollarRate") ?? "0")) || 0;
  const buttonColor = String(formData.get("buttonColor") ?? "#f8f400");
  const borderColor = String(formData.get("borderColor") ?? "#f8f400");
  const frameColor = String(formData.get("frameColor") ?? "#151f32");

  await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: { dollarRate, buttonColor, borderColor, frameColor },
    create: { id: 1, dollarRate, buttonColor, borderColor, frameColor },
  });

  revalidatePath("/admin/configuracion");
  revalidatePath("/");
}

// ---- Redes sociales ----
export async function getSocialLinks() {
  return prisma.socialLink.findMany({ orderBy: { order: "asc" } });
}

export async function createSocialLink(formData: FormData) {
  await requireAdmin();
  await prisma.socialLink.create({
    data: {
      platform: String(formData.get("platform") ?? "whatsapp"),
      url: String(formData.get("url") ?? ""),
      enabled: formData.get("enabled") === "on",
      order: parseInt(String(formData.get("order") ?? "0")) || 0,
    },
  });
  revalidatePath("/admin/configuracion");
  revalidatePath("/");
}

export async function updateSocialLink(id: string, formData: FormData) {
  await requireAdmin();
  await prisma.socialLink.update({
    where: { id },
    data: {
      platform: String(formData.get("platform") ?? "whatsapp"),
      url: String(formData.get("url") ?? ""),
      enabled: formData.get("enabled") === "on",
      order: parseInt(String(formData.get("order") ?? "0")) || 0,
    },
  });
  revalidatePath("/admin/configuracion");
  revalidatePath("/");
}

export async function toggleSocialLink(id: string, enabled: boolean) {
  await requireAdmin();
  await prisma.socialLink.update({ where: { id }, data: { enabled } });
  revalidatePath("/admin/configuracion");
  revalidatePath("/");
}

export async function deleteSocialLink(id: string) {
  await requireAdmin();
  await prisma.socialLink.delete({ where: { id } });
  revalidatePath("/admin/configuracion");
  revalidatePath("/");
}
