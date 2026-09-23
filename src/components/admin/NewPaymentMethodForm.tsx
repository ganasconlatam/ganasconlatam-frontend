"use client";

import { useState } from "react";
import { Card, inputCls, labelCls, PrimaryButton } from "./ui";

const MAX_ICON_BYTES = 800_000; // ~800KB para el ícono/logo del método

export function NewPaymentMethodForm({
  createAction,
}: {
  createAction: (formData: FormData) => Promise<void>;
}) {
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState<string | null>(null);

  const onFile = (file: File | null) => {
    if (!file) return;
    if (file.size > MAX_ICON_BYTES) {
      setImageError("La imagen es muy pesada (máx. 800KB). Usa una imagen más liviana.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(String(reader.result));
      setImageError(null);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card>
      <h2 className="text-lg font-bold text-white mb-4">Nuevo método</h2>
      <form
        action={async (fd) => {
          await createAction(fd);
          setImageUrl("");
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
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
        <div className="md:col-span-2">
          <label className={labelCls}>Ícono / logo del método</label>
          <input type="hidden" name="imageUrl" value={imageUrl} />
          <div className="flex items-center gap-3">
            <label className="relative overflow-hidden shrink-0 w-16 h-16 rounded-lg border-2 border-dashed border-slate-700 hover:border-[#f8f400]/50 bg-slate-950 flex items-center justify-center cursor-pointer">
              <input type="file" className="hidden" accept="image/*" onChange={(e) => onFile(e.target.files?.[0] ?? null)} />
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageUrl} alt="Ícono" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[10px] text-slate-500 text-center px-1">Subir</span>
              )}
            </label>
            <div className="flex-1 space-y-1">
              <p className="text-xs text-slate-500">Se sube desde tu ordenador y se guarda en la base de datos.</p>
              {imageError ? <p className="text-xs text-rose-400">{imageError}</p> : null}
            </div>
          </div>
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
  );
}
