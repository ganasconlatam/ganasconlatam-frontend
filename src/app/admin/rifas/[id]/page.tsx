import { notFound } from "next/navigation";
import { getRaffle, updateRaffle, closeRaffle } from "@/app/admin/_actions/raffles";
import { getConfig } from "@/app/admin/_actions/config";
import { prisma } from "@/lib/prisma";
import { PageHeader, Card, inputCls, labelCls, PrimaryButton, StatusBadge } from "@/components/admin/ui";
import RaffleForm from "@/components/admin/RaffleForm";

export const dynamic = "force-dynamic";

export default async function EditarRifaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [raffle, config] = await Promise.all([getRaffle(id), getConfig()]);
  if (!raffle) notFound();

  const approvedOrders = await prisma.ticketOrder.findMany({
    where: { raffleId: id, status: "APROBADO" },
    orderBy: { createdAt: "asc" },
  });

  const updateAction = updateRaffle.bind(null, id);

  async function closeAction(formData: FormData) {
    "use server";
    await closeRaffle(id, String(formData.get("winnerTicket") ?? ""));
  }

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader
        title="Editar rifa"
        subtitle={raffle.title}
        action={<StatusBadge status={raffle.status} />}
      />

      <Card>
        <RaffleForm action={updateAction} raffle={raffle} dollarRate={config.dollarRate} />
      </Card>

      <Card>
        <h2 className="text-lg font-bold text-white mb-1">Cierre de la rifa</h2>
        <p className="text-sm text-slate-400 mb-4">
          Selecciona manualmente el boleto ganador. Al cerrar, la rifa pasa a estatus{" "}
          <span className="font-semibold">FINALIZADA</span>.
        </p>

        <form action={closeAction} className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[200px]">
            <label className={labelCls}>Boleto ganador</label>
            {approvedOrders.length > 0 ? (
              <select name="winnerTicket" className={inputCls} defaultValue={raffle.winnerTicket ?? ""}>
                <option value="">— Selecciona un boleto —</option>
                {approvedOrders.flatMap((o) =>
                  String(o.ticketNumbers)
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean)
                    .map((t) => (
                      <option key={o.id + t} value={t}>
                        #{t} · {o.buyerName}
                      </option>
                    ))
                )}
              </select>
            ) : (
              <input
                name="winnerTicket"
                className={inputCls}
                defaultValue={raffle.winnerTicket ?? ""}
                placeholder="Ej: 0432"
              />
            )}
          </div>
          <PrimaryButton type="submit">Cerrar y declarar ganador</PrimaryButton>
        </form>

        {raffle.winnerTicket ? (
          <p className="mt-4 text-sm text-slate-300">
            Boleto ganador actual:{" "}
            <span className="font-bold text-[#f8f400]">#{raffle.winnerTicket}</span>
          </p>
        ) : null}
      </Card>
    </div>
  );
}
