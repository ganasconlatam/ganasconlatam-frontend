import type { Raffle } from "@prisma/client";
import { inputCls, labelCls, PrimaryButton } from "./ui";

export default function RaffleForm({
  action,
  raffle,
  dollarRate,
}: {
  action: (formData: FormData) => void | Promise<void>;
  raffle?: Raffle | null;
  dollarRate: number;
}) {
  return (
    <form action={action} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Código único (sobre la imagen)</label>
          <input name="code" defaultValue={raffle?.code ?? ""} required className={inputCls} placeholder="RIF-001" />
        </div>
        <div>
          <label className={labelCls}>Estatus</label>
          <select name="status" defaultValue={raffle?.status ?? "PROXIMA"} className={inputCls}>
            <option value="ACTIVA">Activa</option>
            <option value="PROXIMA">Próxima</option>
            <option value="FINALIZADA">Finalizada</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>Título</label>
        <input name="title" defaultValue={raffle?.title ?? ""} required className={inputCls} placeholder="Gran Rifa de..." />
      </div>

      <div>
        <label className={labelCls}>Detalles</label>
        <textarea name="details" defaultValue={raffle?.details ?? ""} rows={3} className={inputCls} placeholder="Descripción del premio y condiciones" />
      </div>

      <div>
        <label className={labelCls}>Imagen (URL)</label>
        <input name="imageUrl" defaultValue={raffle?.imageUrl ?? ""} className={inputCls} placeholder="/images/rifas/1.png" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className={labelCls}>Precio (USD)</label>
          <input name="priceUsd" type="number" step="0.01" defaultValue={raffle?.priceUsd ?? 0} className={inputCls} />
          <p className="mt-1 text-xs text-slate-500">
            ≈ {((raffle?.priceUsd ?? 0) * dollarRate).toFixed(2)} Bs (tasa {dollarRate})
          </p>
        </div>
        <div>
          <label className={labelCls}>Total de boletos</label>
          <input name="totalTickets" type="number" defaultValue={raffle?.totalTickets ?? 1000} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Progreso barra (%)</label>
          <input name="progress" type="number" step="0.1" min="0" max="100" defaultValue={raffle?.progress ?? 0} className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Fecha del sorteo</label>
          <input name="drawDate" type="date" defaultValue={raffle?.drawDate ?? ""} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Hora del sorteo</label>
          <input name="drawTime" type="time" defaultValue={raffle?.drawTime ?? ""} className={inputCls} />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <PrimaryButton type="submit">Guardar rifa</PrimaryButton>
      </div>
    </form>
  );
}
