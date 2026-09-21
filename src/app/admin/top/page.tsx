import {
  getTopPurchases,
  createTopPurchase,
  deleteTopPurchase,
} from "@/app/admin/_actions/top";
import { PageHeader, Card, inputCls, labelCls, PrimaryButton } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function TopPage() {
  const top = await getTopPurchases();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Top 3 de compras"
        subtitle="Coloca manualmente las posiciones del ranking de compradores."
      />

      <Card>
        <h2 className="text-lg font-bold text-white mb-4">Agregar / actualizar posición</h2>
        <form action={createTopPurchase} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className={labelCls}>Posición</label>
            <select name="position" className={inputCls}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Nombre</label>
            <input name="name" required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Detalle</label>
            <input name="detail" className={inputCls} placeholder="Boletos, premio..." />
          </div>
          <div>
            <label className={labelCls}>Monto (USD)</label>
            <input name="amount" type="number" step="0.01" defaultValue={0} className={inputCls} />
          </div>
          <div className="md:col-span-4 flex justify-end">
            <PrimaryButton type="submit">Guardar posición</PrimaryButton>
          </div>
        </form>
        <p className="mt-3 text-xs text-slate-500">
          Puedes tener varias entradas; se ordenan por el número de posición.
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((pos) => {
          const entry = top.find((t) => t.position === pos);
          return (
            <Card key={pos} className="text-center">
              <div className="text-4xl font-black text-[#f8f400]">#{pos}</div>
              {entry ? (
                <>
                  <p className="mt-2 text-lg font-bold text-white">{entry.name}</p>
                  <p className="text-sm text-slate-400">{entry.detail}</p>
                  <p className="mt-1 text-sm text-slate-300">${entry.amount.toFixed(2)}</p>
                  <form action={deleteTopPurchase.bind(null, entry.id)} className="mt-3">
                    <button className="text-sm text-red-400 hover:underline">Quitar</button>
                  </form>
                </>
              ) : (
                <p className="mt-4 text-sm text-slate-600">Vacío</p>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
