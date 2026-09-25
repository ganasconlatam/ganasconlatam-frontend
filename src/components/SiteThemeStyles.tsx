"use client";

import { usePurchase } from "./PurchaseContext";

function hexToRgb(hex: string): string {
  const m = hex.replace("#", "").match(/^([0-9a-fA-F]{6})$/);
  if (!m) return "248,244,0";
  const int = parseInt(m[1], 16);
  return `${(int >> 16) & 255},${(int >> 8) & 255},${int & 255}`;
}

// Inyecta los colores gestionados desde el panel administrativo como variables
// CSS globales, de modo que botones, bordes, marcos y la barra de progreso
// (que ya usan var(--color-primary) / var(--color-surface)) se actualicen.
export default function SiteThemeStyles() {
  const { config } = usePurchase();
  if (!config) return null;

  const primary = config.buttonColor || "#f8f400";
  const border = config.borderColor || "#f8f400";
  const frame = config.frameColor || "#151f32";

  const css = `:root{
    --color-primary:${primary};
    --color-primary-dark:${primary};
    --color-primary-rgb:${hexToRgb(primary)};
    --color-secondary:${primary};
    --color-border-accent:${border};
    --color-border-accent-rgb:${hexToRgb(border)};
    --color-surface:${frame};
    --color-progress:${primary};
  }`;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
