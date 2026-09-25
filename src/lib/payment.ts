// Utilidades para los datos dinámicos de los métodos de pago.
// Cada método guarda una lista de pares { label, value } (ej. "Correo" -> "x@gmail.com").
// Compatible cliente/servidor (sin "use server").

export interface PaymentField {
  label: string;
  value: string;
}

const MAX_LABEL = 60;
const MAX_VALUE = 200;
const MAX_FIELDS = 20;

// Normaliza cualquier entrada (JSON string o array) a una lista validada de pares.
export function normalizePaymentFields(raw: unknown): PaymentField[] {
  let arr: unknown = raw;
  if (typeof raw === "string") {
    try {
      arr = JSON.parse(raw);
    } catch {
      return [];
    }
  }
  if (!Array.isArray(arr)) return [];

  const out: PaymentField[] = [];
  for (const item of arr) {
    if (!item || typeof item !== "object") continue;
    const rec = item as Record<string, unknown>;
    const label = String(rec.label ?? "").trim().slice(0, MAX_LABEL);
    const value = String(rec.value ?? "").trim().slice(0, MAX_VALUE);
    if (!label && !value) continue;
    out.push({ label, value });
    if (out.length >= MAX_FIELDS) break;
  }
  return out;
}

// Datos antiguos guardados como texto "Etiqueta: valor" por línea (compatibilidad).
export function parseLegacyDetails(details: string): PaymentField[] {
  return details
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const idx = line.indexOf(":");
      if (idx > 0) {
        return { label: line.slice(0, idx).trim(), value: line.slice(idx + 1).trim() };
      }
      return { label: "", value: line };
    });
}

// Versión de texto para la columna legacy `details`.
export function fieldsToText(fields: PaymentField[]): string {
  return fields.map((f) => (f.label ? `${f.label}: ${f.value}` : f.value)).join("\n");
}

// Resuelve los datos a mostrar: estructurados primero, texto legacy como respaldo.
export function resolvePaymentFields(
  fields: unknown,
  details: string | null | undefined,
): PaymentField[] {
  const structured = normalizePaymentFields(fields);
  if (structured.length > 0) return structured;
  return details ? parseLegacyDetails(details) : [];
}
