// 1. ¡Obligatorio! Esto activa la reactividad y las funciones del navegador
"use client"; 

import { useState } from "react";
import { HijoProps } from './types'; 


export default function ComponenteInicioPromocion({ cambiarVista }: HijoProps) {

return (

<div className="relative z-10">
  <div className="flex flex-col relative w-full items-center justify-start overflow-hidden group">
    <div className="relative w-full aspect-video lg:aspect-auto lg:h-[567.8px] bg-slate-900 overflow-hidden">
      <div
        className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
        style={{
          backgroundImage:
            "/* original URL: https://vds-api.rifalotodo.com/uploads/file-1789437354712-829171280.webp */url(images/2.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center center"
        }}
      ></div>
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white/80 text-xs px-3 py-1.5 rounded-lg shadow-lg font-mono tracking-wider border border-white/10 z-10 select-none">
        CNL-AUT-RF-2026-000958
      </div>
      <div className="absolute inset-x-0 bottom-0 min-h-32 md:min-h-48 bg-gradient-to-t from-slate-900 to-transparent flex flex-col justify-end pb-3 px-0"></div>
      <div className="absolute top-20 md:top-24 right-4 flex gap-2 z-30" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
        <span className="bg-purple-950/90 text-purple-200 border-4 border-purple-400/60 px-8 py-3 text-3xl md:text-5xl font-black uppercase tracking-widest transform -rotate-12 shadow-2xl backdrop-blur-sm">
          ✨ PRÓXIMAMENTE
        </span>
      </div>
      
    </div>
    <div className="w-full bg-transparent relative z-20 pb-6 border-b border-white/5 shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
      <div className="max-w-6xl mx-auto px-4 pt-4 pb-6 md:py-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-8">
          <div className="space-y-3 lg:space-y-4 flex-1 text-left">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white leading-tight uppercase tracking-tighter drop-shadow-2xl">
              Combo TOYOTA Agya 2026{" "}
            </h1>
            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] md:text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-purple-500/30 border border-purple-400/40 whitespace-nowrap ml-2">
              ✨ Próximamente
            </span>
            <div className="inline-flex flex-wrap sm:flex-nowrap justify-center md:justify-start items-center gap-2 sm:gap-4 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg w-auto max-w-full">
              <div className="flex items-center gap-1.5 shrink-0">
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
                  className="lucide lucide-calendar-days w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 stroke-[2.5]"
                >
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <rect width={18} height={18} x={3} y={4} rx={2} />
                  <path d="M3 10h18" />
                  <path d="M8 14h.01" />
                  <path d="M12 14h.01" />
                  <path d="M16 14h.01" />
                  <path d="M8 18h.01" />
                  <path d="M12 18h.01" />
                  <path d="M16 18h.01" />
                </svg>
                <span className="text-white font-black text-[11px] sm:text-xs md:text-[13px] tracking-wide uppercase mt-0.5 whitespace-nowrap">
                  17 sept. 2026
                </span>
              </div>
              <div className="w-px h-3.5 sm:h-4 bg-white/15 shrink-0" />
              <div className="flex items-center gap-1.5 shrink-0">
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
                  className="lucide lucide-clock w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 stroke-[2.5]"
                >
                  <circle cx={12} cy={12} r={10} />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="text-white font-black text-[11px] sm:text-xs md:text-[13px] tracking-wide uppercase mt-0.5 whitespace-nowrap">
                  10:00 p.&nbsp;m.
                </span>
              </div>
              <div className="w-px h-3.5 sm:h-4 bg-white/15 shrink-0" />
              <div className="flex items-center gap-1.5 shrink-0">
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
                  className="lucide lucide-tag w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#25D366] stroke-[2.5]"
                >
                  <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
                  <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
                </svg>
                <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5 whitespace-nowrap">
                  <span className="text-white font-black text-xs sm:text-sm md:text-base tracking-wide uppercase">
                    BS 4599
                  </span>
                  <span className="text-slate-400 font-medium text-[10px] sm:text-xs">
                    /
                  </span>
                  <span className="text-[#25D366] font-black text-xs sm:text-sm md:text-base tracking-wide uppercase">
                    4.85 USD
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-auto pt-2 lg:pt-0 lg:ml-auto flex flex-row items-stretch gap-3">
            <button className="px-5 py-3.5 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-[10px] md:text-xs font-bold text-slate-300 hover:text-white uppercase tracking-widest whitespace-nowrap flex items-center justify-center flex-[0.8] lg:flex-none">
              VER DETALLES
            </button>
            <button className="relative overflow-hidden px-6 lg:px-10 py-3.5 rounded-xl font-black text-xs md:text-sm uppercase tracking-widest transition-all group whitespace-nowrap flex-[1.2] lg:flex-none flex justify-center bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-[0_0_35px_rgba(var(--color-primary-rgb),0.6)] hover:scale-105 active:scale-95 animate-pulse-slow">
              <span className="relative z-10 flex items-center gap-2 drop-shadow-md">
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
                  className="lucide lucide-ticket w-4 h-4 md:w-5 md:h-5 animate-bounce"
                >
                  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
                  <path d="M13 5v2" />
                  <path d="M13 17v2" />
                  <path d="M13 11v2" />
                </svg>
                <span className="text-base text-shadow-sm">
                  ⏳ PRÓXIMAMENTE
                </span>
              </span>
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-12 -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
              <div className="absolute inset-0 bg-white/20 mix-blend-overlay opacity-50" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="relative -mt-10 md:-mt-16">
    <div className="absolute -top-32 left-0 w-full h-px pointer-events-none" />
    <div className="max-w-4xl mx-auto px-6 mb-8 mt-4" />
    <div className="mt-8 md:mt-24">
      <div className="w-full max-w-2xl mx-auto p-8 my-10 bg-gradient-to-br from-purple-950/60 via-slate-900 to-purple-900/40 border-2 border-purple-500/40 rounded-3xl text-center space-y-6 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-500">
        <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 border border-purple-500/40 px-5 py-2 rounded-full text-sm font-black uppercase tracking-wider shadow-lg">
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
            className="lucide lucide-sparkles text-purple-400 animate-pulse"
          >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
            <path d="M5 3v4" />
            <path d="M19 17v4" />
            <path d="M3 5h4" />
            <path d="M17 19h4" />
          </svg>{" "}
          Sorteo Próximamente
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
          ¡Ventas Disponibles Muy Pronto!
        </h2>
        <p className="text-slate-300 text-base max-w-lg mx-auto leading-relaxed">
          Esta rifa se encuentra en preparación y preventa visual. Las compras
          están 100% bloqueadas temporalmente. ¡Mantente atento para adquirir
          tus boletos apenas inicie!
        </p>
        <div className="bg-slate-950/80 border border-purple-500/30 rounded-2xl p-6 max-w-md mx-auto grid grid-cols-2 gap-4">
          <div>
            <span className="text-xs text-slate-400 uppercase font-bold block mb-1">
              Precio Boleto
            </span>
            <span className="text-2xl md:text-3xl font-black text-purple-300">
              $4.85
            </span>
          </div>
          <div className="border-l border-slate-800">
            <span className="text-xs text-slate-400 uppercase font-bold block mb-1">
              En Bolívares
            </span>
            <span className="text-2xl md:text-3xl font-black text-purple-300">
              Bs 4599
            </span>
          </div>
        </div>
        <div className="pt-4 flex justify-center">
          <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 text-white font-black text-base uppercase tracking-widest shadow-xl shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all border border-purple-400/40 flex items-center gap-2">
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
              className="lucide lucide-gift"
            >
              <rect x={3} y={8} width={18} height={4} rx={1} />
              <path d="M12 8v13" />
              <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
              <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path>
            </svg>{" "}
            Ver Premios y Detalles
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

  
  );
}