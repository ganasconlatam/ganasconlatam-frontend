import { getAdmins, createAdmin, deleteAdmin } from "@/app/admin/_actions/admins";
import { PageHeader, Card, inputCls, labelCls, PrimaryButton } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function UsuariosPage() {
  const admins = await getAdmins();

  async function createAction(formData: FormData) {
    "use server";
    await createAdmin(formData);
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader
        title="Usuarios administrativos"
        subtitle="Gestiona quién puede acceder al panel."
      />

      <Card>
        <h2 className="text-lg font-bold text-white mb-4">Nuevo usuario</h2>
        <form action={createAction} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Nombre</label>
            <input name="name" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Rol</label>
            <select name="role" className={inputCls}>
              <option value="admin">Administrador</option>
              <option value="editor">Editor</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Correo</label>
            <input name="email" type="email" required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Contraseña</label>
            <input name="password" type="password" required className={inputCls} />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <PrimaryButton type="submit">Crear usuario</PrimaryButton>
          </div>
        </form>
      </Card>

      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-800">
              <th className="pb-2 pr-4 font-semibold">Nombre</th>
              <th className="pb-2 pr-4 font-semibold">Correo</th>
              <th className="pb-2 pr-4 font-semibold">Rol</th>
              <th className="pb-2 font-semibold" />
            </tr>
          </thead>
          <tbody>
            {admins.map((a) => (
              <tr key={a.id} className="border-b border-slate-800/60">
                <td className="py-3 pr-4 text-white">{a.name || "—"}</td>
                <td className="py-3 pr-4">{a.email}</td>
                <td className="py-3 pr-4 capitalize">{a.role}</td>
                <td className="py-3 text-right">
                  <form
                    action={async () => {
                      "use server";
                      await deleteAdmin(a.id);
                    }}
                  >
                    <button className="text-red-400 hover:underline">Eliminar</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
