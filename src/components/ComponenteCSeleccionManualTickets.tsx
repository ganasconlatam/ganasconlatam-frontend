// 1. ¡Obligatorio! Esto activa la reactividad y las funciones del navegador
"use client"; 

import { useState } from "react";
import { HijoProps } from './types'; 

export default function ComponenteCSeleccionManualTickets({ cambiarVista }: HijoProps) {


  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
  <div className="bg-slate-850 border border-slate-700 w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] relative overflow-hidden">
    <div className="p-4 border-b border-slate-700 bg-slate-900 flex justify-between items-center shrink-0">
      <div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          Seleccionar Tickets
        </h3>
        <p className="text-xs text-slate-400">
          Mostrando por series (Total: 10000)
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-[var(--color-primary)] transition-colors disabled:opacity-50"
          title="Recargar Disponibilidad"
          onClick={() => cambiarVista('cseleccionmanualconfirmar')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-refresh-cw"
          >
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
          </svg>
        </button>
        <button className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
          onClick={() => cambiarVista('cseleccionmanualconfirmar')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
    </div>
    <div className="p-3 bg-slate-900/90 border-b border-slate-800 flex items-center gap-2 shrink-0">
      <div className="relative flex-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={17}
          height={17}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        >
          <circle cx={11} cy={11} r={8} />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          placeholder="Buscar tu número preferido (ej. 0046, 777)..."
          className="w-full bg-slate-800/90 border border-slate-700/80 rounded-xl pl-10 pr-9 py-2.5 text-sm text-white placeholder-slate-400 outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all font-mono"
          defaultValue=""
        />
      </div>
    </div>
    <div className="bg-slate-800 border-b border-slate-700 flex overflow-x-auto custom-scrollbar shrink-0">
      <button className="px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-colors border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-700">
        Serie 0 (0-999)
      </button>
      <button className="px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-colors border-[var(--color-primary)] text-[var(--color-primary)] bg-slate-800">
        Serie 1 (1000-1999)
      </button>
      <button className="px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-colors border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-700">
        Serie 2 (2000-2999)
      </button>
      <button className="px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-colors border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-700">
        Serie 3 (3000-3999)
      </button>
      <button className="px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-colors border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-700">
        Serie 4 (4000-4999)
      </button>
      <button className="px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-colors border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-700">
        Serie 5 (5000-5999)
      </button>
      <button className="px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-colors border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-700">
        Serie 6 (6000-6999)
      </button>
      <button className="px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-colors border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-700">
        Serie 7 (7000-7999)
      </button>
      <button className="px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-colors border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-700">
        Serie 8 (8000-8999)
      </button>
      <button className="px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-colors border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-700">
        Serie 9 (9000-9999)
      </button>
    </div>
    <div className="flex-1 overflow-y-auto p-4 bg-slate-850 relative">
      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
        <button
          disabled={true}
          className="h-12 md:h-14 rounded-xl text-base md:text-lg font-mono font-black transition-all duration-200 border-2 bg-red-900/20 border-red-900/50 text-red-700 cursor-not-allowed opacity-50"
        >
          1000
        </button>
        <button className="h-12 md:h-14 rounded-xl text-base md:text-lg font-mono font-black transition-all duration-200 border-2 bg-slate-800 border-slate-700 text-slate-300 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-slate-750">
          1001
        </button>
        <button
          disabled={true}
          className="h-12 md:h-14 rounded-xl text-base md:text-lg font-mono font-black transition-all duration-200 border-2 bg-red-900/20 border-red-900/50 text-red-700 cursor-not-allowed opacity-50"
        >
          1002
        </button>
        <button
          disabled={true}
          className="h-12 md:h-14 rounded-xl text-base md:text-lg font-mono font-black transition-all duration-200 border-2 bg-red-900/20 border-red-900/50 text-red-700 cursor-not-allowed opacity-50"
        >
          1003
        </button>
        <button
          disabled={true}
          className="h-12 md:h-14 rounded-xl text-base md:text-lg font-mono font-black transition-all duration-200 border-2 bg-red-900/20 border-red-900/50 text-red-700 cursor-not-allowed opacity-50"
        >
          1998
        </button>
        <button className="h-12 md:h-14 rounded-xl text-base md:text-lg font-mono font-black transition-all duration-200 border-2 bg-slate-800 border-slate-700 text-slate-300 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-slate-750">
          1999
        </button>
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
        <div className="text-right mr-2 hidden sm:block sf-hidden" />
        <button className="flex-1 sm:flex-none bg-[var(--color-primary)] hover:brightness-110 text-black font-black px-8 py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_var(--color-primary)] hover:scale-105 active:scale-95"
         onClick={() => cambiarVista('cseleccionmanualconfirmar')} >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-check"
          >
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
