"use client";

import { usePurchase, bs } from "@/components/PurchaseContext";

interface TopEntry {
  id: string;
  position: number;
  name: string;
  detail: string;
  amount: number;
}

// Estilo por puesto: 1 = centro (verde, elevado), 2 = izquierda (azul), 3 = derecha (naranja).
const PODIUM_STYLE: Record<
  number,
  { ring: string; glow: string; text: string; badge: string }
> = {
  1: {
    ring: "border-emerald-400",
    glow: "shadow-[0_0_35px_-5px_rgba(52,211,153,0.7)]",
    text: "text-emerald-400",
    badge: "bg-emerald-400 text-black",
  },
  2: {
    ring: "border-sky-400",
    glow: "shadow-[0_0_25px_-8px_rgba(56,189,248,0.6)]",
    text: "text-sky-400",
    badge: "bg-sky-400 text-black",
  },
  3: {
    ring: "border-orange-400",
    glow: "shadow-[0_0_25px_-8px_rgba(251,146,60,0.6)]",
    text: "text-orange-400",
    badge: "bg-orange-400 text-black",
  },
};

function inicial(name: string): string {
  const clean = name.trim();
  return clean ? clean.charAt(0).toUpperCase() : "?";
}

function Puesto({ entry, destacado }: { entry: TopEntry; destacado: boolean }) {
  const style = PODIUM_STYLE[entry.position] ?? PODIUM_STYLE[3];
  const size = destacado ? "w-24 h-24 sm:w-28 sm:h-28" : "w-16 h-16 sm:w-20 sm:h-20";

  return (
    <div
      className={`flex flex-col items-center text-center ${destacado ? "-translate-y-4 sm:-translate-y-6" : ""}`}
    >
      <span className={`mb-2 font-black tracking-tight ${style.text} ${destacado ? "text-lg sm:text-xl" : "text-sm sm:text-base"}`}>
        {bs(entry.amount)}
      </span>
      <div className="relative">
        <div
          className={`${size} rounded-full border-4 ${style.ring} ${style.glow} bg-slate-900/80 flex items-center justify-center`}
        >
          <span
            className={`font-black text-white ${destacado ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"}`}
          >
            {inicial(entry.name)}
          </span>
        </div>
        <span
          className={`absolute -bottom-2 left-1/2 -translate-x-1/2 ${style.badge} rounded-full w-6 h-6 flex items-center justify-center text-xs font-black shadow-lg`}
        >
          {entry.position}
        </span>
      </div>
      <p className={`mt-4 font-bold text-white line-clamp-1 max-w-[8rem] sm:max-w-[10rem] ${destacado ? "text-sm sm:text-base" : "text-xs sm:text-sm"}`}>
        {entry.name}
      </p>
      {entry.detail ? (
        <p className="text-[10px] sm:text-xs text-white/50 line-clamp-1 max-w-[8rem] sm:max-w-[10rem]">
          {entry.detail}
        </p>
      ) : null}
    </div>
  );
}

export default function ComponenteTopCompradores() {
  const { data } = usePurchase();
  const top = (data?.top ?? []) as TopEntry[];

  if (top.length === 0) return null;

  const first = top.find((t) => t.position === 1) ?? top[0];
  const second = top.find((t) => t.position === 2);
  const third = top.find((t) => t.position === 3);

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <div
        className="rounded-3xl border p-8 sm:p-10 relative overflow-hidden"
        style={{
          borderColor: "rgba(248,244,0,0.15)",
          background: "linear-gradient(180deg,rgba(15,23,42,0.7),rgba(2,6,23,0.85))",
        }}
      >
        <div className="flex flex-col items-center text-center mb-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-trophy text-emerald-400 mb-3"
            aria-hidden="true"
          >
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
          </svg>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Top Compradores
          </h2>
          <p className="text-white/60 text-sm mt-1">
            Los más fieles y con mayor cantidad de tickets. ¡Gracias por participar!
          </p>
        </div>

        <div className="flex items-end justify-center gap-6 sm:gap-10">
          {second ? <Puesto entry={second} destacado={false} /> : <div className="w-16 sm:w-20" />}
          <Puesto entry={first} destacado={true} />
          {third ? <Puesto entry={third} destacado={false} /> : <div className="w-16 sm:w-20" />}
        </div>
      </div>
    </section>
  );
}
