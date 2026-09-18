// 1. ¡Obligatorio! Esto activa la reactividad y las funciones del navegador
"use client"; 

import { useState } from "react";
import { HijoProps } from './types'; 

export default function ComponenteCSeleccionManualConfirmar({ cambiarVista }: HijoProps) {


  return (
    
<div className="relative -mt-10 md:-mt-16">
  <div className="absolute -top-32 left-0 w-full h-px pointer-events-none" />
  <div className="max-w-4xl mx-auto px-6 mb-8 mt-4" />
  <div className="mt-8 md:mt-24">
    <div className="w-full max-w-lg md:max-w-6xl mx-auto p-4 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <h2 className="mt-10 text-2xl font-black text-center text-white mb-2 uppercase tracking-tight">
        selecciona tus boletos
      </h2>
      <div className="flex bg-[var(--color-surface)]/50 p-1 rounded-xl mb-6 border border-white/10 max-w-md mx-auto">
        <button className="flex-1 py-3 rounded-lg text-xs font-bold transition-all text-[var(--color-text)] opacity-60 hover:opacity-100 hover:text-[var(--color-text)]"
          onClick={() => cambiarVista('inicio')}>
          <div className="flex items-center justify-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-shuffle"
            >
              <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" />
              <path d="m18 2 4 4-4 4" />
              <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
              <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
              <path d="m18 14 4 4-4 4" />
            </svg>{" "}
            AL AZAR
          </div>
        </button>
        <button className="flex-1 py-3 rounded-lg text-xs font-bold transition-all bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-lg scale-[1.02]"
          onClick={() => cambiarVista('cseleccionmanualtickets')}>
          <div className="flex items-center justify-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-hand"
            >
              <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
              <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
              <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
              <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path>
            </svg>{" "}
            MANUAL
          </div>
        </button>
      </div>
      <div className="mb-8 max-w-md mx-auto">
        <button className="w-full py-8 border-2 border-dashed border-slate-700 hover:border-[var(--color-primary)] rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-white transition-all bg-slate-900/40 group" 
          onClick={() => cambiarVista('cseleccionmanualtickets')}>
          <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:text-black transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-plus"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </div>
          <span className="font-bold">Elegir mis números</span>
        </button>
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          <span className="bg-[var(--color-primary)] text-black text-xs font-black px-3 py-1.5 rounded shadow-sm">
            0000
          </span>
        </div>
      </div>
      <div className="flex items-stretch gap-3 h-[72px] max-w-2xl mx-auto mb-4">
        <button className="flex-1 bg-[var(--color-primary)] rounded-2xl flex items-center justify-between px-6 transition-all active:scale-[0.98] shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.3)] text-[var(--color-primary-foreground)] group hover:brightness-110 relative overflow-hidden active:scale-95"
          onClick={() => cambiarVista('ctusdatos')}>
          <div className="flex flex-col items-start z-10 py-1 min-w-0">
            <span className="text-xs font-bold uppercase tracking-wider opacity-80 mb-0.5">
              Participar
            </span>
            <div className="flex items-baseline gap-2 truncate">
              <span className="text-2xl font-black leading-none tracking-tight whitespace-nowrap">
                Bs 2.499
              </span>
            </div>
          </div>
          <div className="bg-black/10 p-2 rounded-full group-hover:bg-black/20 transition-colors z-10 text-white shrink-0 ml-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-right group-hover:translate-x-1 transition-transform"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-100%] animate-[shimmer_3s_infinite]"></div>
        </button>
      </div>
      <div className="w-full mb-8 px-2 flex justify-center">
        <a
          href="#"
          rel="noreferrer"
          className="flex items-center justify-between gap-3 sm:gap-4 border backdrop-blur-md rounded-2xl p-2.5 sm:px-4 sm:py-3 transition-all duration-300 w-full max-w-lg cursor-pointer mt-4 relative overflow-hidden group hover:-translate-y-0.5 active:scale-[0.99] bg-gradient-to-r from-emerald-950/40 via-slate-900/80 to-slate-900/90 border-emerald-500/30 hover:border-emerald-400/60 shadow-[0_4px_25px_rgba(16,185,129,0.15)] hover:shadow-[0_4px_30px_rgba(16,185,129,0.3)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <div className="flex items-center gap-3 min-w-0 z-10">
            <div className="w-11 h-11 rounded-xl border flex items-center justify-center relative shrink-0 shadow-inner group-hover:scale-105 transition-transform bg-emerald-500/20 border-emerald-400/30 text-[#25D366]">
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-emerald-400" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
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
                className="lucide lucide-message-circle"
              >
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right group-hover:translate-x-0.5 transition-transform"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </div>
        </a>
      </div>
    </div>
  </div>
</div>

  );
}

