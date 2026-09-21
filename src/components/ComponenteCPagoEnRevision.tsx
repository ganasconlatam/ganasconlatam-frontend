// 1. ¡Obligatorio! Esto activa la reactividad y las funciones del navegador
"use client";

import { useState } from "react";
import { HijoProps } from './types';
import { usePurchase } from './PurchaseContext';

export default function ComponenteCPagoEnRevision({ cambiarVista }: HijoProps) {
  const { lastTickets, buyer, socialLinks } = usePurchase();
  const [copied, setCopied] = useState(false);

  const whatsapp = socialLinks.find((s) => s.platform === "whatsapp");

  const copiar = () => {
    navigator.clipboard?.writeText(lastTickets.join(", "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative -mt-10 md:-mt-16">
  <div className="absolute -top-32 left-0 w-full h-px pointer-events-none" />
  <div className="max-w-4xl mx-auto px-6 mb-8 mt-4" />
  <div className="mt-8 md:mt-24">
    <div className="w-full max-w-lg md:max-w-6xl mx-auto p-4 md:p-8 text-center animate-in zoom-in-95 duration-500">
      <div className="w-24 h-24 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)] animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" width={44} height={44} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock text-white">
          <circle cx={12} cy={12} r={10} />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </div>
      <h2 className="text-3xl font-black text-[var(--color-text)] mb-2 uppercase">
        ¡Pago en Revisión!
      </h2>
      <p className="text-[var(--color-text)] opacity-70 text-sm mb-2">
        Tu comprobante pasará a ser verificado manualmente por nuestro equipo.
      </p>
      {buyer.email && (
        <p className="text-[var(--color-text)] opacity-60 text-xs mb-8">
          Enviamos la confirmación de verificación a{" "}
          <span className="font-bold text-[var(--color-primary)]">{buyer.email}</span>
        </p>
      )}
      <div className="w-full max-w-lg mx-auto bg-[var(--color-surface)] border border-white/10 rounded-2xl p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xs font-bold text-[var(--color-text)] opacity-50 uppercase tracking-widest">
            Tus Boletos
          </p>
          <button
            onClick={copiar}
            className="text-[10px] text-[var(--color-text)] opacity-50 font-bold uppercase hover:text-[var(--color-primary)] transition-colors flex items-center gap-1.5"
          >
            {copied ? "¡Copiado!" : "Copiar"}
          </button>
        </div>
        <div className="flex flex-wrap gap-2 justify-center max-h-40 overflow-y-auto custom-scrollbar p-1">
          {lastTickets.length === 0 && (
            <span className="text-sm text-[var(--color-text)] opacity-60">
              Tus boletos serán asignados al confirmar el pago.
            </span>
          )}
          {lastTickets.map((t) => (
            <span key={t} className="font-mono font-bold px-3 py-1.5 rounded-lg border bg-[#1e293b] text-white border-slate-700 uppercase">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="w-full max-w-sm mx-auto">
        {whatsapp && (
          <a
            href={whatsapp.url}
            target="_blank"
            rel="noreferrer"
            className="mb-4 flex items-center justify-between gap-3 sm:gap-4 border backdrop-blur-md rounded-2xl p-2.5 sm:px-4 sm:py-3 transition-all duration-300 w-full cursor-pointer relative overflow-hidden group hover:-translate-y-0.5 active:scale-[0.99] bg-gradient-to-r from-emerald-950/40 via-slate-900/80 to-slate-900/90 border-emerald-500/30 hover:border-emerald-400/60 shadow-[0_4px_25px_rgba(16,185,129,0.15)] hover:shadow-[0_4px_30px_rgba(16,185,129,0.3)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <div className="flex items-center gap-3 min-w-0 z-10">
              <div className="w-11 h-11 rounded-xl border flex items-center justify-center relative shrink-0 shadow-inner group-hover:scale-105 transition-transform bg-emerald-500/20 border-emerald-400/30 text-[#25D366]">
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-emerald-400" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle">
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                </svg>
              </div>
              <div className="flex flex-col text-left min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                    Canal Oficial
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-black text-white group-hover:text-slate-100 transition-colors truncate">
                  Únete a nuestra comunidad de WhatsApp
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[11px] sm:text-xs font-bold border px-2.5 sm:px-3 py-1.5 rounded-full shrink-0 transition-all z-10 text-emerald-300 bg-emerald-500/10 border-emerald-500/30 group-hover:bg-emerald-500/20">
              <span className="hidden xs:inline sm:inline sf-hidden">Unirme</span>
              <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right group-hover:translate-x-0.5 transition-transform">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </a>
        )}
        <button className="w-full px-8 py-4 bg-[var(--color-surface)] text-[var(--color-text)] font-bold rounded-xl border border-white/5 shadow-lg"
          onClick={() => cambiarVista('inicio')}>
          Volver al Inicio
        </button>
      </div>
    </div>
  </div>
</div>
  );
}
