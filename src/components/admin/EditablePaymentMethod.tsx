"use client";

import { useState } from "react";
import { Card, inputCls, labelCls } from "./ui";

type PaymentMethod = {
  id: string;
  name: string;
  type: string;
  details: string | null;
  enabled: boolean;
  order: number;
};

export function EditablePaymentMethod({
  method,
  updateAction,
  toggleAction,
  deleteAction,
}: {
  method: PaymentMethod;
  updateAction: (formData: FormData) => Promise<void>;
  toggleAction: () => Promise<void>;
  deleteAction: () => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <Card>
        <form
          action={async (fd) => {
            await updateAction(fd);
            setEditing(false);
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className={labelCls}>Nombre</label>
            <input name="name" required defaultValue={method.name} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Tipo</label>
            <select name="type" defaultValue={method.type} className={inputCls}>
              <option value="pago_movil">Pago Móvil</option>
              <option value="transferencia">Transferencia</option>
              <option value="zelle">Zelle</option>
              <option value="binance">Binance</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>Detalles</label>
            <textarea name="details" rows={2} defaultValue={method.details || ""} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Orden</label>
            <input name="order" type="number" defaultValue={method.order} className={inputCls} />
          </div>
          <label className="flex items-center gap-2 mt-6 text-sm text-slate-300">
            <input type="checkbox" name="enabled" defaultChecked={method.enabled} className="accent-[#f8f400] w-4 h-4" />
            Activo
          </label>
          <div className="md:col-span-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#f8f400] px-4 py-2 text-sm font-bold text-black hover:brightness-95"
            >
              Guardar
            </button>
          </div>
        </form>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-white">{method.name}</h3>
          <p className="text-xs uppercase text-slate-500">{method.type}</p>
        </div>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
            method.enabled ? "bg-green-500/15 text-green-400" : "bg-slate-500/15 text-slate-400"
          }`}
        >
          {method.enabled ? "Activo" : "Inactivo"}
        </span>
      </div>
      {method.details ? (
        <p className="mt-2 text-sm text-slate-400 whitespace-pre-wrap">{method.details}</p>
      ) : null}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setEditing(true)}
          className="rounded-lg bg-[#f8f400] px-3 py-1.5 text-sm font-bold text-black hover:brightness-95"
        >
          Editar
        </button>
        <form action={toggleAction}>
          <button className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-slate-800">
            {method.enabled ? "Desactivar" : "Activar"}
          </button>
        </form>
        <form action={deleteAction}>
          <button className="rounded-lg border border-red-500/30 px-3 py-1.5 text-sm font-semibold text-red-400 hover:bg-red-500/10">
            Eliminar
          </button>
        </form>
      </div>
    </Card>
  );
}
