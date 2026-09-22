"use client";

import { useState } from "react";
import { Card, inputCls, labelCls } from "./ui";

type TopEntry = {
  id: string;
  position: number;
  name: string;
  detail: string | null;
  amount: number;
};

export function EditableTopEntry({
  pos,
  entry,
  updateAction,
  deleteAction,
}: {
  pos: number;
  entry: TopEntry | undefined;
  updateAction: ((formData: FormData) => Promise<void>) | null;
  deleteAction: (() => Promise<void>) | null;
}) {
  const [editing, setEditing] = useState(false);

  if (editing && entry && updateAction) {
    return (
      <Card>
        <form
          action={async (fd) => {
            await updateAction(fd);
            setEditing(false);
          }}
          className="space-y-3"
        >
          <div className="text-4xl font-black text-[#f8f400] text-center">#{pos}</div>
          <input type="hidden" name="position" value={pos} />
          <div>
            <label className={labelCls}>Nombre</label>
            <input name="name" required defaultValue={entry.name} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Detalle</label>
            <input name="detail" defaultValue={entry.detail || ""} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Monto (USD)</label>
            <input name="amount" type="number" step="0.01" defaultValue={entry.amount} className={inputCls} />
          </div>
          <div className="flex justify-center gap-2">
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
    <Card className="text-center">
      <div className="text-4xl font-black text-[#f8f400]">#{pos}</div>
      {entry ? (
        <>
          <p className="mt-2 text-lg font-bold text-white">{entry.name}</p>
          <p className="text-sm text-slate-400">{entry.detail}</p>
          <p className="mt-1 text-sm text-slate-300">${entry.amount.toFixed(2)}</p>
          <div className="mt-3 flex items-center justify-center gap-4">
            <button onClick={() => setEditing(true)} className="text-sm text-[#f8f400] hover:underline">
              Editar
            </button>
            {deleteAction ? (
              <form action={deleteAction}>
                <button className="text-sm text-red-400 hover:underline">Quitar</button>
              </form>
            ) : null}
          </div>
        </>
      ) : (
        <p className="mt-4 text-sm text-slate-600">Vacío</p>
      )}
    </Card>
  );
}
