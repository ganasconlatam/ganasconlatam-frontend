"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { usePurchase } from "@/components/PurchaseContext";

function formatDrawDateTime(date: string, time: string) {
  const d = new Date(`${date}T${/^\d{1,2}:\d{2}/.test(time) ? time.slice(0, 5) : "00:00"}:00`);
  if (isNaN(d.getTime())) return [date, time].filter(Boolean).join(", ");
  const day = d.toLocaleDateString("es-VE", { day: "2-digit", month: "2-digit", year: "numeric" });
  const hour = /^\d{1,2}:\d{2}/.test(time)
    ? d.toLocaleTimeString("es-VE", { hour: "2-digit", minute: "2-digit", hour12: true })
    : time;
  return `${day}${hour ? `, ${hour}` : ""} (Vzla)`;
}

const STATUS_LABEL = {
  ACTIVA: "Participar",
  PROXIMA: "Próximamente",
  FINALIZADA: "Finalizada",
} as const;

export default function ComponenteUltimasRifas() {
  const router = useRouter();
  const { data, loading } = usePurchase();
  const raffles = data?.recentRaffles ?? [];
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows, raffles.length]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  if (!loading && raffles.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative z-10" aria-labelledby="ultimas-rifas-title">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 mb-2 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-[10px] font-black uppercase tracking-widest">
            <svg xmlns="http://www.w3.org/2000/svg" width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              <path d="M5 3v4" />
              <path d="M19 17v4" />
              <path d="M3 5h4" />
              <path d="M17 19h4" />
            </svg>
            <span>MÁS SORTEOS</span>
          </div>
          <h2 id="ultimas-rifas-title" className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight drop-shadow-md">
            Últimas Rifas
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-medium mt-0.5 text-pretty">
            Desliza horizontalmente para explorar todos nuestros sorteos disponibles
          </p>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="flex items-center gap-1.5 mr-1">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canPrev}
              aria-label="Anterior"
              className="w-8 h-8 rounded-xl bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/10 hover:border-white/30 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canNext}
              aria-label="Siguiente"
              className="w-8 h-8 rounded-xl bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/10 hover:border-white/30 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
          <button
            type="button"
            onClick={() => trackRef.current?.scrollTo({ left: trackRef.current.scrollWidth, behavior: "smooth" })}
            className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:text-[var(--color-primary)] text-xs sm:text-sm font-bold flex items-center gap-1 transition-all active:scale-95 drop-shadow-sm backdrop-blur-md"
          >
            Ver todas
            <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2 pb-4 px-1 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {loading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="snap-start shrink-0 w-[275px] sm:w-[310px] md:w-[330px] h-64 rounded-2xl bg-black/40 border border-white/10 animate-pulse" />
          ))}
        {raffles.map((r) => {
          const finished = r.status === "FINALIZADA";
          const upcoming = r.status === "PROXIMA";
          const img = r.imageUrl && r.imageUrl.trim() !== "" ? r.imageUrl : "images/2.png";
          return (
            <button
              type="button"
              key={r.id}
              onClick={() => router.push(`/rifa/${encodeURIComponent(r.code)}`)}
              className="snap-start shrink-0 w-[275px] sm:w-[310px] md:w-[330px] bg-black/40 hover:bg-black/60 border border-white/10 hover:border-white/25 rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-300 group hover:-translate-y-1 shadow-xl hover:shadow-2xl cursor-pointer flex flex-col justify-between select-none text-left"
            >
              <div className="w-full">
                <div className="relative h-40 sm:h-44 overflow-hidden">
                  <img
                    src={img || "/placeholder.svg"}
                    alt={r.title}
                    loading="lazy"
                    width={400}
                    className={
                      "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 " +
                      (finished ? "grayscale opacity-60" : "")
                    }
                  />
                  <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md text-white/80 text-[9px] px-2 py-0.5 rounded-md font-mono tracking-wider border border-white/10 z-10 select-none">
                    {r.code}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  {(finished || upcoming) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px] p-2 z-10">
                      <span
                        className={
                          "px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-xl backdrop-blur-md border " +
                          (finished
                            ? "bg-red-950/90 text-red-200 border-red-500/40"
                            : "bg-slate-900/90 text-slate-300 border-white/20")
                        }
                      >
                        {finished ? "Agotada" : "Próximamente"}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4 pb-2">
                  <h3 className="text-base font-black text-white group-hover:text-amber-300 transition-colors line-clamp-1 drop-shadow-sm">
                    {r.title}
                  </h3>
                </div>
              </div>
              <div className="w-full px-4 pb-3.5 pt-2 flex items-center justify-between gap-2 border-t border-white/10 text-xs">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-semibold min-w-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden="true">
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                  </svg>
                  <span className="truncate">{formatDrawDateTime(r.drawDate, r.drawTime)}</span>
                </div>
                <span
                  className={
                    "font-bold text-[11px] uppercase tracking-wider shrink-0 " +
                    (r.status === "ACTIVA" ? "text-emerald-400" : "text-slate-500")
                  }
                >
                  {STATUS_LABEL[r.status]}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
