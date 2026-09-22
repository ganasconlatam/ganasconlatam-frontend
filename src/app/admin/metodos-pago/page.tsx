import {
  getPaymentMethods,
  createPaymentMethod,
  updatePaymentMethod,
  togglePaymentMethod,
  deletePaymentMethod,
} from "@/app/admin/_actions/payment-methods";
import { PageHeader, Card, inputCls, labelCls, PrimaryButton } from "@/components/admin/ui";
import { EditablePaymentMethod } from "@/components/admin/EditablePaymentMethod";

export const dynamic = "force-dynamic";

export default async function MetodosPagoPage() {
  const methods = await getPaymentMethods();

  return (
    <div className="space-y-6">
      <PageHeader title="Métodos de pago" subtitle="Configura los métodos disponibles para los compradores." />

      <Card>
        <h2 className="text-lg font-bold text-white mb-4">Nuevo método</h2>
        <form action={createPaymentMethod} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Nombre</label>
            <input name="name" required className={inputCls} placeholder="Pago Móvil Banesco" />
          </div>
          <div>
            <label className={labelCls}>Tipo</label>
            <select name="type" className={inputCls}>
              <option value="pago_movil">Pago Móvil</option>
              <option value="transferencia">Transferencia</option>
              <option value="zelle">Zelle</option>
              <option value="binance">Binance</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>Detalles (datos de la cuenta)</label>
            <textarea name="details" rows={2} className={inputCls} placeholder="Banco, teléfono, cédula, correo..." />
          </div>
          <div>
            <label className={labelCls}>Orden</label>
            <input name="order" type="number" defaultValue={0} className={inputCls} />
          </div>
          <label className="flex items-center gap-2 mt-6 text-sm text-slate-300">
            <input type="checkbox" name="enabled" defaultChecked className="accent-[#f8f400] w-4 h-4" />
            Activo
          </label>
          <div className="md:col-span-2 flex justify-end">
            <PrimaryButton type="submit">Agregar</PrimaryButton>
          </div>
        </form>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {methods.length === 0 ? (
          <p className="text-slate-500">No hay métodos de pago configurados.</p>
        ) : (
          methods.map((m) => (
            <EditablePaymentMethod
              key={m.id}
              method={m}
              updateAction={updatePaymentMethod.bind(null, m.id)}
              toggleAction={togglePaymentMethod.bind(null, m.id, !m.enabled)}
              deleteAction={deletePaymentMethod.bind(null, m.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
