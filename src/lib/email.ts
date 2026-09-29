import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Remitente verificado en Resend para el dominio del proyecto.
const FROM = "Ganas con Latam <send@ganaconllatam.com>";
const SITE_URL = "https://www.ganaconllatam.com";
const LOGO_URL = `${SITE_URL}/images/4.webp`;
const SUPPORT_URL = `${SITE_URL}/#soporte`;

// Adjunto inline: las imágenes del sorteo se guardan como data URL base64 en la
// base de datos, y los clientes de correo (Gmail, Outlook) NO renderizan
// imágenes `data:`. Por eso se envían como adjuntos inline referenciados con
// `cid:` en el HTML, que es el estándar que sí se muestra correctamente.
export type EmailAttachment = {
  filename: string;
  content: string; // base64 sin el prefijo data:
  contentId: string;
};

export type EmailTag = { name: string; value: string };

export type RenderedEmail = { html: string; attachments: EmailAttachment[] };

// ---------------------------------------------------------------------------
// Envío base. El SDK de Resend NO lanza excepciones: devuelve { data, error }.
// Un fallo de correo nunca debe romper el flujo de compra/aprobación, así que
// registramos el error y devolvemos ok:false sin lanzar.
// ---------------------------------------------------------------------------
export async function sendEmail({
  to,
  subject,
  html,
  attachments,
  tags,
  idempotencyKey,
}: {
  to: string;
  subject: string;
  html: string;
  attachments?: EmailAttachment[];
  tags?: EmailTag[];
  idempotencyKey?: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log("[v0] RESEND_API_KEY no configurada — correo omitido:", subject);
    return { ok: false as const, skipped: true as const };
  }
  const { data, error } = await resend.emails.send(
    {
      from: FROM,
      to: [to],
      subject,
      html,
      ...(attachments && attachments.length ? { attachments } : {}),
      ...(tags && tags.length ? { tags } : {}),
    },
    idempotencyKey ? { idempotencyKey } : undefined,
  );
  if (error) {
    console.error("[v0] Error enviando correo:", error.message);
    return { ok: false as const, error: error.message };
  }
  return { ok: true as const, id: data?.id };
}

// ---------------------------------------------------------------------------
// Utilidades de formato / render compartidas por las plantillas.
// ---------------------------------------------------------------------------
function absUrl(url: string): string {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

// Resuelve la imagen del sorteo a algo que el correo pueda mostrar:
// - data URL base64  -> adjunto inline + src `cid:...`
// - URL http/https   -> src directo, sin adjunto
// - relativa al sitio -> URL absoluta, sin adjunto
function resolveImage(
  imageUrl: string,
  cid: string,
): { src: string; attachments: EmailAttachment[] } {
  const url = (imageUrl || "").trim();
  if (!url) return { src: "", attachments: [] };
  const m = /^data:(image\/[a-z0-9.+-]+);base64,([\s\S]+)$/i.exec(url);
  if (m) {
    const mime = m[1].toLowerCase();
    const content = m[2].replace(/\s/g, "");
    const ext = (mime.split("/")[1] || "png").replace(/[^a-z0-9]/g, "") || "png";
    return {
      src: `cid:${cid}`,
      attachments: [{ filename: `${cid}.${ext}`, content, contentId: cid }],
    };
  }
  return { src: absUrl(url), attachments: [] };
}

function fmtBs(n: number): string {
  return `${new Intl.NumberFormat("es-VE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(n)} VES`;
}

function fmtUsd(n: number): string {
  return `$${new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n)} USD`;
}

function splitTickets(numeros: string): string[] {
  return numeros
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

// Caja de un ticket con borde punteado. `color` define el acento (naranja/verde).
function ticketBox(num: string, color: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="display:inline-table;margin:6px;">
      <tr><td style="border:2px dashed ${color};border-radius:10px;padding:10px 22px;text-align:center;background:#ffffff;">
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:2px;color:#94a3b8;font-weight:700;">TICKET</div>
        <div style="font-family:'Courier New',monospace;font-size:22px;font-weight:700;letter-spacing:6px;color:#1e293b;margin-top:2px;">${num}</div>
      </td></tr>
    </table>`;
}

function ticketsBlock(numeros: string, color: string): string {
  return splitTickets(numeros)
    .map((n) => ticketBox(n, color))
    .join("");
}

// Cabecera oscura con logo (usada en pendiente / aprobado).
function darkHeader(): string {
  return `
    <tr><td style="background:#151f32;padding:24px 0;text-align:center;">
      <img src="${LOGO_URL}" alt="Ganas con Latam" width="72" height="72" style="display:inline-block;border-radius:8px;object-fit:contain;" />
    </td></tr>`;
}

// Banner con la imagen del sorteo (usada en pendiente / aprobado).
function bannerBlock(src: string, titulo: string): string {
  if (!src) return "";
  return `
    <tr><td style="background:#151f32;padding:0;">
      <img src="${src}" alt="${escapeHtml(titulo)}" width="600" style="display:block;width:100%;max-width:600px;height:auto;" />
    </td></tr>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shell(inner: string, bg = "#f0f2f5"): string {
  return `<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:${bg};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${bg};padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;">
        ${inner}
      </table>
    </td></tr>
  </table>
</body></html>`;
}

// ===========================================================================
// 1) COMPRA PENDIENTE — "¡Verificando Pago!"
// ===========================================================================
export function emailVerificacionPago(p: {
  nombre: string;
  titulo: string;
  imagenUrl: string;
  numeros: string;
  totalBs: number;
  totalUsd: number;
  referencia: string;
  metodoPago?: string;
}): RenderedEmail {
  const tickets = splitTickets(p.numeros);
  const orange = "#f59e0b";
  const green = "#22c55e";
  const img = resolveImage(p.imagenUrl, "sorteo");
  const inner = `
    ${darkHeader()}
    ${bannerBlock(img.src, p.titulo)}
    <tr><td style="padding:28px 32px 8px;font-family:Arial,Helvetica,sans-serif;text-align:center;">
      <div style="font-size:24px;font-weight:800;color:${orange};">¡Verificando Pago! &#9203;</div>
      <div style="font-size:14px;font-weight:700;color:#1e293b;margin-top:8px;">Hemos recibido tu reporte de pago y pronto será verificado</div>
      <div style="margin:18px auto 0;display:inline-block;background:#fff7ed;color:${orange};border:1px solid #fdba74;border-radius:999px;padding:8px 18px;font-size:13px;font-weight:700;">&#9203; Estado: Pago en proceso de verificación</div>
    </td></tr>
    <tr><td style="padding:18px 32px 0;font-family:Arial,Helvetica,sans-serif;text-align:center;">
      <div style="font-size:16px;font-weight:800;color:${orange};">¡Hola, ${escapeHtml(p.nombre)}! &#128075;</div>
      <p style="font-size:14px;color:#334155;line-height:1.6;margin:10px 0 0;">
        Tu pago para la rifa <span style="color:${green};font-weight:700;">${escapeHtml(p.titulo)}</span> está siendo verificado.
        Te notificaremos en cuanto se valide para que puedas descargar tu ticket oficial.
      </p>
    </td></tr>
    <tr><td style="padding:24px 32px 0;font-family:Arial,Helvetica,sans-serif;text-align:center;">
      <div style="font-size:15px;font-weight:800;color:#1e293b;border-bottom:2px solid #e2e8f0;display:inline-block;padding-bottom:6px;">Tus Boletos Seleccionados (${tickets.length})</div>
      <div style="margin-top:16px;">${ticketsBlock(p.numeros, orange)}</div>
    </td></tr>
    <tr><td style="padding:22px 32px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;font-family:Arial,Helvetica,sans-serif;">
        <tr><td style="padding:14px 18px;border-bottom:1px solid #eef2f7;font-size:13px;color:#64748b;">Referencia:</td><td style="padding:14px 18px;border-bottom:1px solid #eef2f7;font-size:13px;color:#1e293b;font-weight:700;text-align:right;">${escapeHtml(p.referencia || "—")}</td></tr>
        ${p.metodoPago ? `<tr><td style="padding:14px 18px;border-bottom:1px solid #eef2f7;font-size:13px;color:#64748b;">Método de Pago:</td><td style="padding:14px 18px;border-bottom:1px solid #eef2f7;font-size:13px;color:#1e293b;font-weight:700;text-align:right;">${escapeHtml(p.metodoPago)}</td></tr>` : ""}
        <tr><td style="padding:14px 18px;font-size:13px;color:#64748b;">Total Reportado:</td><td style="padding:14px 18px;font-size:15px;color:${green};font-weight:800;text-align:right;">${fmtBs(p.totalBs)}</td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:18px 32px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fffbeb;border-left:4px solid ${orange};border-radius:8px;">
        <tr><td style="padding:14px 16px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#92400e;line-height:1.55;">
          <strong>&#128161; Importante:</strong> Tus boletos están reservados mientras nuestro equipo valida tu comprobante. En cuanto sea confirmado, recibirás un correo con la aprobación final.
        </td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:26px 32px 8px;text-align:center;">
      <a href="${SITE_URL}" style="display:inline-block;background:${green};color:#052e16;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-weight:800;font-size:15px;padding:14px 40px;border-radius:999px;">Ir al Sitio Web</a>
    </td></tr>
    <tr><td style="padding:4px 32px 28px;text-align:center;">
      <a href="${SUPPORT_URL}" style="color:${green};text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-weight:700;font-size:13px;">¿Tienes dudas? Contacta a Soporte</a>
    </td></tr>
    ${footerLight()}
  `;
  return { html: shell(inner), attachments: img.attachments };
}

// ===========================================================================
// 2) COMPRA APROBADA — "¡Pago Aprobado!"
// ===========================================================================
export function emailPagoAprobado(p: {
  nombre: string;
  titulo: string;
  imagenUrl: string;
  numeros: string;
  totalBs: number;
  totalUsd: number;
  referencia: string;
}): RenderedEmail {
  const tickets = splitTickets(p.numeros);
  const green = "#16a34a";
  const img = resolveImage(p.imagenUrl, "sorteo");
  const inner = `
    ${darkHeader()}
    ${bannerBlock(img.src, p.titulo)}
    <tr><td style="padding:28px 32px 0;font-family:Arial,Helvetica,sans-serif;text-align:center;">
      <div style="font-size:22px;font-weight:800;color:${green};">¡Felicidades, tu pago ha sido aprobado! &#127881;</div>
      <p style="font-size:14px;color:#334155;line-height:1.6;margin:14px 0 0;">
        Hola <strong>${escapeHtml(p.nombre)}</strong>, tu compra fue verificada exitosamente. Ya estás participando oficialmente en el sorteo <strong>${escapeHtml(p.titulo)}</strong>.
      </p>
    </td></tr>
    <tr><td style="padding:24px 32px 0;font-family:Arial,Helvetica,sans-serif;text-align:center;">
      <div style="font-size:15px;font-weight:800;color:#1e293b;border-bottom:2px solid #e2e8f0;display:inline-block;padding-bottom:6px;">Tus Boletos (${tickets.length})</div>
      <div style="margin-top:16px;">${ticketsBlock(p.numeros, "#22c55e")}</div>
    </td></tr>
    <tr><td style="padding:22px 32px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;font-family:Arial,Helvetica,sans-serif;">
        <tr><td style="padding:14px 18px;border-bottom:1px solid #eef2f7;font-size:13px;color:#64748b;">Referencia:</td><td style="padding:14px 18px;border-bottom:1px solid #eef2f7;font-size:13px;color:#1e293b;font-weight:700;text-align:right;">${escapeHtml(p.referencia || "—")}</td></tr>
        <tr><td style="padding:14px 18px;font-size:13px;color:#64748b;">Total Pagado:</td><td style="padding:14px 18px;font-size:15px;color:${green};font-weight:800;text-align:right;">${fmtBs(p.totalBs)}</td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:26px 32px 8px;text-align:center;">
      <a href="${SITE_URL}" style="display:inline-block;background:#22c55e;color:#052e16;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-weight:800;font-size:15px;padding:14px 40px;border-radius:999px;">Ir al Sitio Web</a>
    </td></tr>
    <tr><td style="padding:4px 32px 28px;text-align:center;">
      <a href="${SUPPORT_URL}" style="color:#22c55e;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-weight:700;font-size:13px;">¿Tienes dudas? Contacta a Soporte</a>
    </td></tr>
    ${footerLight()}
  `;
  return { html: shell(inner), attachments: img.attachments };
}

// ===========================================================================
// 3) COMPRA RECHAZADA
// ===========================================================================
export function emailPagoRechazado(p: {
  nombre: string;
  titulo: string;
  imagenUrl: string;
  numeros: string;
  totalBs: number;
  totalUsd: number;
  referencia: string;
  motivo?: string;
}): RenderedEmail {
  const red = "#ef4444";
  const motivo =
    p.motivo?.trim() ||
    "Tu comprobante de pago no pudo ser verificado o no coincide con la referencia reportada.";
  const inner = `
    <tr><td style="background:${red};padding:28px 0;text-align:center;">
      <img src="${LOGO_URL}" alt="Ganas con Latam" width="64" height="64" style="display:inline-block;border-radius:8px;object-fit:contain;" />
    </td></tr>
    <tr><td style="padding:28px 32px 0;font-family:Arial,Helvetica,sans-serif;">
      <p style="font-size:15px;color:#1e293b;margin:0;">Hola <strong>${escapeHtml(p.nombre)}</strong>,</p>
      <p style="font-size:14px;color:#334155;line-height:1.6;margin:14px 0 0;">
        Te informamos que tu compra de tickets para la rifa <strong>&ldquo;${escapeHtml(p.titulo)}&rdquo;</strong> ha sido rechazada.
      </p>
    </td></tr>
    <tr><td style="padding:18px 32px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fef2f2;border-left:4px solid ${red};border-radius:8px;">
        <tr><td style="padding:16px 18px;font-family:Arial,Helvetica,sans-serif;">
          <div style="font-size:13px;font-weight:800;color:${red};">Motivo del rechazo:</div>
          <div style="font-size:13px;color:#7f1d1d;font-style:italic;margin-top:6px;">&ldquo;${escapeHtml(motivo)}&rdquo;</div>
        </td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:18px 32px 0;font-family:Arial,Helvetica,sans-serif;">
      <p style="font-size:14px;color:#334155;line-height:1.6;margin:0;">
        Si consideras que esto es un error y necesitas ayuda para corregirlo, por favor contáctanos a través de nuestro soporte.
      </p>
      <p style="font-size:14px;color:#334155;line-height:1.6;margin:14px 0 0;">
        Tus tickets han sido liberados y no se ha procesado ningún cargo válido.
      </p>
    </td></tr>
    <tr><td style="padding:26px 32px 30px;text-align:center;">
      <a href="${SUPPORT_URL}" style="display:inline-block;background:#f8f400;color:#1e293b;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-weight:800;font-size:15px;padding:14px 40px;border-radius:8px;">Contactar Soporte</a>
    </td></tr>
    <tr><td style="background:#f1f5f9;padding:20px;text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#94a3b8;">
      &copy; ${new Date().getFullYear()} Ganas con Latam. Todos los derechos reservados.
    </td></tr>
  `;
  return { html: shell(inner), attachments: [] };
}

// ===========================================================================
// 4) NUEVO SORTEO — tema oscuro completo
// ===========================================================================
export function emailNuevoSorteo(p: {
  titulo: string;
  imagenUrl: string;
  precioUsd: number;
  precioBs?: number;
  descripcion?: string;
  fecha: string;
  hora: string;
  codigo: string;
}): RenderedEmail {
  const img = resolveImage(p.imagenUrl, "sorteo");
  const descripcion = (p.descripcion || "").trim();
  const fechaHora = [p.fecha, p.hora].filter(Boolean).join(" — ");
  const precio = `Boleto: <span style="color:#22c55e;font-weight:800;">${fmtUsd(p.precioUsd)}</span>${
    p.precioBs ? ` <span style="color:#94a3b8;">(${fmtBs(p.precioBs)})</span>` : ""
  }`;
  const inner = `
    <tr><td style="height:6px;background:linear-gradient(90deg,#ef4444,#f59e0b,#22c55e,#3b82f6,#a855f7);font-size:0;line-height:0;">&nbsp;</td></tr>
    <tr><td style="background:#0f1729;padding:26px 0 8px;text-align:center;">
      <img src="${LOGO_URL}" alt="Ganas con Latam" width="72" height="72" style="display:inline-block;border-radius:8px;object-fit:contain;" />
    </td></tr>
    <tr><td style="background:#0f1729;padding:8px 32px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-left:4px solid #22c55e;background:#16203a;border-radius:8px;">
        <tr><td style="padding:14px 16px;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:800;color:#f8fafc;">¡Hola! &#128075;</td></tr>
      </table>
    </td></tr>
    <tr><td style="background:#0f1729;padding:18px 32px 0;font-family:Arial,Helvetica,sans-serif;">
      <p style="font-size:14px;color:#cbd5e1;line-height:1.7;margin:0;">
        Ya se encuentra habilitada la selección de números para el nuevo sorteo${fechaHora ? ` (${escapeHtml(fechaHora)})` : ""}.
      </p>
      ${descripcion ? `<p style="font-size:14px;color:#cbd5e1;line-height:1.7;margin:14px 0 0;white-space:pre-line;">${escapeHtml(descripcion)}</p>` : ""}
    </td></tr>
    ${
      img.src
        ? `<tr><td style="background:#0f1729;padding:20px 32px 0;">
             <img src="${img.src}" alt="${escapeHtml(p.titulo)}" width="536" style="display:block;width:100%;border-radius:12px;height:auto;" />
           </td></tr>`
        : ""
    }
    <tr><td style="background:#0f1729;padding:18px 32px 0;text-align:center;">
      <div style="display:inline-block;background:#1f2937;color:#fbbf24;border:1px solid #b45309;border-radius:999px;padding:6px 16px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:800;letter-spacing:1px;">&#128308; SORTEO DESTACADO</div>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:800;color:#f8fafc;margin-top:14px;">${escapeHtml(p.titulo)}</div>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#e2e8f0;margin-top:8px;">${precio}</div>
    </td></tr>
    <tr><td style="background:#0f1729;padding:22px 32px 8px;text-align:center;">
      <a href="${SITE_URL}" style="display:inline-block;background:#22c55e;color:#052e16;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-weight:800;font-size:15px;padding:15px 34px;border-radius:999px;">&#128073; ¡PARTICIPA Y GANA AHORA!</a>
    </td></tr>
    <tr><td style="background:#0f1729;padding:18px 32px 0;text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#94a3b8;">
      ¡Mucha suerte y gracias por formar parte de <strong style="color:#cbd5e1;">Ganas con Latam</strong>!
    </td></tr>
    <tr><td style="background:#0f1729;padding:18px 32px 28px;text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#475569;line-height:1.6;">
      Has recibido este correo porque eres cliente registrado o participante en Ganas con Latam.<br/>
      &copy; ${new Date().getFullYear()} Ganas con Latam. Todos los derechos reservados.
    </td></tr>
  `;
  return { html: shell(inner, "#0f1729"), attachments: img.attachments };
}

function footerLight(): string {
  return `<tr><td style="background:#f8fafc;padding:20px 32px;text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#94a3b8;line-height:1.6;">
    Este es un correo automático enviado por Ganas con Latam. Por favor no respondas directamente a este mensaje.
  </td></tr>`;
}
