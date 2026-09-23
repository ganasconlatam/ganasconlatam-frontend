"use client";

import { useState } from "react";

export function ProofModal({ proofUrl }: { proofUrl: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="inline-block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={proofUrl || "/placeholder.svg"}
          alt="Comprobante de pago"
          className="h-32 rounded-lg border border-slate-700 object-cover hover:border-[#f8f400]"
        />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(false)}
        >
          <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-0 rounded-lg bg-slate-800 px-3 py-1.5 text-sm font-semibold text-white hover:bg-slate-700"
              aria-label="Cerrar"
            >
              Cerrar ✕
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={proofUrl || "/placeholder.svg"}
              alt="Comprobante de pago"
              className="w-full max-h-[80vh] object-contain rounded-lg border border-slate-700 bg-slate-950"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
