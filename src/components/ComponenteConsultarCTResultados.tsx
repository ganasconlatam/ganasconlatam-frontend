// 1. ¡Obligatorio! Esto activa la reactividad y las funciones del navegador
"use client";

import { HijoProps } from './types';
import { usePurchase } from './PurchaseContext';

interface ComponenteProps extends HijoProps {
  vistaActiva: string;
}

const STATUS_STYLE: Record<string, { label: string; className: string }> = {
  APROBADO: { label: "CONFIRMADO", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  PENDIENTE: { label: "EN REVISIÓN", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  RECHAZADO: { label: "RECHAZADO", className: "bg-red-500/10 text-red-400 border-red-500/20" },
};

function formatDate(value: string) {
  const d = new Date(value);
  return d.toLocaleString("es-VE", { dateStyle: "short", timeStyle: "short" });
}

export default function ComponenteConsultarCTResultados({ vistaActiva, cambiarVista }: ComponenteProps) {
  const { consultResult, consulting } = usePurchase();

  if (vistaActiva != 'cconsultarctresultados') {
    return <div></div>;
  }

  const buyerName = consultResult?.name ?? "Participante";
  const orders = consultResult?.orders ?? [];

  return (
<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
  <div className="bg-slate-850 border border-white/10 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] relative">
    <div className="p-5 border-b border-white/10 flex justify-between items-center bg-slate-850">
      <h3 className="text-white font-bold text-sm flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ticket text-[var(--color-primary)]">
          <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
          <path d="M13 5v2" />
          <path d="M13 17v2" />
          <path d="M13 11v2" />
        </svg>
        Mis Boletos
      </h3>
      <button className="text-white hover:text-white transition-colors bg-slate-800 p-1 rounded-full hover:bg-slate-700"
        onClick={() => cambiarVista('inicio')}>
        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
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
              {buyerName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                Boletos de
              </p>
              <p className="text-white font-bold text-lg leading-tight">
                {buyerName}
              </p>
            </div>
          </div>
          <button className="text-xs text-slate-400 hover:text-white border border-slate-700 px-3 py-1.5 rounded-lg transition-colors"
            onClick={() => cambiarVista('cconsultarctickets')}>
            Cambiar
          </button>
        </div>

        {consulting && (
          <p className="text-center text-slate-400 text-sm py-8">Buscando tus boletos...</p>
        )}

        {!consulting && orders.length === 0 && (
          <div className="text-center py-10">
            <p className="text-white font-bold mb-1">No encontramos participaciones</p>
            <p className="text-slate-400 text-sm">
              No hay compras registradas con esa cédula todavía.
            </p>
          </div>
        )}

        <div className="space-y-4">
          {orders.map((order) => {
            const status = STATUS_STYLE[order.status] ?? STATUS_STYLE.PENDIENTE;
            const tickets = order.tickets ?? [];
            return (
              <div key={order.id} className="bg-slate-900 border rounded-2xl p-5 transition-colors relative overflow-hidden border-[var(--color-primary)]/50 shadow-lg shadow-[var(--color-primary)]/10">
                <div className="flex justify-between items-start mb-4">
                  <h5 className="font-bold text-sm pr-4 leading-snug text-white">
                    {order.raffleTitle}
                  </h5>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tickets.length === 0 && (
                    <span className="text-xs text-slate-500">Boletos por asignar</span>
                  )}
                  {tickets.map((t) => (
                    <span key={t} className="font-mono font-bold px-3 py-1.5 rounded-lg text-sm shadow-inner border bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20">
                      #{t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar">
                      <path d="M8 2v4" />
                      <path d="M16 2v4" />
                      <rect width={18} height={18} x={3} y={4} rx={2} />
                      <path d="M3 10h18" />
                    </svg>
                    <span>Comprado el {formatDate(order.createdAt)}</span>
                  </div>
                  <span className={"text-[10px] font-bold px-2 py-0.5 rounded uppercase border tracking-wide " + status.className}>
                    {status.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
</div>
  );
}
