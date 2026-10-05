// 1. ¡Obligatorio! Esto activa la reactividad y las funciones del navegador
"use client";

import { useRef, useState } from "react";
import { HijoProps } from "./types";
import { usePurchase } from "@/components/PurchaseContext";
import { formatUsd } from "@/lib/money";
import RaffleActions from "@/components/RaffleActions";

interface ComponenteProps extends HijoProps {
  vistaActiva: string;
  children?: React.ReactNode;
}

function formatDrawDate(date: string) {
  if (!date) return "";
  const d = new Date(date + "T00:00:00");
  if (isNaN(d.getTime())) return date;
  return d.toLocaleDateString("es-VE", { day: "2-digit", month: "short", year: "numeric" });
}

function formatDrawTime(time: string) {
  const m = /^(\d{1,2}):(\d{2})/.exec(time ?? "");
  if (!m) return time;
  const d = new Date();
  d.setHours(Number(m[1]), Number(m[2]), 0, 0);
  return d.toLocaleTimeString("es-VE", { hour: "2-digit", minute: "2-digit", hour12: true });
}

function formatBsShort(value: number) {
  return new Intl.NumberFormat("es-VE", { maximumFractionDigits: 2 }).format(value) + " BS";
}

export default function ComponenteFichaRifa({ vistaActiva, cambiarVista, children }: ComponenteProps) {
  const { raffle, data, loading, setMode, perTicketBs, perTicketUsd } = usePurchase();
  const [expanded, setExpanded] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  if (vistaActiva === "verdetalles" || vistaActiva === "iniciopromocion") {
    return <>{children}</>;
  }

  const isInicio = vistaActiva === "inicio";

  if (loading || !raffle) {
    return (
      <>
        <div className="w-full lg:max-w-7xl lg:mx-auto lg:px-6 xl:px-8 lg:py-6 lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-12">
          <div className="w-full lg:col-span-5 px-3 sm:px-4 lg:px-0 pt-2">
            <div className="w-full max-w-[430px] sm:max-w-[460px] lg:max-w-none mx-auto aspect-[4/5] rounded-[22px] sm:rounded-[28px] bg-slate-900 animate-pulse" />
          </div>
          <div className="w-full lg:col-span-7">{isInicio ? children : null}</div>
        </div>
        {!isInicio && children}
      </>
    );
  }

  const progress = Math.max(0, Math.min(100, raffle.progress ?? 0));
  const imageSrc = raffle.imageUrl && raffle.imageUrl.trim() !== "" ? raffle.imageUrl : "images/2.png";
  const details = raffle.details ?? "";

  const comprar = () => {
    setMode("azar");
    cambiarVista("ctusdatos");
  };

  const toggleDetails = () => {
    const next = !expanded;
    setExpanded(next);
    if (next) {
      requestAnimationFrame(() =>
        descriptionRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }),
      );
    }
  };

  return (
    <>
      <div className="w-full lg:max-w-7xl lg:mx-auto lg:px-6 xl:px-8 lg:py-6 lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-12 lg:items-start">
        <div className="w-full lg:col-span-5 lg:sticky lg:top-28">
          <div className="flex flex-col w-full max-w-[430px] sm:max-w-[460px] lg:max-w-none mx-auto items-center px-3 sm:px-4 lg:px-0 pt-1 pb-2 select-none">
            <div className="relative w-full my-0.5 py-1">
              <div className="relative w-full aspect-[4/5] rounded-[22px] sm:rounded-[28px] overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.45)] border border-white/15 bg-white/5 backdrop-blur-md group isolate transform-gpu">
                <img
                  src={imageSrc || "/placeholder.svg"}
                  alt={raffle.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/95 via-45% to-transparent pt-24 sm:pt-28 pb-3 sm:pb-3.5 px-3 sm:px-4 flex flex-col justify-end gap-2 sm:gap-2.5 z-20">
                  <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                    <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 min-h-[42px] rounded-xl bg-black/90 backdrop-blur-xl border border-white/15 shadow-xl shrink-0">
                      <div className="flex items-center gap-1 shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-sky-400" aria-hidden="true">
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
                        <span className="text-white font-black text-[10px] sm:text-xs tracking-wide uppercase whitespace-nowrap">
                          {formatDrawDate(raffle.drawDate)}
                        </span>
                      </div>
                      <div className="w-px h-3.5 bg-white/20 shrink-0" />
                      <div className="flex items-center gap-1 shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-sky-400" aria-hidden="true">
                          <circle cx={12} cy={12} r={10} />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span className="text-white font-black text-[10px] sm:text-xs tracking-wide uppercase whitespace-nowrap">
                          {formatDrawTime(raffle.drawTime)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right px-2.5 sm:px-3 py-1.5 min-h-[42px] rounded-xl bg-black/90 backdrop-blur-xl border border-white/15 shadow-xl flex flex-col justify-center items-end shrink-0">
                      <span className="text-[8px] sm:text-[9px] text-slate-400 font-black uppercase tracking-widest block leading-none mb-1">
                        PRECIO TICKET
                      </span>
                      <div className="text-xs sm:text-base md:text-lg font-black text-amber-300 tracking-tight drop-shadow flex items-baseline justify-end gap-1 leading-none whitespace-nowrap">
                        <span>{formatBsShort(perTicketBs)}</span>
                        <span className="text-emerald-400 text-[10px] sm:text-xs font-bold">/ ${formatUsd(perTicketUsd)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full z-30 flex flex-col gap-1.5">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-[10px] sm:text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5 drop-shadow-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-primary)]" aria-hidden="true">
                          <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                          <path d="M13 5v2" />
                          <path d="M13 17v2" />
                          <path d="M13 11v2" />
                        </svg>
                        Vendido
                      </span>
                      <span className="text-xs sm:text-sm font-black text-white leading-none drop-shadow-xl">
                        {progress.toFixed(2)}%
                      </span>
                    </div>
                    <div
                      className="h-3 sm:h-3.5 bg-black/90 rounded-full overflow-hidden border border-white/15 shadow-inner relative progress-container backdrop-blur-sm p-px"
                      role="progressbar"
                      aria-valuenow={Number(progress.toFixed(2))}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label="Boletos vendidos"
                    >
                      <div
                        className="h-full rounded-full progress-striped animate-pulse-green"
                        style={{
                          width: `${progress}%`,
                          transition: "width 1s ease-out 0s",
                          backgroundColor: "var(--color-primary)",
                          backgroundImage: "linear-gradient(to right,var(--color-primary),rgba(0,0,0,0.1))",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <RaffleActions
              key={raffle.id}
              raffleId={raffle.id}
              code={raffle.code}
              title={raffle.title}
              details={details}
              initialLikeCount={data?.likes?.likeCount ?? 0}
              initialLiked={data?.likes?.likedByMe ?? false}
            />

            <div className="w-full flex items-center gap-2 py-1.5 shrink-0">
              <button
                type="button"
                onClick={toggleDetails}
                aria-expanded={expanded}
                aria-controls="raffle-description"
                title="Ver detalles y descripción"
                className="shrink-0 px-3 sm:px-3.5 py-3.5 sm:py-4 rounded-2xl bg-black/50 hover:bg-black/70 border border-white/10 hover:border-amber-400/40 text-slate-300 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-md group backdrop-blur-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-amber-400" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                <span className="whitespace-nowrap font-bold text-xs">Ver detalles</span>
                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={"transition-transform duration-300 " + (expanded ? "rotate-180" : "")} aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={comprar}
                className="flex-1 min-w-0 py-3.5 sm:py-4 px-3 sm:px-4 rounded-2xl font-black uppercase tracking-wider transition-all duration-300 group relative overflow-hidden flex items-center justify-center gap-2 shadow-[0_0_35px_rgba(0,230,118,0.45)] ring-2 ring-[#00E676]/40 hover:ring-[#00E676]/70 bg-[#00E676] hover:bg-[#00c864] text-slate-950 active:scale-[0.98]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="relative z-10 shrink-0" aria-hidden="true">
                  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                  <path d="M13 5v2" />
                  <path d="M13 17v2" />
                  <path d="M13 11v2" />
                </svg>
                <span className="relative z-10 text-slate-950 font-black tracking-wide whitespace-nowrap text-xs sm:text-sm">
                  ¡COMPRA TU BOLETO!
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full animate-[shimmer_2s_infinite]" />
              </button>
            </div>
          </div>
        </div>

        <div className="w-full lg:col-span-7 flex flex-col gap-4 lg:gap-6">
          <div className="w-full max-w-[430px] sm:max-w-[460px] lg:max-w-none mx-auto lg:mx-0 px-3 sm:px-4 lg:px-0 pt-6 lg:pt-0 pb-6 sm:pb-7 lg:pb-0 flex flex-col gap-3.5 text-left scroll-mt-20">
            <div className="flex flex-col items-start gap-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-[10px] font-black uppercase tracking-widest">
                <svg xmlns="http://www.w3.org/2000/svg" width={11} height={11} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
                <span>PREMIO DESTACADO</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight uppercase tracking-tight drop-shadow-md text-balance">
                {raffle.title}
              </h1>
            </div>

            {details.trim() && (
              <div
                ref={descriptionRef}
                id="raffle-description"
                role="button"
                tabIndex={0}
                aria-expanded={expanded}
                onClick={() => setExpanded((v) => !v)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setExpanded((v) => !v);
                  }
                }}
                className="cursor-pointer group relative p-4 sm:p-5 rounded-2xl bg-black/40 hover:bg-black/55 border border-white/10 hover:border-amber-400/40 text-left shadow-2xl backdrop-blur-xl transition-all duration-300 select-none scroll-mt-24"
              >
                <div
                  className={
                    "text-sm sm:text-[15px] text-slate-300 leading-relaxed font-normal whitespace-pre-line transition-all duration-300 " +
                    (expanded ? "" : "line-clamp-2")
                  }
                >
                  {details}
                </div>
                <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-white/10">
                  <span className="text-[11px] font-bold text-slate-400 group-hover:text-slate-300 transition-colors">
                    {expanded ? "Pulsa en cualquier parte para contraer" : "Pulsa en cualquier parte para expandir"}
                  </span>
                  <span className="text-xs font-black text-amber-400 group-hover:text-amber-300 transition-colors uppercase tracking-wider inline-flex items-center gap-1">
                    {expanded ? "Ver menos" : "Ver más"}
                    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={"transition-transform duration-300 " + (expanded ? "rotate-180" : "")} aria-hidden="true">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </div>
              </div>
            )}
          </div>

          {isInicio && children}
        </div>
      </div>
      {!isInicio && children}
    </>
  );
}
