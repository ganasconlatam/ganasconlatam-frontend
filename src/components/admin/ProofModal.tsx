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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 animate-in fade-in duration-200"
          onClick={() => setOpen(false)}
        >
          <div className="relative flex w-full max-w-3xl flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-end gap-2">
              <a
                href={proofUrl}
                download={`comprobante-${Date.now()}.png`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#f8f400] px-3 py-1.5 text-sm font-semibold text-slate-900 hover:brightness-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Descargar
              </a>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-sm font-semibold text-white hover:bg-slate-700"
                aria-label="Cerrar"
              >
                Cerrar ✕
              </button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={proofUrl || "/placeholder.svg"}
              alt="Comprobante de pago"
              className="max-h-[82vh] w-full rounded-lg border border-slate-700 bg-slate-950 object-contain"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
