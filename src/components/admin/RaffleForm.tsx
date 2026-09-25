"use client";

import { useState } from "react";
import type { Raffle } from "@prisma/client";
import { inputCls, labelCls, PrimaryButton } from "./ui";

export default function RaffleForm({
  action,
  raffle,
  dollarRate,
}: {
  action: (formData: FormData) => void | Promise<void>;
  raffle?: Raffle | null;
  dollarRate: number;
}) {
  const [imageUrl, setImageUrl] = useState(raffle?.imageUrl ?? "");
  const [uploadError, setUploadError] = useState("");

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError("");
    if (!file.type.startsWith("image/")) {
      setUploadError("El archivo debe ser una imagen.");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setUploadError("La imagen no debe superar los 3 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImageUrl(typeof reader.result === "string" ? reader.result : "");
    reader.readAsDataURL(file);
  }

  return (
    <form action={action} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Código único (sobre la imagen)</label>
          <input name="code" defaultValue={raffle?.code ?? ""} required className={inputCls} placeholder="RIF-001" />
        </div>
        <div>
          <label className={labelCls}>Estatus</label>
          <select name="status" defaultValue={raffle?.status ?? "PROXIMA"} className={inputCls}>
            <option value="ACTIVA">Activa</option>
            <option value="PROXIMA">Próxima</option>
            <option value="FINALIZADA">Finalizada</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>Título</label>
        <input name="title" defaultValue={raffle?.title ?? ""} required className={inputCls} placeholder="Gran Rifa de..." />
      </div>

      <div>
        <label className={labelCls}>Detalles</label>
        <textarea name="details" defaultValue={raffle?.details ?? ""} rows={3} className={inputCls} placeholder="Descripción del premio y condiciones" />
      </div>

      <div>
        <label className={labelCls}>Imagen del sorteo</label>
        <input type="hidden" name="imageUrl" value={imageUrl} />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <div className="relative h-32 w-full overflow-hidden rounded-lg border border-slate-700 bg-slate-800 sm:w-56 shrink-0">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageUrl || "/placeholder.svg"} alt="Vista previa de la rifa" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">Sin imagen</div>
            )}
          </div>
          <div className="flex-1 space-y-2">
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="block w-full text-sm text-slate-300 file:mr-3 file:rounded-lg file:border-0 file:bg-[var(--color-primary)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[var(--color-primary-foreground)] hover:file:brightness-110"
            />
            <p className="text-xs text-slate-500">Sube un archivo desde tu computadora (máx. 3 MB) o pega una URL abajo.</p>
            <input
              value={imageUrl.startsWith("data:") ? "" : imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className={inputCls}
              placeholder="/images/rifas/1.png"
            />
            {imageUrl ? (
              <button type="button" onClick={() => setImageUrl("")} className="text-xs text-red-400 hover:text-red-300">
                Quitar imagen
              </button>
            ) : null}
            {uploadError ? <p className="text-xs text-red-400">{uploadError}</p> : null}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className={labelCls}>Precio (USD)</label>
          <input name="priceUsd" type="number" step="0.01" defaultValue={raffle?.priceUsd ?? 0} className={inputCls} />
          <p className="mt-1 text-xs text-slate-500">
            ≈ {((raffle?.priceUsd ?? 0) * dollarRate).toFixed(2)} Bs (tasa {dollarRate})
          </p>
        </div>
        <div>
          <label className={labelCls}>Total de boletos</label>
          <input name="totalTickets" type="number" defaultValue={raffle?.totalTickets ?? 1000} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Progreso barra (%)</label>
          <input name="progress" type="number" step="0.1" min="0" max="100" defaultValue={raffle?.progress ?? 0} className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Fecha del sorteo</label>
          <input name="drawDate" type="date" defaultValue={raffle?.drawDate ?? ""} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Hora del sorteo</label>
          <input name="drawTime" type="time" defaultValue={raffle?.drawTime ?? ""} className={inputCls} />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <PrimaryButton type="submit">Guardar rifa</PrimaryButton>
      </div>
    </form>
  );
}
