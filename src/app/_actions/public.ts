"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { usdToBs } from "@/lib/money";
import { sendEmail, emailVerificacionPago } from "@/lib/email";

import { ticketPad } from "@/lib/money";
import { safeHref, isValidEmail, MAX_PROOF_CHARS } from "@/lib/safe";

const ACTIVE_TAKEN = ["PENDIENTE", "APROBADO"] as const;

function splitNumbers(raw: string): string[] {
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

async function getTakenSet(raffleId: string): Promise<Set<string>> {
  const orders = await prisma.ticketOrder.findMany({
    where: { raffleId, status: { in: [...ACTIVE_TAKEN] } },
    select: { ticketNumbers: true },
  });
  return new Set(orders.flatMap((o) => splitNumbers(o.ticketNumbers)));
}

// Datos que necesita la página principal para renderizarse dinámicamente.
export async function getStorefront() {
  const [config, activeRaffle, paymentMethods, socialLinks, top] = await Promise.all([
    prisma.siteConfig.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } }),
    prisma.raffle.findFirst({ where: { status: "ACTIVA" }, orderBy: { createdAt: "desc" } }),
    prisma.paymentMethod.findMany({ where: { enabled: true }, orderBy: { order: "asc" } }),
    prisma.socialLink.findMany({ where: { enabled: true }, orderBy: { order: "asc" } }),
    prisma.topPurchase.findMany({ orderBy: { position: "asc" } }),
  ]);

  const takenNumbers = activeRaffle ? [...(await getTakenSet(activeRaffle.id))] : [];

  return {
    config,
    activeRaffle,
    paymentMethods,
    socialLinks,
    top,
    takenNumbers,
  };
}

// Números ocupados de una rifa (para refrescar disponibilidad).
export async function getTakenNumbers(raffleId: string): Promise<string[]> {
  return [...(await getTakenSet(raffleId))];
}

export interface CreateOrderInput {
  raffleId: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone?: string;
  buyerCedula?: string;
  quantity: number;
  tickets?: string[]; // selección manual; si viene vacío se asignan al azar
  paymentMethodId?: string | null;
  reference?: string;
  proofUrl?: string;
}

export interface CreateOrderResult {
  ok: boolean;
  error?: string;
  tickets?: string[];
  amountBs?: number;
  amountUsd?: number;
}

// Guardar la compra -> crea la orden PENDIENTE y envía el correo de verificación.
export async function createOrder(input: CreateOrderInput): Promise<CreateOrderResult> {
  const name = input.buyerName?.trim();
  if (!name) return { ok: false, error: "El nombre es obligatorio." };
  if (name.length > 120) return { ok: false, error: "El nombre es demasiado largo." };

  const email = input.buyerEmail?.trim() ?? "";
  if (email && !isValidEmail(email))
    return { ok: false, error: "El correo electrónico no es válido." };

  // Sanear el comprobante: solo se aceptan imágenes (data:image/*) o enlaces http(s),
  // con un límite de tamaño para evitar payloads abusivos.
  const proofRaw = input.proofUrl?.trim() ?? "";
  if (proofRaw) {
    if (proofRaw.length > MAX_PROOF_CHARS)
      return { ok: false, error: "El comprobante supera el tamaño máximo permitido (4 MB)." };
    if (!safeHref(proofRaw))
      return { ok: false, error: "El comprobante no tiene un formato de imagen válido." };
  }
  const proofUrl = safeHref(proofRaw) ?? "";

  const raffle = await prisma.raffle.findUnique({ where: { id: input.raffleId } });
  if (!raffle) return { ok: false, error: "La rifa no existe." };
  if (raffle.status !== "ACTIVA")
    return { ok: false, error: "Esta rifa no está activa para la compra." };

  const pad = ticketPad(raffle.totalTickets);
  const format = (n: number) => String(n).padStart(pad, "0");
  const taken = await getTakenSet(raffle.id);

  const requested = Math.max(1, Math.floor(input.quantity || 0));
  let numbers: string[];

  if (input.tickets && input.tickets.length > 0) {
    // Selección manual: normalizar, validar rango, duplicados y disponibilidad.
    const normalized = Array.from(
      new Set(input.tickets.map((t) => t.trim()).filter(Boolean).map((t) => format(Number(t)))),
    );
    for (const t of normalized) {
      const value = Number(t);
      if (!Number.isInteger(value) || value < 0 || value >= raffle.totalTickets)
        return { ok: false, error: `El número ${t} está fuera de rango.` };
      if (taken.has(t)) return { ok: false, error: `El número ${t} ya no está disponible.` };
    }
    numbers = normalized;
  } else {
    // Asignación al azar entre los disponibles.
    const available: string[] = [];
    for (let i = 0; i < raffle.totalTickets; i++) {
      const n = format(i);
      if (!taken.has(n)) available.push(n);
    }
    if (available.length < requested)
      return { ok: false, error: "No hay suficientes números disponibles." };
    for (let i = available.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [available[i], available[j]] = [available[j], available[i]];
    }
    numbers = available.slice(0, requested).sort();
  }

  const config = await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });
  const qty = numbers.length;
  const amountUsd = Math.round(raffle.priceUsd * qty * 100) / 100;
  const amountBs = usdToBs(amountUsd, config.dollarRate);

  // Revalidar disponibilidad y crear la orden dentro de una transacción para
  // reducir la ventana de doble venta cuando dos compradores eligen el mismo número.
  try {
    await prisma.$transaction(async (tx) => {
      const current = await tx.ticketOrder.findMany({
        where: { raffleId: raffle.id, status: { in: [...ACTIVE_TAKEN] } },
        select: { ticketNumbers: true },
      });
      const takenNow = new Set(current.flatMap((o) => splitNumbers(o.ticketNumbers)));
      const conflict = numbers.find((n) => takenNow.has(n));
      if (conflict) {
        throw new Error(`El número ${conflict} ya no está disponible.`);
      }

      let participantId: string | undefined;
      if (input.buyerCedula?.trim() || email) {
        const participant = await tx.participant.create({
          data: {
            name,
            email,
            phone: input.buyerPhone?.trim() ?? "",
            cedula: input.buyerCedula?.trim() ?? "",
          },
        });
        participantId = participant.id;
      }

      await tx.ticketOrder.create({
        data: {
          raffleId: raffle.id,
          participantId,
          buyerName: name,
          buyerEmail: email,
          buyerPhone: input.buyerPhone?.trim() ?? "",
          buyerCedula: input.buyerCedula?.trim() ?? "",
          ticketCount: qty,
          ticketNumbers: numbers.join(","),
          amountUsd,
          amountBs,
          paymentMethodId: input.paymentMethodId || null,
          reference: input.reference?.trim().slice(0, 200) ?? "",
          proofUrl,
          status: "PENDIENTE",
        },
      });
    });
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "No se pudo procesar la compra.",
    };
  }

  if (input.buyerEmail?.trim()) {
    await sendEmail({
      to: input.buyerEmail.trim(),
      subject: "Verificación de pago en proceso - Ganas con Latam",
      html: emailVerificacionPago(name, raffle.title),
    });
  }

  revalidatePath("/admin/boletos");
  revalidatePath("/admin");
  revalidatePath("/");

  return { ok: true, tickets: numbers, amountBs, amountUsd };
}

export interface ConsultOrder {
  id: string;
  raffleTitle: string;
  tickets: string[];
  status: "PENDIENTE" | "APROBADO" | "RECHAZADO";
  createdAt: string;
}

export interface ConsultResult {
  ok: boolean;
  error?: string;
  name: string | null;
  orders: ConsultOrder[];
}

// Consultar boletos por cédula.
export async function consultTickets(cedula: string): Promise<ConsultResult> {
  const clean = cedula.trim();
  if (!clean) return { ok: false, error: "Ingresa tu cédula.", name: null, orders: [] };

  const orders = await prisma.ticketOrder.findMany({
    where: { buyerCedula: clean },
    orderBy: { createdAt: "desc" },
    include: { raffle: true },
  });

  return {
    ok: true,
    name: orders[0]?.buyerName ?? null,
    orders: orders.map((o) => ({
      id: o.id,
      raffleTitle: o.raffle.title,
      tickets: splitNumbers(o.ticketNumbers),
      status: o.status,
      createdAt: o.createdAt.toISOString(),
    })),
  };
}
