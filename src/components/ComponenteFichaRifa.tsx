// 1. ¡Obligatorio! Esto activa la reactividad y las funciones del navegador
"use client"; 

import { HijoProps } from './types'; 
import { usePurchase, bs } from '@/components/PurchaseContext';
import { formatUsd } from '@/lib/money';

interface ComponenteProps extends HijoProps {
  vistaActiva: string;
}

function formatDrawDate(date: string) {
  if (!date) return "";
  const d = new Date(date + "T00:00:00");
  if (isNaN(d.getTime())) return date;
  return d.toLocaleDateString("es-VE", { day: "numeric", month: "short", year: "numeric" });
}

export default function ComponenteFichaRifa({ vistaActiva, cambiarVista }: ComponenteProps) {
  const { raffle, loading, setMode, perTicketBs, perTicketUsd } = usePurchase();

  if (vistaActiva=='verdetalles' || vistaActiva=='iniciopromocion') {
    return '';
  }

  if (loading || !raffle) {
    return (
      <div className="flex flex-col relative w-full items-center justify-start overflow-hidden">
        <div className="relative w-full aspect-video lg:h-[567.8px] bg-slate-900 animate-pulse" />
      </div>
    );
  }

  const progress = Math.max(0, Math.min(100, raffle.progress ?? 0));
  const imageSrc = raffle.imageUrl && raffle.imageUrl.trim() !== "" ? raffle.imageUrl : "images/2.png";

  const comprar = () => {
    setMode("azar");
    cambiarVista("ctusdatos");
  };

  return (
          <div className="flex flex-col relative w-full items-center justify-start overflow-hidden group">     
              <div className="relative w-full aspect-video lg:aspect-auto lg:h-[567.8px] bg-slate-900 overflow-hidden">
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${imageSrc})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center"
                  }}
                ></div>
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white/80 text-xs px-3 py-1.5 rounded-lg shadow-lg font-mono tracking-wider border border-white/10 z-10 select-none">
                  {raffle.code}
                </div>
                <div className="absolute inset-x-0 bottom-0 min-h-32 md:min-h-48 bg-gradient-to-t from-slate-900 to-transparent flex flex-col justify-end pb-3 px-0">
                  <div className="w-full max-w-6xl mx-auto px-4 z-40 mb-2 md:mb-4">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 drop-shadow-xl">
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
                          className="lucide lucide-ticket text-[var(--color-primary)] drop-shadow-md"
                        >
                          <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
                          <path d="M13 5v2" />
                          <path d="M13 17v2" />
                          <path d="M13 11v2" />
                        </svg>
                        Vendido
                      </span>
                      <span className="text-xl md:text-2xl font-black text-white leading-none drop-shadow-xl">
                        {progress.toFixed(2)}%
                      </span>
                    </div>
                    <div className="h-3 bg-slate-950/80 rounded-full overflow-hidden border border-white/20 shadow-inner relative progress-container backdrop-blur-sm">
                      <div
                        className="h-full rounded-full progress-striped animate-pulse-green"
                        style={{
                          width: `${progress}%`,
                          transition: "width 1s ease-out 0s",
                          backgroundColor: "var(--color-primary)",
                          backgroundImage:
                            "linear-gradient(to right,var(--color-primary),rgba(0,0,0,0.1))"
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-20 md:top-24 right-4 flex gap-2 z-30" />
              </div>
              
              <div className="w-full bg-transparent relative z-20 pb-6 border-b border-white/5 shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
                <div className="max-w-6xl mx-auto px-4 pt-4 pb-6 md:py-8">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-8">
                  
                    <div className="space-y-3 lg:space-y-4 flex-1 text-left">
                      <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white leading-tight uppercase tracking-tighter drop-shadow-2xl">
                        {raffle.title}
                      </h1>
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
                            {formatDrawDate(raffle.drawDate)}
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
                            {raffle.drawTime}
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
                              {bs(perTicketBs)}
                            </span>
                            <span className="text-slate-400 font-medium text-[10px] sm:text-xs">
                              /
                            </span>
                            <span className="text-[#25D366] font-black text-xs sm:text-sm md:text-base tracking-wide uppercase">
                              {formatUsd(perTicketUsd)} USD
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  
                    <div className="w-full lg:w-auto pt-2 lg:pt-0 lg:ml-auto flex flex-row items-stretch gap-3">
                      <button className="px-5 py-3.5 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-[10px] md:text-xs font-bold text-slate-300 hover:text-white uppercase tracking-widest whitespace-nowrap flex items-center justify-center flex-[0.8] lg:flex-none"
                        onClick={() => cambiarVista('verdetalles')} >
                        VER DETALLES
                      </button>
                      <button
                        onClick={comprar}
                        className="relative overflow-hidden px-6 lg:px-10 py-3.5 rounded-xl font-black text-xs md:text-sm uppercase tracking-widest transition-all group whitespace-nowrap flex-[1.2] lg:flex-none flex justify-center bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-[0_0_35px_rgba(var(--color-primary-rgb),0.6)] hover:scale-105 active:scale-95 animate-pulse-slow">
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
                          <span className="text-base text-shadow-sm">COMPRAR</span>
                        </span>
                        <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-12 -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
                        <div className="absolute inset-0 bg-white/20 mix-blend-overlay opacity-50" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  );
}
