// 1. ¡Obligatorio! Esto activa la reactividad y las funciones del navegador
"use client";

import { useState } from "react";
import { HijoProps } from './types';
import { usePurchase } from './PurchaseContext';

interface ComponenteProps extends HijoProps {
  vistaActiva: string;
}

export default function ComponenteConsultarCTickets({ vistaActiva, cambiarVista }: ComponenteProps) {
  const { consult, consulting } = usePurchase();
  const [cedula, setCedula] = useState("");

  if (vistaActiva != 'cconsultarctickets') {
    return <div></div>;
  }

  const buscar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cedula.trim()) return;
    await consult(cedula.trim());
    cambiarVista('cconsultarctresultados');
  };

  return (
<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
  <div className="bg-slate-850 border border-white/10 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] relative">
    <div className="p-5 border-b border-white/10 flex justify-between items-center bg-slate-850">
      <h3 className="text-white font-bold text-sm flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ticket text-[var(--color-primary)]">
          <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
          <path d="M13 5v2" />
          <path d="M13 17v2" />
          <path d="M13 11v2" />
        </svg>
        Mis Boletos
      </h3>
      <button className="text-white hover:text-white transition-colors bg-slate-800 p-1 rounded-full hover:bg-slate-700"
        onClick={() => cambiarVista('inicio')}>
        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>
    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar relative">
      <form className="mb-8 animate-in fade-in slide-in-from-bottom-4" onSubmit={buscar}>
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center mx-auto mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-credit-card text-[var(--color-primary)]">
              <rect width={20} height={14} x={2} y={5} rx={2} />
              <line x1={2} x2={22} y1={10} y2={10} />
            </svg>
          </div>
          <p className="text-white text-sm opacity-80">
            Ingresa tu cédula para ver tus participaciones.
          </p>
        </div>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-[var(--color-primary)]">
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx={12} cy={7} r={4} />
            </svg>
          </div>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Ej: 24551789"
            className="w-full bg-slate-900 border rounded-2xl pl-12 pr-14 py-4 text-white outline-none transition-all placeholder-slate-500 border-[var(--color-primary)]/50 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
            autoComplete="off"
            value={cedula}
            onChange={(e) => setCedula(e.target.value.replace(/\D/g, ""))}
          />
          <button
            type="submit"
            disabled={consulting}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl transition-all flex items-center justify-center shadow-lg bg-[var(--color-primary)] hover:brightness-110 text-[var(--color-primary-foreground)] shadow-[var(--color-primary)]/20 disabled:opacity-60"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
  );
}
