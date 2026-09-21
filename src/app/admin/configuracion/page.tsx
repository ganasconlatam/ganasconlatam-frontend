import {
  getConfig,
  updateConfig,
  getSocialLinks,
  createSocialLink,
  toggleSocialLink,
  deleteSocialLink,
} from "@/app/admin/_actions/config";
import { PageHeader, Card, inputCls, labelCls, PrimaryButton } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function ConfiguracionPage() {
  const [config, socials] = await Promise.all([getConfig(), getSocialLinks()]);

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="Configuración global"
        subtitle="Tasa del dólar, colores del sitio y redes sociales."
      />

      <Card>
        <h2 className="text-lg font-bold text-white mb-1">Tasa del día y colores</h2>
        <p className="text-sm text-slate-400 mb-4">
          La tasa se usa para calcular automáticamente el precio en Bolívares de cada sorteo a
          partir del precio en USD.
        </p>
        <form action={updateConfig} className="space-y-5">
          <div>
            <label className={labelCls}>Tasa del dólar (Bs por USD)</label>
            <input
              name="dollarRate"
              type="number"
              step="0.01"
              defaultValue={config.dollarRate}
              className={inputCls}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ColorField label="Color de botones" name="buttonColor" value={config.buttonColor} />
            <ColorField label="Color de bordes" name="borderColor" value={config.borderColor} />
            <ColorField label="Color de marcos" name="frameColor" value={config.frameColor} />
          </div>

          <div className="flex justify-end">
            <PrimaryButton type="submit">Guardar configuración</PrimaryButton>
          </div>
        </form>
      </Card>

      <Card>
        <h2 className="text-lg font-bold text-white mb-4">Redes sociales</h2>

        <form action={createSocialLink} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className={labelCls}>Plataforma</label>
            <select name="platform" className={inputCls}>
              <option value="whatsapp">WhatsApp</option>
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="tiktok">TikTok</option>
              <option value="telegram">Telegram</option>
              <option value="x">X (Twitter)</option>
              <option value="youtube">YouTube</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>Enlace</label>
            <input name="url" className={inputCls} placeholder="https://..." />
          </div>
          <div>
            <label className={labelCls}>Orden</label>
            <input name="order" type="number" defaultValue={0} className={inputCls} />
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-300 md:col-span-4">
            <input type="checkbox" name="enabled" defaultChecked className="accent-[#f8f400] w-4 h-4" />
            Activo
          </label>
          <div className="md:col-span-4 flex justify-end">
            <PrimaryButton type="submit">Agregar red social</PrimaryButton>
          </div>
        </form>

        <div className="space-y-2">
          {socials.length === 0 ? (
            <p className="text-slate-500">No hay redes sociales configuradas.</p>
          ) : (
            socials.map((s) => (
              <div
                key={s.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-800 px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-white capitalize">{s.platform}</p>
                  <p className="text-xs text-slate-400 truncate max-w-xs">{s.url}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      s.enabled ? "bg-green-500/15 text-green-400" : "bg-slate-500/15 text-slate-400"
                    }`}
                  >
                    {s.enabled ? "Activo" : "Inactivo"}
                  </span>
                  <form action={toggleSocialLink.bind(null, s.id, !s.enabled)}>
                    <button className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-slate-800">
                      {s.enabled ? "Desactivar" : "Activar"}
                    </button>
                  </form>
                  <form action={deleteSocialLink.bind(null, s.id)}>
                    <button className="rounded-lg border border-red-500/30 px-3 py-1.5 text-sm font-semibold text-red-400 hover:bg-red-500/10">
                      Eliminar
                    </button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}

function ColorField({ label, name, value }: { label: string; name: string; value: string }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="flex items-center gap-2">
        <input
          name={name}
          type="color"
          defaultValue={value}
          className="h-11 w-14 rounded-lg border border-slate-700 bg-slate-800 cursor-pointer"
        />
        <input
          readOnly
          value={value}
          className="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-400 text-sm"
        />
      </div>
    </div>
  );
}
