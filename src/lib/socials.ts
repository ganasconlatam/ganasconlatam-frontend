// Plataformas gestionadas con un campo fijo cada una:
// - whatsapp  -> botón "Únete a nuestra comunidad" (página principal)
// - telegram  -> botón flotante de soporte al cliente
// - instagram -> ícono del footer
// - tiktok    -> ícono del footer
export const SOCIAL_PLATFORMS = ["whatsapp", "telegram", "instagram", "tiktok"] as const;
export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number];

export type SocialsMap = Record<SocialPlatform, { url: string; enabled: boolean }>;

export const SOCIAL_ORDER: Record<SocialPlatform, number> = {
  whatsapp: 0,
  telegram: 1,
  instagram: 2,
  tiktok: 3,
};
