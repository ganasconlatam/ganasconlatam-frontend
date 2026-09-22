import type { ReactNode } from "react";

export const inputCls =
  "w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2.5 text-white outline-none focus:border-[#f8f400] focus:ring-1 focus:ring-[#f8f400]/40 transition-all placeholder-slate-600";

export const labelCls = "block text-xs font-bold text-slate-400 uppercase mb-1.5";

export function PrimaryButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      {...props}
      className={`bg-[#DEBB17] hover:brightness-95 text-[#0F2A21] font-bold px-4 py-2.5 rounded-lg transition-all disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-slate-800 bg-slate-900/40 p-6 ${className}`}>
      {children}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {subtitle ? <p className="text-sm text-slate-400">{subtitle}</p> : null}
      </div>
      {action}
    </header>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    ACTIVA: "bg-green-500/15 text-green-400 border-green-500/30",
    PROXIMA: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    FINALIZADA: "bg-slate-500/15 text-slate-400 border-slate-500/30",
    PENDIENTE: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    APROBADO: "bg-green-500/15 text-green-400 border-green-500/30",
    RECHAZADO: "bg-red-500/15 text-red-400 border-red-500/30",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
        map[status] ?? "bg-slate-500/15 text-slate-400 border-slate-500/30"
      }`}
    >
      {status}
    </span>
  );
}
