// 1. ¡Obligatorio! Esto activa la reactividad y las funciones del navegador
"use client"; 

import { HijoProps } from './types'; 
import { usePurchase, bs } from '@/components/PurchaseContext';
import { formatUsd } from '@/lib/money';

function formatDrawDate(date: string) {
  if (!date) return "";
  const d = new Date(date + "T00:00:00");
  if (isNaN(d.getTime())) return date;
  return d.toLocaleDateString("es-VE", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function ComponenteVerDetalles({ cambiarVista }: HijoProps) {
  const { raffle, loading, setMode, perTicketBs, perTicketUsd } = usePurchase();

  if (loading || !raffle) {
    return (
      <main className="flex-grow pb-24">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="h-[400px] rounded-2xl bg-slate-900 animate-pulse" />
        </div>
      </main>
    );
  }

  const progress = Math.max(0, Math.min(100, raffle.progress ?? 0));
  const imageSrc = raffle.imageUrl && raffle.imageUrl.trim() !== "" ? raffle.imageUrl : "images/4.png";

  const comprar = () => {
    setMode("azar");
    cambiarVista("ctusdatos");
  };

  return (
<main className="flex-grow pb-24">
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-slate-950">
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background:
          "linear-gradient(rgba(7,47,4,0.03),rgba(7,47,4,0.03),transparent)"
      }}
    />
  </div>
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in slide-in-from-right duration-500">
    <button className="flex items-center gap-2 text-white hover:text-[var(--color-primary)] mb-8 transition-colors group"
      onClick={() => cambiarVista('inicio')} >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        className="lucide lucide-arrow-left group-hover:-translate-x-1 transition-transform"
      >
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </svg>
      Volver a Rifas
    </button>
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
      <div className="lg:col-span-3 space-y-6">
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900 aspect-video relative group">
          <img
            src={imageSrc || "/placeholder.svg"}
            alt={raffle.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            width={1000}
          />
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white/80 text-xs px-3 py-1.5 rounded-lg shadow-lg font-mono tracking-wider border border-white/10 z-10 select-none">
            {raffle.code}
          </div>
        </div>
        <div className="bg-slate-850 rounded-2xl p-8 border border-white/10 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">
            {raffle.title}
          </h2>
          <div className="prose prose-invert text-white whitespace-pre-wrap">
            {raffle.details}
          </div>
        </div>
      </div>
      <div className="lg:col-span-2 relative">
        <div className="absolute top-0 -left-4 -right-4 h-[600px] rounded-3xl overflow-hidden -z-10 opacity-50 blur-[80px] pointer-events-none hidden lg:block sf-hidden"></div>
        <div className="sticky top-24 space-y-12">
          <div
            className="relative rounded-3xl p-8 shadow-2xl border border-white/10 overflow-hidden"
            style={{
              backgroundColor:
                "color-mix(in srgb,var(--color-surface) 70%,transparent)",
              backdropFilter: "blur(24px)",
              boxShadow: "rgba(0,0,0,0.37) 0px 8px 32px 0px"
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4 text-white font-medium text-sm">
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
                  className="lucide lucide-calendar"
                >
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <rect width={18} height={18} x={3} y={4} rx={2} />
                  <path d="M3 10h18" />
                </svg>{" "}
                Sortea: {formatDrawDate(raffle.drawDate)}{raffle.drawTime ? `, ${raffle.drawTime}` : ""} (Hora Vzla)
              </div>
              <h1 className="text-3xl font-bold text-white mb-2 leading-tight drop-shadow-sm">
                {raffle.title}
              </h1>
              <p className="text-white mb-8 text-sm leading-relaxed">
                ¡No pierdas esta oportunidad única! Participa ahora y gana
                increíbles premios.
              </p>
              <div className="space-y-2 mb-8">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-white">Boletos vendido</span>
                  <span className="text-white">{progress.toFixed(2)}%</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden border border-white/10 bg-white/10 progress-container">
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
              <div className="flex flex-col gap-3 mb-6">
                <button
                  onClick={comprar}
                  className="w-full py-4 rounded-xl font-bold flex flex-col items-center justify-center transition-transform active:scale-95 shadow-lg bg-[var(--color-primary)] hover:brightness-110 text-slate-900 btn-premium">
                  <span className="flex items-center gap-2 text-lg">
                    Comprar Boletos
                  </span>
                  <span className="text-xs opacity-80">{formatUsd(perTicketUsd)} / {bs(perTicketBs)}</span>
                </button>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 rounded-xl font-bold border border-white text-white hover:bg-white/10 flex items-center justify-center text-sm gap-2 py-3">
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
                    className="lucide lucide-share2"
                  >
                    <circle cx={18} cy={5} r={3} />
                    <circle cx={6} cy={12} r={3} />
                    <circle cx={18} cy={19} r={3} />
                    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                  </svg>{" "}
                  Compartir
                </button>
                <button className="flex-1 rounded-xl font-bold border border-white text-white hover:bg-white/10 flex items-center justify-center text-sm gap-2 py-3">
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
                    className="lucide lucide-link"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>{" "}
                  Copiar
                </button>
              </div>
              <a
                href="#"
                
                rel="noreferrer"
                className="mt-4 flex items-center justify-between gap-4 bg-transparent border border-[#177a3d] hover:bg-[#177a3d]/10 rounded-full py-1.5 px-1.5 pr-6 transition-all w-full cursor-pointer animate-bounce backdrop-blur-sm shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-slate-800/50 flex items-center justify-center shrink-0">
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
                      className="lucide lucide-message-circle text-[#25D366]"
                    >
                      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                    </svg>
                  </div>
                  <span className="text-sm font-bold text-white text-left leading-tight py-1">
                    Únete a nuestra comunidad de
                    <br />
                    WhatsApp
                  </span>
                </div>
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
                  className="lucide lucide-chevron-right text-[#25D366] shrink-0 opacity-80"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
  );
}
