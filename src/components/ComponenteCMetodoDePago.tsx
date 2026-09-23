// 1. ¡Obligatorio! Esto activa la reactividad y las funciones del navegador
"use client";

import { useEffect, useRef, useState } from "react";
import { HijoProps } from './types';
import { usePurchase, bs } from './PurchaseContext';
import { formatUsd } from '@/lib/money';

const MAX_PROOF_BYTES = 1_200_000; // ~1.2MB para el comprobante en base64
const COUNTDOWN_SECONDS = 10 * 60; // temporizador de 10 minutos para completar el pago

// Bancos venezolanos más comunes para el selector "Tus datos bancarios".
const BANCOS_VE = [
  "Banesco",
  "Banco de Venezuela",
  "Banco Mercantil",
  "BBVA Provincial",
  "Banco Bicentenario",
  "Banco del Tesoro",
  "Banco Nacional de Crédito (BNC)",
  "Banco Exterior",
  "Bancaribe",
  "Banco Caroní",
  "Banco Activo",
  "Banco Plaza",
  "Banplus",
  "Banco Sofitasa",
  "Banco Venezolano de Crédito",
  "Mi Banco",
  "100% Banco",
  "Bancamiga",
  "R4 Microfinanciero",
];

// Convierte los "details" del método (texto libre) en pares etiqueta/valor
// para mostrarlos ordenados y con botón de copiar, como en el diseño.
function parseDetails(details: string): { label: string; value: string }[] {
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

function mmss(total: number): string {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function ComponenteCMetodoDePago({ cambiarVista }: HijoProps) {
  const {
    paymentMethods,
    paymentMethodId,
    setPaymentMethodId,
    reference,
    setReference,
    proofUrl,
    setProofUrl,
    senderBank,
    setSenderBank,
    senderHolderIdType,
    setSenderHolderIdType,
    senderHolderId,
    setSenderHolderId,
    senderPhone,
    setSenderPhone,
    effectiveQty,
    totalBs,
    totalUsd,
    submitting,
    submitError,
    submit,
  } = usePurchase();

  const [localError, setLocalError] = useState<string | null>(null);
  const [proofName, setProofName] = useState<string>("");
  const [showUsd, setShowUsd] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((s) => (s <= 0 ? 0 : s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  const copy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(null), 1500);
    } catch {
      /* clipboard no disponible */
    }
  };

  const pasteReference = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setReference(text.replace(/\D/g, "").slice(0, 6));
    } catch {
      /* clipboard no disponible */
    }
  };

  const onFile = (file: File | null) => {
    if (!file) {
      setProofUrl("");
      setProofName("");
      return;
    }
    if (file.size > MAX_PROOF_BYTES) {
      setLocalError("El comprobante es muy pesado (máx. 1.2MB). Usa una imagen más liviana.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setProofUrl(String(reader.result));
      setProofName(file.name);
      setLocalError(null);
    };
    reader.readAsDataURL(file);
  };

  const confirmar = async () => {
    setLocalError(null);
    if (!paymentMethodId) return setLocalError("Selecciona un método de pago.");
    if (!senderBank.trim()) return setLocalError("Selecciona el banco desde el que pagaste.");
    if (!senderHolderId.trim()) return setLocalError("Ingresa la cédula del titular.");
    if (!senderPhone.trim()) return setLocalError("Ingresa el teléfono emisor.");
    if (!/^\d{6}$/.test(reference.trim())) return setLocalError("Ingresa los últimos 6 dígitos de la referencia.");
    const ok = await submit();
    if (ok) cambiarVista("cpagoenrevision");
  };

  const error = localError ?? submitError;
  const selectedMethod = paymentMethods.find((m) => m.id === paymentMethodId) ?? null;
  const details = selectedMethod?.details ? parseDetails(selectedMethod.details) : [];

  return (
    <div className="relative -mt-10 md:-mt-16">
      <div className="max-w-4xl mx-auto px-6 mb-8 mt-4" />
      <div className="mt-8 md:mt-24">
        <div className="w-full max-w-lg md:max-w-3xl mx-auto p-4 animate-in fade-in slide-in-from-right-8 duration-500">
          {/* Volver a mis datos */}
          <div className="flex justify-center mb-6">
            <button
              className="rounded-full bg-slate-900/70 border border-white/10 text-slate-300 px-4 py-1.5 flex items-center gap-1 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/40 text-[11px] font-bold uppercase tracking-wider transition-colors"
              onClick={() => cambiarVista('ctusdatos')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
              Volver a mis datos
            </button>
          </div>

          {/* Título */}
          <h2 className="text-3xl md:text-4xl font-black text-white text-center uppercase tracking-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
            Método de Pago
          </h2>
          <p className="text-sm text-slate-400 text-center mt-2 mb-8 max-w-md mx-auto text-pretty">
            Selecciona tu plataforma preferida y completa tu participación de forma segura.
          </p>

          {/* Plataformas disponibles */}
          <div className="flex items-center gap-2 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-primary)]">
              <rect width={20} height={14} x={2} y={5} rx={2} />
              <line x1={2} x2={22} y1={10} y2={10} />
            </svg>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Plataformas disponibles
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {paymentMethods.length === 0 && (
              <p className="col-span-2 text-sm text-slate-400 text-center">
                No hay métodos de pago configurados todavía.
              </p>
            )}
            {paymentMethods.map((m) => {
              const active = paymentMethodId === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethodId(m.id)}
                  className={
                    "relative flex flex-col items-center justify-center gap-3 rounded-2xl border p-5 min-h-[120px] transition-all " +
                    (active
                      ? "bg-[var(--color-primary)]/10 border-[var(--color-primary)] shadow-[0_0_25px_rgba(234,179,8,0.15)]"
                      : "bg-slate-900/60 border-white/10 hover:border-white/25")
                  }
                >
                  {active && (
                    <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                  )}
                  <span
                    className={
                      "w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden " +
                      (active ? "bg-[var(--color-primary)]/20" : "bg-slate-800/80")
                    }
                  >
                    {m.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={m.imageUrl || "/placeholder.svg"} alt={m.name} className="w-full h-full object-cover" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-primary)]">
                        <rect width={20} height={14} x={2} y={5} rx={2} />
                        <line x1={2} x2={22} y1={10} y2={10} />
                      </svg>
                    )}
                  </span>
                  <span className={"font-bold uppercase text-[11px] tracking-wide text-center leading-tight " + (active ? "text-white" : "text-slate-300")}>
                    {m.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Monto a transferir */}
          <div className="relative bg-slate-900/70 border border-white/10 rounded-2xl p-6 mb-6 flex flex-col items-center text-center">
            <button
              type="button"
              onClick={() => setShowUsd((v) => !v)}
              className="absolute top-3 right-3 rounded-md bg-slate-800 border border-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-300 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/40 transition-colors"
            >
              {showUsd ? "$ USD" : "$ VES"}
            </button>
            <p className="text-[11px] font-bold text-[var(--color-primary)]/80 uppercase tracking-[0.2em]">
              Monto a transferir
            </p>
            <p className="text-4xl md:text-5xl font-black text-white leading-tight mt-2">
              {showUsd ? formatUsd(totalUsd) : bs(totalBs)}
            </p>
            <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-rose-500/10 border border-rose-500/30 px-3 py-1 text-xs font-bold text-rose-400">
              <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <circle cx={12} cy={12} r={10} />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {mmss(secondsLeft)}
            </span>
            <span className="mt-1 text-[11px] text-slate-500">
              {effectiveQty} {effectiveQty === 1 ? "boleto" : "boletos"}
            </span>
          </div>

          {/* Datos de transferencia (para copiar) */}
          {details.length > 0 && (
            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-primary)]">
                  <rect width={20} height={14} x={2} y={5} rx={2} />
                  <line x1={2} x2={22} y1={10} y2={10} />
                </svg>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Datos de transferencia
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {details.map((d, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-2 rounded-xl bg-slate-950/60 border border-white/5 px-3 py-2.5"
                  >
                    <div className="min-w-0">
                      {d.label && (
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{d.label}</p>
                      )}
                      <p className="text-sm text-white font-mono break-words">{d.value}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => copy(`d-${i}`, d.value)}
                      className="shrink-0 text-slate-500 hover:text-[var(--color-primary)] transition-colors"
                      aria-label={`Copiar ${d.label || "dato"}`}
                    >
                      {copied === `d-${i}` ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-primary)]">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <rect width={14} height={14} x={8} y={8} rx={2} ry={2} />
                          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                        </svg>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tus datos bancarios */}
          <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-5 mb-6 space-y-4">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-primary)]">
                <rect width={14} height={20} x={5} y={2} rx={2} />
                <path d="M12 18h.01" />
              </svg>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Tus datos bancarios
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                  Banco <span className="text-rose-400">*</span>
                </label>
                <select
                  value={senderBank}
                  onChange={(e) => setSenderBank(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-[var(--color-primary)] transition-all"
                >
                  <option value="">Seleccionar...</option>
                  {BANCOS_VE.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                  Cédula del titular <span className="text-rose-400">*</span>
                </label>
                <div className="flex">
                  <select
                    value={senderHolderIdType}
                    onChange={(e) => setSenderHolderIdType(e.target.value)}
                    className="bg-slate-950 border border-slate-700 border-r-0 rounded-l-lg px-2 py-2.5 text-sm text-white outline-none focus:border-[var(--color-primary)] transition-all"
                  >
                    <option value="V">V</option>
                    <option value="E">E</option>
                    <option value="J">J</option>
                  </select>
                  <input
                    inputMode="numeric"
                    value={senderHolderId}
                    onChange={(e) => setSenderHolderId(e.target.value.replace(/\D/g, "").slice(0, 12))}
                    placeholder="12345678"
                    className="w-full bg-slate-950 border border-slate-700 rounded-r-lg px-3 py-2.5 text-sm text-white outline-none focus:border-[var(--color-primary)] transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                Teléfono emisor pago móvil <span className="text-rose-400">*</span>
              </label>
              <input
                inputMode="numeric"
                value={senderPhone}
                onChange={(e) => setSenderPhone(e.target.value.replace(/[^\d]/g, "").slice(0, 11))}
                placeholder="04141234567"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-[var(--color-primary)] transition-all placeholder:text-slate-600"
              />
            </div>

            {/* Últimos 6 dígitos + pegar */}
            <div className="flex items-stretch gap-2">
              <div className="flex items-center gap-2 flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 focus-within:border-[var(--color-primary)] transition-all">
                <span className="text-slate-500 font-bold">#</span>
                <input
                  inputMode="numeric"
                  value={reference}
                  onChange={(e) => setReference(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="ÚLTIMOS 6 DÍGITOS"
                  className="w-full bg-transparent py-2.5 text-sm text-white font-mono tracking-widest outline-none placeholder:font-sans placeholder:tracking-normal placeholder:text-slate-600"
                />
              </div>
              <button
                type="button"
                onClick={pasteReference}
                className="shrink-0 rounded-lg bg-slate-800 border border-white/10 px-4 text-[11px] font-bold uppercase tracking-wider text-slate-300 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/40 transition-colors"
              >
                Pegar
              </button>
            </div>

            {/* Comprobante de pago */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 ml-1">Comprobante de Pago</label>
              <label className="relative overflow-hidden group border-2 border-dashed rounded-xl p-4 flex items-center justify-center gap-2 cursor-pointer transition-all border-slate-700 hover:border-[var(--color-primary)]/50 bg-slate-950/40">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => onFile(e.target.files?.[0] ?? null)}
                />
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-primary)]">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1={12} x2={12} y1={3} y2={15} />
                </svg>
                <span className="text-sm font-bold uppercase tracking-wider text-slate-300">
                  {proofName || "Adjuntar comprobante"}
                </span>
              </label>
              {proofUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={proofUrl || "/placeholder.svg"} alt="Comprobante" className="mt-2 max-h-40 rounded-lg border border-white/10 mx-auto" />
              )}
            </div>
          </div>

          {error && (
            <p className="text-sm font-bold text-rose-400 flex items-center gap-1 mb-4 justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <circle cx={12} cy={12} r={10} />
                <line x1={12} x2={12} y1={8} y2={12} />
                <line x1={12} x2="12.01" y1={16} y2={16} />
              </svg>
              {error}
            </p>
          )}

          {/* Barra inferior */}
          <div className="flex items-stretch gap-3">
            <button
              onClick={() => cambiarVista('ctusdatos')}
              className="shrink-0 px-5 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 border border-white/5 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform">
                <path d="m15 18-6-6 6-6" />
              </svg>
              Volver
            </button>
            <button
              disabled={submitting}
              onClick={confirmar}
              className="flex-1 py-4 font-black text-base uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 group bg-[var(--color-primary)] hover:brightness-110 active:scale-[0.98] text-black shadow-[0_0_25px_rgba(234,179,8,0.2)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Guardando..." : "Confirmar"}
              {!submitting && (
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
