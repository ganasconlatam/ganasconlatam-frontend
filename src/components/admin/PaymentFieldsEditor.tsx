"use client";

import { useState } from "react";
import type { PaymentField } from "@/lib/payment";
import { inputCls, labelCls } from "./ui";

// Editor de datos dinámicos: pares "nombre del dato" + "valor", con botón para
// agregar/quitar filas. El valor final se serializa como JSON en un input oculto.
export function PaymentFieldsEditor({
  name,
  initial,
}: {
  name: string;
  initial: PaymentField[];
}) {
  const [rows, setRows] = useState<PaymentField[]>(
    initial.length > 0 ? initial : [{ label: "", value: "" }],
  );

  const update = (i: number, key: keyof PaymentField, val: string) =>
    setRows((r) => r.map((row, idx) => (idx === i ? { ...row, [key]: val } : row)));

  const add = () => setRows((r) => [...r, { label: "", value: "" }]);

  const remove = (i: number) =>
    setRows((r) => (r.length <= 1 ? [{ label: "", value: "" }] : r.filter((_, idx) => idx !== i)));

  const cleaned = rows
    .map((r) => ({ label: r.label.trim(), value: r.value.trim() }))
    .filter((r) => r.label || r.value);

  return (
    <div className="md:col-span-2 space-y-3">
      <label className={labelCls}>Datos del método (nombre + valor)</label>
      <input type="hidden" name={name} value={JSON.stringify(cleaned)} />

      <div className="space-y-2">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={row.label}
              onChange={(e) => update(i, "label", e.target.value)}
              className={inputCls}
              placeholder="Nombre del dato (ej. Correo)"
            />
            <input
              value={row.value}
              onChange={(e) => update(i, "value", e.target.value)}
              className={inputCls}
              placeholder="Valor (ej. correo@gmail.com)"
            />
            <button
              type="button"
              onClick={() => remove(i)}
              aria-label="Quitar dato"
              className="shrink-0 w-10 h-10 flex items-center justify-center rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-1.5 rounded-lg border border-[#f8f400]/40 bg-[#f8f400]/10 px-3 py-1.5 text-sm font-bold text-[#f8f400] hover:bg-[#f8f400]/20 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
        Agregar dato
      </button>
    </div>
  );
}
