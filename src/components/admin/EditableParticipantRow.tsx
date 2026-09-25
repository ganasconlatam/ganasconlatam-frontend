"use client";

import { useState } from "react";
import { inputCls, labelCls } from "./ui";

type Participant = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  cedula: string | null;
  _count: { orders: number };
};

export function EditableParticipantRow({
  participant,
  updateAction,
  deleteAction,
}: {
  participant: Participant;
  updateAction: (formData: FormData) => Promise<void>;
  deleteAction: () => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);

  if (!editing) {
    return (
      <tr className="border-b border-slate-800/60">
        <td className="py-3 pr-4 text-white">{participant.name}</td>
        <td className="py-3 pr-4">{participant.email}</td>
        <td className="py-3 pr-4">{participant.phone || "—"}</td>
        <td className="py-3 pr-4">{participant.cedula || "—"}</td>
        <td className="py-3 pr-4">{participant._count.orders}</td>
        <td className="py-3 text-right whitespace-nowrap">
          <button
            onClick={() => setEditing(true)}
            className="text-[#f8f400] hover:underline mr-4"
          >
            Editar
          </button>
          <form action={deleteAction} className="inline">
            <button className="text-red-400 hover:underline">Eliminar</button>
          </form>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-b border-slate-800/60 bg-slate-900/40">
      <td colSpan={6} className="py-4">
        <form
          action={async (fd) => {
            await updateAction(fd);
            setEditing(false);
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className={labelCls}>Nombre</label>
            <input name="name" required defaultValue={participant.name} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Correo</label>
            <input name="email" type="email" required defaultValue={participant.email} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Teléfono</label>
            <input name="phone" defaultValue={participant.phone || ""} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Cédula</label>
            <input name="cedula" defaultValue={participant.cedula || ""} className={inputCls} />
          </div>
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
      </td>
    </tr>
  );
}
