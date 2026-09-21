import "server-only";

// Envío de correos. Usa Resend si RESEND_API_KEY está configurado.
// Si no está configurado, registra el correo en consola (modo desarrollo)
// para que el flujo siga funcionando hasta conectar el proveedor.
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM = process.env.EMAIL_FROM || "Ganas con Latam <onboarding@resend.dev>";

interface SendArgs {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendArgs): Promise<{ ok: boolean; skipped?: boolean }> {
  if (!RESEND_API_KEY) {
    console.log("[v0] Email (no RESEND_API_KEY, no enviado):", { to, subject });
    return { ok: true, skipped: true };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: FROM, to, subject, html }),
    });
    if (!res.ok) {
      console.error("[v0] Error enviando email:", await res.text());
      return { ok: false };
    }
    return { ok: true };
  } catch (err) {
    console.error("[v0] Excepción enviando email:", err);
    return { ok: false };
  }
}

export function emailVerificacionPago(nombre: string, rifa: string): string {
  return `
    <div style="font-family:sans-serif;max-width:520px;margin:auto">
      <h2 style="color:#111">Hola ${nombre},</h2>
      <p>Hemos recibido tu compra para la rifa <strong>${rifa}</strong>.</p>
      <p>Tu pago está <strong>en proceso de verificación</strong>. Te notificaremos por este medio
      cuando sea aprobado y tus boletos queden confirmados.</p>
      <p style="color:#666;font-size:13px">Gracias por participar — Ganas con Latam</p>
    </div>`;
}

export function emailPagoAprobado(nombre: string, rifa: string, numeros: string): string {
  return `
    <div style="font-family:sans-serif;max-width:520px;margin:auto">
      <h2 style="color:#111">¡Felicidades ${nombre}!</h2>
      <p>Tu pago para la rifa <strong>${rifa}</strong> ha sido <strong>aprobado</strong>.</p>
      ${numeros ? `<p>Tus números: <strong>${numeros}</strong></p>` : ""}
      <p>¡Mucha suerte en el sorteo!</p>
      <p style="color:#666;font-size:13px">Ganas con Latam</p>
    </div>`;
}
