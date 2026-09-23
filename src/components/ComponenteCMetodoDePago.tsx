// 1. ¡Obligatorio! Esto activa la reactividad y las funciones del navegador
"use client";

import { useState } from "react";
import { HijoProps } from './types';
import { usePurchase, bs } from './PurchaseContext';
import { formatUsd } from '@/lib/money';

const MAX_PROOF_BYTES = 1_200_000; // ~1.2MB para el comprobante en base64

export default function ComponenteCMetodoDePago({ cambiarVista }: HijoProps) {
  const {
    paymentMethods,
    paymentMethodId,
    setPaymentMethodId,
    reference,
    setReference,
    proofUrl,
    setProofUrl,
    effectiveQty,
    totalBs,
    totalUsd,
    submitting,
    submitError,
    submit,
  } = usePurchase();

  const [localError, setLocalError] = useState<string | null>(null);
  const [proofName, setProofName] = useState<string>("");

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
    if (!/^\d{6}$/.test(reference.trim())) return setLocalError("La referencia debe tener exactamente 6 números.");
    const ok = await submit();
    if (ok) cambiarVista("cpagoenrevision");
  };

  const error = localError ?? submitError;
  const selectedMethod = paymentMethods.find((m) => m.id === paymentMethodId) ?? null;

  return (
    <div className="relative -mt-10 md:-mt-16">
      <div className="absolute -top-32 left-0 w-full h-px pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 mb-8 mt-4" />
      <div className="mt-8 md:mt-24">
        <div className="w-full max-w-lg md:max-w-3xl mx-auto p-4 animate-in fade-in slide-in-from-right-8 duration-500">
          <button
            className="text-slate-400 mb-6 flex items-center gap-1 hover:text-[var(--color-primary)] text-sm font-bold transition-colors mx-auto"
            onClick={() => cambiarVista('ctusdatos')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right rotate-180">
              <path d="m9 18 6-6-6-6" />
            </svg>
            Volver a mis datos
          </button>

          <h2 className="text-xl font-black text-white mb-6 uppercase text-center flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-credit-card text-[var(--color-primary)]">
              <rect width={20} height={14} x={2} y={5} rx={2} />
              <line x1={2} x2={22} y1={10} y2={10} />
            </svg>{" "}
            Método de Pago
          </h2>

          {/* Métodos de pago disponibles */}
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center mb-3">
            Selecciona tu método de pago
          </p>
          <div className="grid grid-cols-2 gap-3 mb-6">
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
                    "relative flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all " +
                    (active
                      ? "bg-[var(--color-primary)]/10 border-[var(--color-primary)] shadow-[0_0_20px_rgba(234,179,8,0.15)]"
                      : "bg-slate-900/50 border-white/10 hover:border-white/30")
                  }
                >
                  {active && (
                    <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                  )}
                  {m.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.imageUrl} alt={m.name} className="w-10 h-10 rounded-lg object-cover" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-primary)]">
                      <rect width={20} height={14} x={2} y={5} rx={2} />
                      <line x1={2} x2={22} y1={10} y2={10} />
                    </svg>
                  )}
                  <span className="font-black text-white uppercase text-xs tracking-wide text-center leading-tight">
                    {m.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Resumen del monto */}
          <div className="bg-slate-900/70 border border-[var(--color-primary)]/30 rounded-2xl p-6 mb-6 flex flex-col items-center text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {effectiveQty} {effectiveQty === 1 ? "boleto" : "boletos"} · Total a pagar
            </p>
            <p className="text-4xl font-black text-white leading-tight mt-1">{bs(totalBs)}</p>
            <span className="text-sm font-bold text-[var(--color-primary)] mt-1">
              {formatUsd(totalUsd)}
            </span>
          </div>

          {/* Datos del método seleccionado, para copiar */}
          {selectedMethod?.details && (
            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-4 mb-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Datos para el pago · {selectedMethod.name}
              </p>
              <p className="text-sm text-slate-200 font-mono whitespace-pre-line break-words">
                {selectedMethod.details}
              </p>
            </div>
          )}

          {/* Referencia y comprobante */}
          <div className="space-y-4 mb-8 bg-slate-900/50 p-5 rounded-2xl border border-white/5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 ml-1 flex items-center gap-1">
                <span>REFERENCIA DEL PAGO</span>
                <span className="text-rose-400">*</span>
              </label>
              <input
                className="w-full bg-slate-950 border rounded-lg px-4 py-3 text-white font-mono tracking-widest outline-none transition-all border-slate-700 focus:border-[var(--color-primary)] placeholder:font-sans placeholder:tracking-normal placeholder:text-slate-600"
                placeholder="Últimos dígitos de la referencia"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 ml-1">
                COMPROBANTE DE PAGO (opcional)
              </label>
              <label className="relative overflow-hidden group border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all border-slate-800 hover:border-[var(--color-primary)]/50 bg-slate-900/30">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => onFile(e.target.files?.[0] ?? null)}
                />
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload text-[var(--color-primary)]">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1={12} x2={12} y1={3} y2={15} />
                </svg>
                <span className="text-sm font-bold text-slate-300">
                  {proofName || "Sube una captura de tu pago"}
                </span>
              </label>
              {proofUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={proofUrl} alt="Comprobante" className="mt-2 max-h-40 rounded-lg border border-white/10 mx-auto" />
              )}
            </div>
          </div>

          {error && (
            <p className="text-sm font-bold text-rose-400 flex items-center gap-1 mb-4 justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-circle">
                <circle cx={12} cy={12} r={10} />
                <line x1={12} x2={12} y1={8} y2={12} />
                <line x1={12} x2="12.01" y1={16} y2={16} />
              </svg>
              {error}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              disabled={submitting}
              onClick={confirmar}
              className="flex-[2] order-1 sm:order-2 py-4 font-black text-lg uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 group bg-[var(--color-primary)] hover:brightness-110 active:scale-95 text-black shadow-[0_0_20px_rgba(234,179,8,0.2)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Guardando..." : "Confirmar compra"}
              {!submitting && (
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check group-hover:scale-110 transition-transform">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              )}
            </button>
            <button
              onClick={() => cambiarVista('ctusdatos')}
              className="flex-1 order-2 sm:order-1 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 group border border-white/5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left group-hover:-translate-x-1 transition-transform">
                <path d="m15 18-6-6 6-6" />
              </svg>{" "}
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
