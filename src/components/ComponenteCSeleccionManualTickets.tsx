// 1. ¡Obligatorio! Esto activa la reactividad y las funciones del navegador
"use client";

import { useMemo, useState } from "react";
import { HijoProps } from './types';
import { usePurchase, formatTicket } from './PurchaseContext';

const SERIE_SIZE = 1000;
const MAX_RENDER = 300; // límite de botones por vista para no saturar el DOM

export default function ComponenteCSeleccionManualTickets({ cambiarVista }: HijoProps) {
  const { raffle, takenNumbers, selectedTickets, toggleTicket, pad } = usePurchase();
  const [serie, setSerie] = useState(0);
  const [search, setSearch] = useState("");

  const total = raffle?.totalTickets ?? 0;
  const takenSet = useMemo(() => new Set(takenNumbers), [takenNumbers]);
  const seriesCount = Math.max(1, Math.ceil(total / SERIE_SIZE));

  const numbers = useMemo(() => {
    const list: string[] = [];
    if (search.trim()) {
      const q = search.trim();
      for (let i = 0; i < total && list.length < MAX_RENDER; i++) {
        const label = formatTicket(i, pad);
        if (label.includes(q)) list.push(label);
      }
      return list;
    }
    const start = serie * SERIE_SIZE;
    const end = Math.min(start + SERIE_SIZE, total);
    for (let i = start; i < end; i++) list.push(formatTicket(i, pad));
    return list;
  }, [search, serie, total, pad]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
  <div className="bg-slate-850 border border-slate-700 w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] relative overflow-hidden">
    <div className="p-4 border-b border-slate-700 bg-slate-900 flex justify-between items-center shrink-0">
      <div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          Seleccionar Tickets
        </h3>
        <p className="text-xs text-slate-400">
          {raffle ? `Mostrando por series (Total: ${total.toLocaleString("es-VE")})` : "No hay rifa activa"}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-[var(--color-primary)] px-2">
          {selectedTickets.length} seleccionados
        </span>
        <button className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
          onClick={() => cambiarVista('inicio')}>
          <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
    </div>
    <div className="p-3 bg-slate-900/90 border-b border-slate-800 flex items-center gap-2 shrink-0">
      <div className="relative flex-1">
        <svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
          <circle cx={11} cy={11} r={8} />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          inputMode="numeric"
          placeholder="Buscar tu número preferido (ej. 0046, 777)..."
          className="w-full bg-slate-800/90 border border-slate-700/80 rounded-xl pl-10 pr-9 py-2.5 text-sm text-white placeholder-slate-400 outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all font-mono"
          value={search}
          onChange={(e) => setSearch(e.target.value.replace(/\D/g, ""))}
        />
      </div>
    </div>
    {!search && seriesCount > 1 && (
      <div className="bg-slate-800 border-b border-slate-700 flex overflow-x-auto custom-scrollbar shrink-0">
        {Array.from({ length: seriesCount }).map((_, i) => {
          const active = serie === i;
          return (
            <button
              key={i}
              onClick={() => setSerie(i)}
              className={
                "px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-colors " +
                (active
                  ? "border-[var(--color-primary)] text-[var(--color-primary)] bg-slate-800"
                  : "border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-700")
              }
            >
              Serie {i} ({i * SERIE_SIZE}-{Math.min((i + 1) * SERIE_SIZE - 1, total - 1)})
            </button>
          );
        })}
      </div>
    )}
    <div className="flex-1 overflow-y-auto p-4 bg-slate-850 relative">
      {numbers.length === 0 && (
        <p className="text-center text-slate-400 text-sm py-10">
          No se encontraron números para tu búsqueda.
        </p>
      )}
      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
        {numbers.map((label) => {
          const taken = takenSet.has(label);
          const selected = selectedTickets.includes(label);
          if (taken) {
            return (
              <button
                key={label}
                disabled
                className="h-12 md:h-14 rounded-xl text-base md:text-lg font-mono font-black transition-all duration-200 border-2 bg-red-900/20 border-red-900/50 text-red-700 cursor-not-allowed opacity-50"
              >
                {label}
              </button>
            );
          }
          return (
            <button
              key={label}
              onClick={() => toggleTicket(label)}
              className={
                "h-12 md:h-14 rounded-xl text-base md:text-lg font-mono font-black transition-all duration-200 border-2 " +
                (selected
                  ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-black scale-105"
                  : "bg-slate-800 border-slate-700 text-slate-300 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]")
              }
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
    <div className="p-4 border-t border-slate-700 bg-slate-900 shrink-0 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-slate-700 border border-slate-600" />
          <span className="text-slate-400">Disponible</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-red-900/50 border border-red-900" />
          <span className="text-slate-400">Ocupado</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-[var(--color-primary)] border border-[var(--color-primary)]" />
          <span className="text-slate-400">Seleccionado</span>
        </div>
      </div>
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button
          disabled={selectedTickets.length === 0}
          className="flex-1 sm:flex-none bg-[var(--color-primary)] hover:brightness-110 text-black font-black px-8 py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_var(--color-primary)] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          onClick={() => cambiarVista('cseleccionmanualconfirmar')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check">
            <path d="M20 6 9 17l-5-5" />
          </svg>{" "}
          <span className="uppercase tracking-wider">Confirmar</span>
        </button>
      </div>
    </div>
  </div>
</div>
  );
}
