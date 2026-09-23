"use client";

import { usePurchase } from "./PurchaseContext";
import { safeHref } from "@/lib/safe";

// Botón flotante de soporte al cliente (Telegram), gestionado desde el panel
// administrativo en Configuración global > Redes sociales.
export default function FloatingSupport() {
  const { socialLinks } = usePurchase();
  const telegram = socialLinks.find((s) => s.platform === "telegram");
  const href = safeHref(telegram?.url ?? "");

  if (!telegram?.enabled || !href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-[9998] bg-[#0088cc] hover:bg-[#0077b5] text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center group animate-in zoom-in duration-300"
      title="Contáctanos por Telegram"
      aria-label="Soporte al cliente por Telegram"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send fill-white text-[#0088cc] ml-0.5">
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </svg>
      <span className="absolute right-full mr-4 bg-white text-slate-900 px-3 py-1 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
        ¡Hola! ¿En qué podemos ayudarte?
      </span>
    </a>
  );
}
