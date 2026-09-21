import Link from "next/link";
import { getRaffles, deleteRaffle } from "@/app/admin/_actions/raffles";
import { getConfig } from "@/app/admin/_actions/config";
import { PageHeader, PrimaryButton, StatusBadge } from "@/components/admin/ui";
import { usdToBs } from "@/lib/money";

export const dynamic = "force-dynamic";

export default async function RifasPage() {
  const [raffles, config] = await Promise.all([getRaffles(), getConfig()]);

  return (
    <div>
      <PageHeader
        title="Rifas"
        subtitle="Gestiona el estatus, precios y procesamiento de cada sorteo."
        action={
          <Link href="/admin/rifas/nuevo">
            <PrimaryButton>Nueva rifa</PrimaryButton>
          </Link>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {raffles.length === 0 ? (
          <p className="text-slate-500">No hay rifas registradas todavía.</p>
        ) : (
          raffles.map((r) => (
            <div key={r.id} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-mono text-[#f8f400]">{r.code}</p>
                  <h3 className="text-lg font-bold text-white truncate">{r.title}</h3>
                </div>
                <StatusBadge status={r.status} />
              </div>

              <div className="mt-3 text-sm text-slate-400 space-y-1">
                <p>
                  Precio: <span className="text-white">${r.priceUsd.toFixed(2)}</span>{" "}
                  <span className="text-slate-500">
                    ≈ {usdToBs(r.priceUsd, config.dollarRate).toFixed(2)} Bs
                  </span>
                </p>
                <p>
                  Sorteo: <span className="text-white">{r.drawDate || "—"} {r.drawTime}</span>
                </p>
                {r.winnerTicket ? (
                  <p>Ganador: <span className="text-[#f8f400] font-bold">#{r.winnerTicket}</span></p>
                ) : null}
              </div>

              <div className="mt-3">
                <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-[#f8f400]" style={{ width: `${Math.min(100, r.progress)}%` }} />
                </div>
                <p className="mt-1 text-xs text-slate-500">{r.progress}% completado</p>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Link
                  href={`/admin/rifas/${r.id}`}
                  className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Editar / Cerrar
                </Link>
                <form action={deleteRaffle.bind(null, r.id)}>
                  <button className="rounded-lg border border-red-500/30 px-3 py-1.5 text-sm font-semibold text-red-400 hover:bg-red-500/10">
                    Eliminar
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
