import { getOrders, approveOrder, rejectOrder, deleteOrder } from "@/app/admin/_actions/orders";
import { PageHeader, StatusBadge } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function BoletosPage() {
  const orders = await getOrders();
  const pendientes = orders.filter((o) => o.status === "PENDIENTE");
  const resto = orders.filter((o) => o.status !== "PENDIENTE");

  return (
    <div className="space-y-8">
      <PageHeader
        title="Boletos por aprobar"
        subtitle="Verifica el comprobante y la referencia de pago para validar la compra."
      />

      <section>
        <h2 className="text-sm font-bold uppercase text-slate-400 mb-3">
          Pendientes ({pendientes.length})
        </h2>
        <div className="space-y-4">
          {pendientes.length === 0 ? (
            <p className="text-slate-500">No hay boletos pendientes por aprobar.</p>
          ) : (
            pendientes.map((o) => <OrderCard key={o.id} order={o} pending />)
          )}
        </div>
      </section>

      {resto.length > 0 ? (
        <section>
          <h2 className="text-sm font-bold uppercase text-slate-400 mb-3">Historial</h2>
          <div className="space-y-4">
            {resto.map((o) => (
              <OrderCard key={o.id} order={o} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function OrderCard({ order: o, pending = false }: { order: any; pending?: boolean }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-mono text-[#f8f400]">{o.raffle.code}</p>
          <h3 className="text-lg font-bold text-white">{o.raffle.title}</h3>
          <p className="text-sm text-slate-400">
            {o.buyerName} · {o.buyerEmail} · {o.buyerPhone}
          </p>
        </div>
        <StatusBadge status={o.status} />
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
        <Field label="Cédula" value={o.buyerCedula || "—"} />
        <Field label="Método de pago" value={o.paymentMethod?.name || o.paymentMethodName || "—"} />
        <Field label="Referencia" value={o.reference || "—"} />
        <Field label="Monto" value={`$${o.amountUsd?.toFixed?.(2) ?? o.amountUsd} / ${o.amountBs?.toFixed?.(2) ?? o.amountBs} Bs`} />
      </div>

      <div className="mt-3">
        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Boletos</p>
        <div className="flex flex-wrap gap-1.5">
          {String(o.ticketNumbers)
            .split(",")
            .map((t: string) => t.trim())
            .filter(Boolean)
            .map((t: string) => (
              <span key={t} className="rounded bg-slate-800 px-2 py-0.5 text-xs font-mono text-white">
                #{t}
              </span>
            ))}
        </div>
      </div>

      {o.proofUrl ? (
        <div className="mt-3">
          <p className="text-xs font-bold text-slate-400 uppercase mb-1">Comprobante de pago</p>
          <a
            href={o.proofUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={o.proofUrl || "/placeholder.svg"}
              alt="Comprobante de pago"
              className="h-32 rounded-lg border border-slate-700 object-cover hover:border-[#f8f400]"
            />
          </a>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {pending ? (
          <>
            <form action={approveOrder.bind(null, o.id)}>
              <button className="rounded-lg bg-green-500/15 border border-green-500/30 px-3 py-1.5 text-sm font-semibold text-green-400 hover:bg-green-500/25">
                Aprobar pago
              </button>
            </form>
            <form action={rejectOrder.bind(null, o.id)}>
              <button className="rounded-lg bg-red-500/15 border border-red-500/30 px-3 py-1.5 text-sm font-semibold text-red-400 hover:bg-red-500/25">
                Rechazar
              </button>
            </form>
          </>
        ) : null}
        <form action={deleteOrder.bind(null, o.id)}>
          <button className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm font-semibold text-slate-400 hover:bg-slate-800">
            Eliminar
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase mb-0.5">{label}</p>
      <p className="text-white break-words">{value}</p>
    </div>
  );
}
