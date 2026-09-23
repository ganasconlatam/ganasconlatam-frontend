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

// ---- Tasa del día (sección independiente) ----
export async function updateDollarRate(formData: FormData) {
  await requireAdmin();
  const dollarRate = parseFloat(String(formData.get("dollarRate") ?? "0")) || 0;
  await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: { dollarRate },
    create: { id: 1, dollarRate },
  });
  revalidatePath("/admin/configuracion");
  revalidatePath("/");
}

// ---- Colores del sitio (sección independiente) ----
export async function updateColors(formData: FormData) {
  await requireAdmin();
  const buttonColor = String(formData.get("buttonColor") ?? "#f8f400");
  const borderColor = String(formData.get("borderColor") ?? "#f8f400");
  const frameColor = String(formData.get("frameColor") ?? "#151f32");
  await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: { buttonColor, borderColor, frameColor },
    create: { id: 1, buttonColor, borderColor, frameColor },
  });
  revalidatePath("/admin/configuracion");
  revalidatePath("/");
}

// ---- Redes sociales (sección independiente) ----
// Plataformas gestionadas con un campo fijo cada una:
// - whatsapp  -> botón "Únete a nuestra comunidad" (página principal)
// - telegram  -> botón flotante de soporte al cliente
// - instagram -> ícono del footer
// - tiktok    -> ícono del footer
export const SOCIAL_PLATFORMS = ["whatsapp", "telegram", "instagram", "tiktok"] as const;
export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number];

export type SocialsMap = Record<SocialPlatform, { url: string; enabled: boolean }>;

export async function getSocials(): Promise<SocialsMap> {
  const links = await prisma.socialLink.findMany();
  const map = Object.fromEntries(
    SOCIAL_PLATFORMS.map((p) => [p, { url: "", enabled: false }]),
  ) as SocialsMap;
  for (const l of links) {
    if ((SOCIAL_PLATFORMS as readonly string[]).includes(l.platform)) {
      map[l.platform as SocialPlatform] = { url: l.url, enabled: l.enabled };
    }
  }
  return map;
}

async function upsertSocial(platform: string, url: string, enabled: boolean, order: number) {
  const existing = await prisma.socialLink.findFirst({ where: { platform } });
  if (existing) {
    await prisma.socialLink.update({
      where: { id: existing.id },
      data: { url, enabled, order },
    });
  } else {
    await prisma.socialLink.create({ data: { platform, url, enabled, order } });
  }
}

export async function updateSocials(formData: FormData) {
  await requireAdmin();
  const order: Record<SocialPlatform, number> = {
    whatsapp: 0,
    telegram: 1,
    instagram: 2,
    tiktok: 3,
  };
  for (const p of SOCIAL_PLATFORMS) {
    const url = String(formData.get(`${p}_url`) ?? "").trim();
    const enabled = formData.get(`${p}_enabled`) === "on";
    await upsertSocial(p, url, enabled, order[p]);
  }
  revalidatePath("/admin/configuracion");
  revalidatePath("/");
}
