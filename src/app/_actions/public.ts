"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
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

const VISITOR_COOKIE = "gcl_vid";

async function readVisitorId(): Promise<string | null> {
  const store = await cookies();
  return store.get(VISITOR_COOKIE)?.value ?? null;
}

async function getLikeInfo(raffleId: string) {
  const visitorId = await readVisitorId();
  const [likeCount, mine] = await Promise.all([
    prisma.raffleLike.count({ where: { raffleId } }),
    visitorId
      ? prisma.raffleLike.findUnique({
          where: { raffleId_visitorId: { raffleId, visitorId } },
          select: { id: true },
        })
      : null,
  ]);
  return { likeCount, likedByMe: !!mine };
}

export interface RecentRaffle {
  id: string;
  code: string;
  title: string;
  imageUrl: string;
  drawDate: string;
  drawTime: string;
  status: "ACTIVA" | "PROXIMA" | "FINALIZADA";
}

async function getRecentRaffles(excludeId?: string): Promise<RecentRaffle[]> {
  return prisma.raffle.findMany({
    where: excludeId ? { id: { not: excludeId } } : undefined,
    orderBy: { createdAt: "desc" },
    take: 10,
    select: { id: true, code: true, title: true, imageUrl: true, drawDate: true, drawTime: true, status: true },
  });
}

// Like único por visitante. Si el visitante ya dio like, lo retira (toggle).
// La restricción única (raffleId, visitorId) garantiza que nunca se duplique.
export async function toggleRaffleLike(raffleId: string) {
  if (typeof raffleId !== "string" || !raffleId) return { ok: false as const };
  const exists = await prisma.raffle.findUnique({ where: { id: raffleId }, select: { id: true } });
  if (!exists) return { ok: false as const };

  const store = await cookies();
  let visitorId = store.get(VISITOR_COOKIE)?.value;
  if (!visitorId || !/^[a-zA-Z0-9-]{8,64}$/.test(visitorId)) {
    visitorId = crypto.randomUUID();
    store.set(VISITOR_COOKIE, visitorId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 365 * 2,
    });
  }

  const where = { raffleId_visitorId: { raffleId, visitorId } };
  const existing = await prisma.raffleLike.findUnique({ where, select: { id: true } });
  if (existing) {
    await prisma.raffleLike.delete({ where });
  } else {
    await prisma.raffleLike.upsert({ where, update: {}, create: { raffleId, visitorId } });
  }
  return { ok: true as const, ...(await getLikeInfo(raffleId)) };
}

// Datos que necesita la página principal para renderizarse dinámicamente.
export async function getStorefront() {
  const [config, activeRaffle, paymentMethods, socialLinks, top] = await Promise.all([
    prisma.siteConfig.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } }),
    prisma.raffle.findFirst({ where: { status: "ACTIVA" }, orderBy: { createdAt: "desc" } }),
    prisma.paymentMethod.findMany({ where: { enabled: true }, orderBy: { order: "asc" } }),
    prisma.socialLink.findMany({ orderBy: { order: "asc" } }),
    prisma.topPurchase.findMany({ orderBy: { position: "asc" } }),
  ]);

  const [takenNumbers, likes, recentRaffles] = await Promise.all([
    activeRaffle ? getTakenSet(activeRaffle.id).then((s) => [...s]) : Promise.resolve([] as string[]),
    activeRaffle ? getLikeInfo(activeRaffle.id) : Promise.resolve({ likeCount: 0, likedByMe: false }),
    getRecentRaffles(activeRaffle?.id),
  ]);

  return {
    config,
    activeRaffle,
    paymentMethods,
    socialLinks,
    top,
    takenNumbers,
    likes,
    recentRaffles,
  };
}

// Números ocupados de una rifa (para refrescar disponibilidad).
export async function getTakenNumbers(raffleId: string): Promise<string[]> {
  return [...(await getTakenSet(raffleId))];
}

// Datos de una rifa específica accedida por su código único (enlace compartido).
// Devuelve la misma forma que getStorefront para poder reutilizar el mismo contexto.
export async function getStorefrontByCode(code: string) {
  const [config, raffle, paymentMethods, socialLinks, top] = await Promise.all([
    prisma.siteConfig.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } }),
    prisma.raffle.findUnique({ where: { code: code.trim() } }),
    prisma.paymentMethod.findMany({ where: { enabled: true }, orderBy: { order: "asc" } }),
    prisma.socialLink.findMany({ orderBy: { order: "asc" } }),
    prisma.topPurchase.findMany({ orderBy: { position: "asc" } }),
  ]);

  const [takenNumbers, likes, recentRaffles] = await Promise.all([
    raffle ? getTakenSet(raffle.id).then((s) => [...s]) : Promise.resolve([] as string[]),
    raffle ? getLikeInfo(raffle.id) : Promise.resolve({ likeCount: 0, likedByMe: false }),
    getRecentRaffles(raffle?.id),
  ]);

  return {
    config,
    activeRaffle: raffle,
    paymentMethods,
    socialLinks,
    top,
    takenNumbers,
    likes,
    recentRaffles,
  };
}

// Verifica si existe una rifa con ese código (para la ruta de enlace compartido).
export async function raffleExistsByCode(code: string): Promise<boolean> {
  const raffle = await prisma.raffle.findUnique({ where: { code: code.trim() }, select: { id: true } });
  return !!raffle;
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
  senderBank?: string;
  senderHolderId?: string;
  senderPhone?: string;
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
          senderBank: input.senderBank?.trim().slice(0, 120) ?? "",
          senderHolderId: input.senderHolderId?.trim().slice(0, 40) ?? "",
          senderPhone: input.senderPhone?.trim().slice(0, 40) ?? "",
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
    let metodoPago: string | undefined;
    if (input.paymentMethodId) {
      const pm = await prisma.paymentMethod.findUnique({
        where: { id: input.paymentMethodId },
        select: { name: true },
      });
      metodoPago = pm?.name;
    }
    const { html, attachments } = emailVerificacionPago({
      nombre: name,
      titulo: raffle.title,
      imagenUrl: raffle.imageUrl,
      numeros: numbers.join(", "),
      totalBs: amountBs,
      totalUsd: amountUsd,
      referencia: input.reference?.trim().slice(0, 200) ?? "",
      metodoPago,
    });
    await sendEmail({
      to: input.buyerEmail.trim(),
      subject: "Recibimos tu compra — pendiente de aprobación · Ganas con Latam",
      html,
      attachments,
      tags: [{ name: "tipo", value: "compra-pendiente" }],
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
