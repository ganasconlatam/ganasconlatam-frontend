// Utilidades de saneamiento reutilizables en cliente y servidor.
// No usa "use server" ni APIs de Node, por lo que es seguro importar en componentes cliente.

// Devuelve la URL solo si es un esquema seguro para usar como href o src.
// Bloquea vectores XSS como javascript:, vbscript:, data:text/html, etc.
// Se permiten enlaces http(s) y comprobantes subidos como data:image/*.
export function safeHref(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^data:image\/(png|jpe?g|gif|webp|avif);/i.test(trimmed)) return trimmed;
  return undefined;
}

// Validación básica de correo electrónico.
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// Escapa caracteres HTML para prevenir inyección en plantillas de correo.
export function escapeHtml(input: string): string {
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Tamaño máximo permitido para un comprobante en data URL (~4 MB en base64).
export const MAX_PROOF_CHARS = 4 * 1024 * 1024 * 1.4;
