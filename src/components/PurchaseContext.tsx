"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getStorefront,
  getTakenNumbers,
  createOrder,
  consultTickets,
  type ConsultResult,
} from "@/app/_actions/public";
import { ticketPad } from "@/lib/money";

type Storefront = Awaited<ReturnType<typeof getStorefront>>;

export interface BuyerData {
  name: string;
  cedulaType: string;
  cedula: string;
  phone: string;
  state: string;
  email: string;
}

const emptyBuyer: BuyerData = {
  name: "",
  cedulaType: "V",
  cedula: "",
  phone: "",
  state: "",
  email: "",
};

interface PurchaseContextValue {
  loading: boolean;
  data: Storefront | null;
  raffle: Storefront["activeRaffle"];
  config: Storefront["config"] | null;
  paymentMethods: Storefront["paymentMethods"];
  socialLinks: Storefront["socialLinks"];
  takenNumbers: string[];
  pad: number;

  quantity: number;
  setQuantity: (n: number) => void;
  mode: "azar" | "manual";
  setMode: (m: "azar" | "manual") => void;
  selectedTickets: string[];
  toggleTicket: (n: string) => void;
  clearTickets: () => void;

  buyer: BuyerData;
  setBuyerField: (field: keyof BuyerData, value: string) => void;

  paymentMethodId: string | null;
  setPaymentMethodId: (id: string) => void;
  reference: string;
  setReference: (v: string) => void;
  proofUrl: string;
  setProofUrl: (v: string) => void;

  effectiveQty: number;
  perTicketBs: number;
  perTicketUsd: number;
  totalBs: number;
  totalUsd: number;

  submitting: boolean;
  submitError: string | null;
  lastTickets: string[];
  submit: () => Promise<boolean>;

  consulting: boolean;
  consultResult: ConsultResult | null;
  consult: (cedula: string) => Promise<void>;

  refreshTaken: () => Promise<void>;
}

const PurchaseContext = createContext<PurchaseContextValue | null>(null);

export function usePurchase(): PurchaseContextValue {
  const ctx = useContext(PurchaseContext);
  if (!ctx) throw new Error("usePurchase debe usarse dentro de PurchaseProvider");
  return ctx;
}

export function PurchaseProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Storefront | null>(null);
  const [takenNumbers, setTakenNumbers] = useState<string[]>([]);

  const [quantity, setQuantityState] = useState(1);
  const [mode, setMode] = useState<"azar" | "manual">("azar");
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [buyer, setBuyer] = useState<BuyerData>(emptyBuyer);
  const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null);
  const [reference, setReference] = useState("");
  const [proofUrl, setProofUrl] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [lastTickets, setLastTickets] = useState<string[]>([]);

  const [consulting, setConsulting] = useState(false);
  const [consultResult, setConsultResult] = useState<ConsultResult | null>(null);

  useEffect(() => {
    let active = true;
    getStorefront()
      .then((res) => {
        if (!active) return;
        setData(res);
        setTakenNumbers(res.takenNumbers);
        if (res.paymentMethods[0]) setPaymentMethodId(res.paymentMethods[0].id);
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const raffle = data?.activeRaffle ?? null;
  const config = data?.config ?? null;
  const pad = raffle ? ticketPad(raffle.totalTickets) : 4;

  const setQuantity = useCallback((n: number) => {
    setQuantityState(Math.max(1, Math.floor(n) || 1));
  }, []);

  const toggleTicket = useCallback((n: string) => {
    setSelectedTickets((prev) =>
      prev.includes(n) ? prev.filter((t) => t !== n) : [...prev, n],
    );
  }, []);

  const clearTickets = useCallback(() => setSelectedTickets([]), []);

  const setBuyerField = useCallback((field: keyof BuyerData, value: string) => {
    setBuyer((prev) => ({ ...prev, [field]: value }));
  }, []);

  const refreshTaken = useCallback(async () => {
    if (!raffle) return;
    setTakenNumbers(await getTakenNumbers(raffle.id));
  }, [raffle]);

  const effectiveQty = mode === "manual" ? selectedTickets.length : quantity;
  const perTicketUsd = raffle?.priceUsd ?? 0;
  const dollarRate = config?.dollarRate ?? 40;
  const perTicketBs = Math.round(perTicketUsd * dollarRate * 100) / 100;
  const totalUsd = Math.round(perTicketUsd * effectiveQty * 100) / 100;
  const totalBs = Math.round(perTicketBs * effectiveQty * 100) / 100;

  const submit = useCallback(async () => {
    if (!raffle) {
      setSubmitError("No hay una rifa activa.");
      return false;
    }
    setSubmitting(true);
    setSubmitError(null);
    const res = await createOrder({
      raffleId: raffle.id,
      buyerName: buyer.name,
      buyerEmail: buyer.email,
      buyerPhone: buyer.phone,
      buyerCedula: buyer.cedula,
      quantity: effectiveQty,
      tickets: mode === "manual" ? selectedTickets : undefined,
      paymentMethodId,
      reference,
      proofUrl,
    });
    setSubmitting(false);
    if (!res.ok) {
      setSubmitError(res.error ?? "No se pudo guardar la compra.");
      return false;
    }
    setLastTickets(res.tickets ?? []);
    await refreshTaken();
    return true;
  }, [
    raffle,
    buyer,
    effectiveQty,
    mode,
    selectedTickets,
    paymentMethodId,
    reference,
    proofUrl,
    refreshTaken,
  ]);

  const consult = useCallback(async (cedula: string) => {
    setConsulting(true);
    const res = await consultTickets(cedula);
    setConsultResult(res);
    setConsulting(false);
  }, []);

  const value = useMemo<PurchaseContextValue>(
    () => ({
      loading,
      data,
      raffle,
      config,
      paymentMethods: data?.paymentMethods ?? [],
      socialLinks: data?.socialLinks ?? [],
      takenNumbers,
      pad,
      quantity,
      setQuantity,
      mode,
      setMode,
      selectedTickets,
      toggleTicket,
      clearTickets,
      buyer,
      setBuyerField,
      paymentMethodId,
      setPaymentMethodId,
      reference,
      setReference,
      proofUrl,
      setProofUrl,
      effectiveQty,
      perTicketBs,
      perTicketUsd,
      totalBs,
      totalUsd,
      submitting,
      submitError,
      lastTickets,
      submit,
      consulting,
      consultResult,
      consult,
      refreshTaken,
    }),
    [
      loading,
      data,
      raffle,
      config,
      takenNumbers,
      pad,
      quantity,
      setQuantity,
      mode,
      selectedTickets,
      toggleTicket,
      clearTickets,
      buyer,
      setBuyerField,
      paymentMethodId,
      reference,
      proofUrl,
      effectiveQty,
      perTicketBs,
      perTicketUsd,
      totalBs,
      totalUsd,
      submitting,
      submitError,
      lastTickets,
      submit,
      consulting,
      consultResult,
      consult,
      refreshTaken,
    ],
  );

  return <PurchaseContext.Provider value={value}>{children}</PurchaseContext.Provider>;
}

// Formatea un número entero al ancho de la rifa (ej. 7 -> "0007").
export function formatTicket(n: number, pad: number): string {
  return String(n).padStart(pad, "0");
}

// Formatea Bs para mostrar.
export function bs(value: number): string {
  return "Bs " + new Intl.NumberFormat("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
}
