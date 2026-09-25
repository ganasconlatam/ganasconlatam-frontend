import {
  getPaymentMethods,
  createPaymentMethod,
  updatePaymentMethod,
  togglePaymentMethod,
  deletePaymentMethod,
} from "@/app/admin/_actions/payment-methods";
import { PageHeader } from "@/components/admin/ui";
import { EditablePaymentMethod } from "@/components/admin/EditablePaymentMethod";
import { NewPaymentMethodForm } from "@/components/admin/NewPaymentMethodForm";

export const dynamic = "force-dynamic";

export default async function MetodosPagoPage() {
  const methods = await getPaymentMethods();

  return (
    <div className="space-y-6">
      <PageHeader title="Métodos de pago" subtitle="Configura los métodos disponibles para los compradores." />

      <NewPaymentMethodForm createAction={createPaymentMethod} />

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
