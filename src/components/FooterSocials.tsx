"use client";

import { usePurchase } from "./PurchaseContext";
import { safeHref } from "@/lib/safe";

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TiktokIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="lucide lucide-tiktok">
      <path d="M16 8.245a6.5 6.5 0 0 0 4 1.373V6.5a3.5 3.5 0 0 1-3.5-3.5H13.2v11.9a2.3 2.3 0 1 1-2.3-2.3c.16 0 .316.016.47.046V9.53A5.6 5.6 0 0 0 10.9 9.5a5.4 5.4 0 1 0 5.4 5.4z" />
    </svg>
  );
}

function SocialIcon({
  href,
  enabled,
  label,
  children,
}: {
  href: string;
  enabled: boolean;
  label: string;
  children: React.ReactNode;
}) {
  const safe = safeHref(href);
  const active = enabled && !!safe;

  const base =
    "w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg border";

  if (!active) {
    // Visible aunque esté desactivado: se muestra atenuado y no navega.
    return (
      <span
        aria-disabled="true"
        title={`${label} (desactivado)`}
        className={`${base} bg-slate-900/60 text-slate-600 border-slate-800 cursor-not-allowed opacity-50`}
      >
        {children}
      </span>
    );
  }

  return (
    <a
      href={safe}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className={`${base} bg-slate-900 text-slate-400 border-slate-800 hover:bg-[var(--color-primary)] hover:text-slate-900 hover:-translate-y-1 hover:border-transparent`}
    >
      {children}
    </a>
  );
}

export default function FooterSocials() {
  const { socialLinks } = usePurchase();
  const instagram = socialLinks.find((s) => s.platform === "instagram");
  const tiktok = socialLinks.find((s) => s.platform === "tiktok");

  return (
    <div className="flex gap-6">
      <SocialIcon href={instagram?.url ?? ""} enabled={!!instagram?.enabled} label="Instagram">
        <InstagramIcon />
      </SocialIcon>
      <SocialIcon href={tiktok?.url ?? ""} enabled={!!tiktok?.enabled} label="TikTok">
        <TiktokIcon />
      </SocialIcon>
    </div>
  );
}
