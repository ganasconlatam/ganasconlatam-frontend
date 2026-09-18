// 1. ¡Obligatorio! Esto activa la reactividad y las funciones del navegador
"use client"; 

import { useState } from "react";
import { HijoProps } from './types'; 

interface ComponenteProps extends HijoProps {
  vistaActiva: string;
}

export default function ComponenteConsultarCTResultados({ vistaActiva, cambiarVista }: ComponenteProps) {
  if (vistaActiva!='cconsultarctresultados') {
    return <div></div>;
  }
  return (

    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
  <div className="bg-slate-850 border border-white/10 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] relative">
    <div className="p-5 border-b border-white/10 flex justify-between items-center bg-slate-850">
      <h3 className="text-white font-bold text-sm flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-ticket text-[var(--color-primary)]"
        >
          <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
          <path d="M13 5v2" />
          <path d="M13 17v2" />
          <path d="M13 11v2" />
        </svg>
        Mis Boletos
      </h3>
      <button className="text-white hover:text-white transition-colors bg-slate-800 p-1 rounded-full hover:bg-slate-700"
        onClick={() => cambiarVista('inicio')}>
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
          className="lucide lucide-x"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>
    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar relative">
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-amber-600 flex items-center justify-center text-[var(--color-primary-foreground)] font-bold text-xl shadow-lg shadow-[var(--color-primary)]/20">
              M
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                Boletos de
              </p>
              <p className="text-white font-bold text-lg leading-tight">
                Marvelis Díaz
              </p>
            </div>
          </div>
          <button className="text-xs text-slate-400 hover:text-white border border-slate-700 px-3 py-1.5 rounded-lg transition-colors"
            onClick={() => cambiarVista('cconsultarctickets')}>
            Cambiar
          </button>
        </div>
        <div className="space-y-4">
          <div className="bg-slate-900 border rounded-2xl p-5 transition-colors relative overflow-hidden border-[var(--color-primary)]/50 shadow-lg shadow-[var(--color-primary)]/10">
            <div className="absolute top-0 right-0 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] text-[9px] font-bold px-2 py-0.5 rounded-bl-lg flex items-center gap-1 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={8}
                height={8}
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-star"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>{" "}
              DESTACADO
            </div>
            <div className="flex justify-between items-start mb-4">
              <h5 className="font-bold text-sm pr-16 leading-snug text-white">
                Ganate 15.000 lechugas mas por tan solo 2499 BS!
              </h5>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="font-mono font-bold px-3 py-1.5 rounded-lg text-sm shadow-inner border bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20">
                #2536
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
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
                  className="lucide lucide-calendar"
                >
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <rect width={18} height={18} x={3} y={4} rx={2} />
                  <path d="M3 10h18" />
                </svg>
                <span>Comprado el 14/09/2026, 10:37 a.&nbsp;m.</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase border tracking-wide bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                CONFIRMADO
              </span>
            </div>
          </div>
          <div className="bg-slate-900 border rounded-2xl p-5 transition-colors relative overflow-hidden border-[var(--color-primary)]/50 shadow-lg shadow-[var(--color-primary)]/10">
            <div className="absolute top-0 right-0 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] text-[9px] font-bold px-2 py-0.5 rounded-bl-lg flex items-center gap-1 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={8}
                height={8}
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-star"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>{" "}
              DESTACADO
            </div>
            <div className="flex justify-between items-start mb-4">
              <h5 className="font-bold text-sm pr-16 leading-snug text-white">
                Ganate 15.000 lechugas por tan solo 2499 Bs!
              </h5>
            </div>
            <div className="flex flex-wrap gap-2 mb-4" />
            <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
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
                  className="lucide lucide-calendar"
                >
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <rect width={18} height={18} x={3} y={4} rx={2} />
                  <path d="M3 10h18" />
                </svg>
                <span>Comprado el 11/09/2026, 06:20 p.&nbsp;m.</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase border tracking-wide bg-red-500/10 text-red-400 border-red-500/20">
                RECHAZADO
              </span>
            </div>
          </div>
          <div className="bg-slate-900 border rounded-2xl p-5 transition-colors relative overflow-hidden border-[var(--color-primary)]/50 shadow-lg shadow-[var(--color-primary)]/10">
            <div className="absolute top-0 right-0 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] text-[9px] font-bold px-2 py-0.5 rounded-bl-lg flex items-center gap-1 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={8}
                height={8}
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-star"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>{" "}
              DESTACADO
            </div>
            <div className="flex justify-between items-start mb-4">
              <h5 className="font-bold text-sm pr-16 leading-snug text-white">
                300 lechugas gratis{" "}
              </h5>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="font-mono font-bold px-3 py-1.5 rounded-lg text-sm shadow-inner border bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20">
                #8996
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
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
                  className="lucide lucide-calendar"
                >
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <rect width={18} height={18} x={3} y={4} rx={2} />
                  <path d="M3 10h18" />
                </svg>
                <span>Comprado el 28/08/2026, 07:54 a.&nbsp;m.</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase border tracking-wide bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                CONFIRMADO
              </span>
            </div>
          </div>
          <div className="bg-slate-900 border rounded-2xl p-5 transition-colors relative overflow-hidden border-[var(--color-primary)]/50 shadow-lg shadow-[var(--color-primary)]/10">
            <div className="absolute top-0 right-0 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] text-[9px] font-bold px-2 py-0.5 rounded-bl-lg flex items-center gap-1 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={8}
                height={8}
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-star"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>{" "}
              DESTACADO
            </div>
            <div className="flex justify-between items-start mb-4">
              <h5 className="font-bold text-sm pr-16 leading-snug text-white">
                Gánate 10.000 lechugas por tan solo 1600 bs!
              </h5>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="font-mono font-bold px-3 py-1.5 rounded-lg text-sm shadow-inner border bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20">
                #0138
              </span>
              <span className="font-mono font-bold px-3 py-1.5 rounded-lg text-sm shadow-inner border bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20">
                #0831
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
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
                  className="lucide lucide-calendar"
                >
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <rect width={18} height={18} x={3} y={4} rx={2} />
                  <path d="M3 10h18" />
                </svg>
                <span>Comprado el 18/08/2026, 11:17 a.&nbsp;m.</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase border tracking-wide bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                CONFIRMADO
              </span>
            </div>
          </div>
          <div className="bg-slate-900 border rounded-2xl p-5 transition-colors relative overflow-hidden border-[var(--color-primary)]/50 shadow-lg shadow-[var(--color-primary)]/10">
            <div className="absolute top-0 right-0 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] text-[9px] font-bold px-2 py-0.5 rounded-bl-lg flex items-center gap-1 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={8}
                height={8}
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-star"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>{" "}
              DESTACADO
            </div>
            <div className="flex justify-between items-start mb-4">
              <h5 className="font-bold text-sm pr-16 leading-snug text-white">
                Ganate 6.000 lechugas por tan solo 880 BS!
              </h5>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="font-mono font-bold px-3 py-1.5 rounded-lg text-sm shadow-inner border bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20">
                #6520
              </span>
              <span className="font-mono font-bold px-3 py-1.5 rounded-lg text-sm shadow-inner border bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20">
                #8910
              </span>
              <span className="font-mono font-bold px-3 py-1.5 rounded-lg text-sm shadow-inner border bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20">
                #2337
              </span>
              <span className="font-mono font-bold px-3 py-1.5 rounded-lg text-sm shadow-inner border bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20">
                #2378
              </span>
              <span className="font-mono font-bold px-3 py-1.5 rounded-lg text-sm shadow-inner border bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20">
                #2658
              </span>
              <span className="font-mono font-bold px-3 py-1.5 rounded-lg text-sm shadow-inner border bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20">
                #1385
              </span>
              <span className="font-mono font-bold px-3 py-1.5 rounded-lg text-sm shadow-inner border bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20">
                #4303
              </span>
              <span className="font-mono font-bold px-3 py-1.5 rounded-lg text-sm shadow-inner border bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20">
                #7812
              </span>
              <span className="font-mono font-bold px-3 py-1.5 rounded-lg text-sm shadow-inner border bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20">
                #8353
              </span>
              <span className="font-mono font-bold px-3 py-1.5 rounded-lg text-sm shadow-inner border bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20">
                #8582
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
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
                  className="lucide lucide-calendar"
                >
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <rect width={18} height={18} x={3} y={4} rx={2} />
                  <path d="M3 10h18" />
                </svg>
                <span>Comprado el 17/08/2026, 04:27 p.&nbsp;m.</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase border tracking-wide bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                CONFIRMADO
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    
  );
}
