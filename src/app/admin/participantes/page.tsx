import {
  getParticipants,
  createParticipant,
  updateParticipant,
  deleteParticipant,
} from "@/app/admin/_actions/participants";
import { PageHeader, Card, inputCls, labelCls, PrimaryButton } from "@/components/admin/ui";
import { EditableParticipantRow } from "@/components/admin/EditableParticipantRow";

export const dynamic = "force-dynamic";

export default async function ParticipantesPage() {
  const participants = await getParticipants();

  return (
    <div className="space-y-6">
      <PageHeader title="Participantes" subtitle="Gestiona la base de participantes." />

      <Card>
        <h2 className="text-lg font-bold text-white mb-4">Nuevo participante</h2>
        <form action={createParticipant} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Nombre</label>
            <input name="name" required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Correo</label>
            <input name="email" type="email" required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Teléfono</label>
            <input name="phone" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Cédula</label>
            <input name="cedula" className={inputCls} />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <PrimaryButton type="submit">Agregar</PrimaryButton>
          </div>
        </form>
      </Card>

      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-800">
              <th className="pb-2 pr-4 font-semibold">Nombre</th>
              <th className="pb-2 pr-4 font-semibold">Correo</th>
              <th className="pb-2 pr-4 font-semibold">Teléfono</th>
              <th className="pb-2 pr-4 font-semibold">Cédula</th>
              <th className="pb-2 pr-4 font-semibold">Compras</th>
              <th className="pb-2 font-semibold" />
            </tr>
          </thead>
          <tbody>
            {participants.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-4 text-slate-500">
                  No hay participantes registrados.
                </td>
              </tr>
            ) : (
              participants.map((p) => (
                <EditableParticipantRow
                  key={p.id}
                  participant={p}
                  updateAction={updateParticipant.bind(null, p.id)}
                  deleteAction={deleteParticipant.bind(null, p.id)}
                />
              ))
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
