import "server-only";
import { escapeHtml } from "@/lib/safe";

// Envío de correos con Resend. Si RESEND_API_KEY no está configurado, registra
// el correo en consola (modo desarrollo) para que el flujo siga funcionando
// hasta conectar el proveedor.
const RESEND_API_KEY = process.env.RESEND_API_KEY;
// Remitente verificado en Resend para el dominio del proyecto.
const FROM = process.env.EMAIL_FROM || "Ganas con Latam <send@ganaconllatam.com>";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ganaconllatam.com";

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

// ------------------------------------------------------------------
// Datos dinámicos de cada correo (lo único que cambia por sorteo/compra)
// ------------------------------------------------------------------
export interface OrderEmailData {
  nombre: string; // nombre y apellidos del comprador
  titulo: string; // título del sorteo
  imagenUrl?: string; // imagen del sorteo
  numeros?: string; // número(s) de ticket
  totalBs?: number; // total pagado en Bs
  totalUsd?: number; // total pagado en USD
  referencia?: string; // referencia del pago
}

export interface RaffleEmailData {
  titulo: string;
  imagenUrl?: string;
  precioUsd?: number;
  fecha?: string;
  hora?: string;
  codigo?: string;
}

// ------------------------------------------------------------------
// Utilidades de presentación (email-safe, estilos en línea)
// ------------------------------------------------------------------
function absolutize(url?: string): string {
  if (!url) return "";
  if (url.startsWith("http") || url.startsWith("data:")) return url;
  return `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

function fmtBs(n?: number): string {
  if (n == null) return "";
  return `Bs ${n.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function fmtUsd(n?: number): string {
  if (n == null) return "";
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function row(label: string, value?: string): string {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:8px 0;color:#64748b;font-size:13px;vertical-align:top;width:42%">${escapeHtml(label)}</td>
      <td style="padding:8px 0;color:#0f172a;font-size:14px;font-weight:600;text-align:right">${value}</td>
    </tr>`;
}

interface LayoutArgs {
  badgeText: string;
  badgeBg: string;
  badgeColor: string;
  heading: string;
  intro: string;
  imagenUrl?: string;
  detailsRows?: string;
  outro?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

function layout(a: LayoutArgs): string {
  const img = absolutize(a.imagenUrl);
  return `
  <div style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:24px 0">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0">
            <tr>
              <td style="background:#0f172a;padding:20px 28px">
                <span style="color:#ffffff;font-size:18px;font-weight:800;letter-spacing:0.5px">GANAS CON LATAM</span>
                <span style="display:inline-block;margin-left:6px;color:#22c55e;font-size:18px;font-weight:800">•</span>
              </td>
            </tr>
            <tr>
              <td style="height:4px;background:#22c55e;font-size:0;line-height:0">&nbsp;</td>
            </tr>
            ${
              img
                ? `<tr><td style="padding:0"><img src="${escapeHtml(img)}" alt="${escapeHtml(a.heading)}" width="600" style="display:block;width:100%;max-height:280px;object-fit:cover" /></td></tr>`
                : ""
            }
            <tr>
              <td style="padding:28px 28px 8px">
                <span style="display:inline-block;padding:6px 14px;border-radius:999px;background:${a.badgeBg};color:${a.badgeColor};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">${escapeHtml(a.badgeText)}</span>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 28px 4px">
                <h1 style="margin:0;color:#0f172a;font-size:22px;font-weight:800">${escapeHtml(a.heading)}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 28px 16px">
                <p style="margin:0;color:#475569;font-size:15px;line-height:1.6">${a.intro}</p>
              </td>
            </tr>
            ${
              a.detailsRows
                ? `<tr><td style="padding:0 28px 8px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:8px 16px">${a.detailsRows}</table></td></tr>`
                : ""
            }
            ${
              a.ctaLabel && a.ctaUrl
                ? `<tr><td style="padding:20px 28px 4px"><a href="${escapeHtml(a.ctaUrl)}" style="display:inline-block;background:#22c55e;color:#062e13;text-decoration:none;font-weight:800;font-size:15px;padding:14px 28px;border-radius:10px">${escapeHtml(a.ctaLabel)}</a></td></tr>`
                : ""
            }
            ${
              a.outro
                ? `<tr><td style="padding:16px 28px 4px"><p style="margin:0;color:#475569;font-size:14px;line-height:1.6">${a.outro}</p></td></tr>`
                : ""
            }
            <tr>
              <td style="padding:24px 28px 28px">
                <hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 16px" />
                <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.6">
                  Este es un mensaje automático de Ganas con Latam. Por favor no respondas a este correo.<br/>
                  © ${new Date().getFullYear()} Ganas con Latam. Todos los derechos reservados.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>`;
}

function orderDetails(d: OrderEmailData): string {
  const total = [fmtBs(d.totalBs), d.totalUsd != null ? fmtUsd(d.totalUsd) : ""].filter(Boolean).join(" · ");
  return (
    row("Sorteo", escapeHtml(d.titulo)) +
    row("A nombre de", escapeHtml(d.nombre)) +
    row("Número(s) de ticket", d.numeros ? escapeHtml(d.numeros) : "") +
    row("Total pagado", total || "") +
    row("Referencia", d.referencia ? escapeHtml(d.referencia) : "")
  );
}

// ------------------------------------------------------------------
// Plantillas
// ------------------------------------------------------------------

// 1) Compra recibida — pendiente de aprobación
export function emailVerificacionPago(d: OrderEmailData): string {
  return layout({
    badgeText: "Pendiente de aprobación",
    badgeBg: "#fef3c7",
    badgeColor: "#b45309",
    heading: `¡Hola ${escapeHtml(d.nombre)}!`,
    intro: `Hemos recibido tu compra para el sorteo <strong>${escapeHtml(d.titulo)}</strong>. Tu pago está <strong>en proceso de verificación</strong> y te avisaremos por este medio en cuanto sea aprobado y tus boletos queden confirmados.`,
    imagenUrl: d.imagenUrl,
    detailsRows: orderDetails(d),
    outro: "Gracias por participar. ¡Te deseamos mucha suerte!",
  });
}

// 2) Pago aprobado
export function emailPagoAprobado(d: OrderEmailData): string {
  return layout({
    badgeText: "Compra aprobada",
    badgeBg: "#dcfce7",
    badgeColor: "#15803d",
    heading: `¡Felicidades ${escapeHtml(d.nombre)}!`,
    intro: `Tu pago para el sorteo <strong>${escapeHtml(d.titulo)}</strong> fue <strong>aprobado</strong> y tus boletos están confirmados. ¡Ya estás participando!`,
    imagenUrl: d.imagenUrl,
    detailsRows: orderDetails(d),
    outro: "Guarda este correo como comprobante. ¡Mucha suerte en el sorteo!",
    ctaLabel: "Ver mis boletos",
    ctaUrl: `${SITE_URL}/consultar`,
  });
}

// 3) Pago rechazado
export function emailPagoRechazado(d: OrderEmailData): string {
  return layout({
    badgeText: "Compra rechazada",
    badgeBg: "#fee2e2",
    badgeColor: "#b91c1c",
    heading: `Hola ${escapeHtml(d.nombre)}`,
    intro: `Lamentamos informarte que no pudimos verificar tu pago para el sorteo <strong>${escapeHtml(d.titulo)}</strong>, por lo que tu compra fue <strong>rechazada</strong> y los números quedaron liberados nuevamente.`,
    imagenUrl: d.imagenUrl,
    detailsRows: orderDetails(d),
    outro: "Si crees que se trata de un error o ya realizaste el pago, vuelve a intentarlo o escríbenos por WhatsApp y con gusto te ayudamos.",
    ctaLabel: "Volver a participar",
    ctaUrl: SITE_URL,
  });
}

// 4) Nuevo sorteo liberado
export function emailNuevoSorteo(d: RaffleEmailData): string {
  const detalles =
    row("Sorteo", escapeHtml(d.titulo)) +
    row("Precio por boleto", d.precioUsd != null ? fmtUsd(d.precioUsd) : "") +
    row("Fecha del sorteo", d.fecha ? escapeHtml([d.fecha, d.hora].filter(Boolean).join(" ")) : "") +
    row("Código", d.codigo ? escapeHtml(d.codigo) : "");
  return layout({
    badgeText: "Nuevo sorteo",
    badgeBg: "#dbeafe",
    badgeColor: "#1d4ed8",
    heading: "¡Se liberó un nuevo sorteo!",
    intro: `Ya está disponible <strong>${escapeHtml(d.titulo)}</strong>. Asegura tus boletos antes de que se agoten y participa por increíbles premios.`,
    imagenUrl: d.imagenUrl,
    detailsRows: detalles,
    outro: "¡No te quedes fuera! Los mejores números vuelan.",
    ctaLabel: "Participar ahora",
    ctaUrl: SITE_URL,
  });
}
