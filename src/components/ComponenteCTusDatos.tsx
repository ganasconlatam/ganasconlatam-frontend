// 1. ¡Obligatorio! Esto activa la reactividad y las funciones del navegador
"use client";

import { useState } from "react";
import { HijoProps } from './types';
import { usePurchase } from './PurchaseContext';

const ESTADOS = [
  "Amazonas", "Anzoátegui", "Apure", "Aragua", "Barinas", "Bolívar", "Carabobo",
  "Cojedes", "Delta Amacuro", "Distrito Capital", "Falcón", "Guárico", "La Guaira",
  "Lara", "Mérida", "Miranda", "Monagas", "Nueva Esparta", "Portuguesa", "Sucre",
  "Táchira", "Trujillo", "Yaracuy", "Zulia", "Extranjero / Fuera del País",
];

export default function ComponenteCTusDatos({ cambiarVista }: HijoProps) {
  const { buyer, setBuyerField, effectiveQty, mode, selectedTickets } = usePurchase();
  const [error, setError] = useState<string | null>(null);

  const cantidad = mode === "manual" ? selectedTickets.length : effectiveQty;

  const continuar = () => {
    if (!buyer.name.trim()) return setError("Ingresa tu nombre y apellido.");
    if (buyer.cedula.trim().length < 6) return setError("La cédula debe tener al menos 6 dígitos.");
    if (buyer.phone.trim().length < 11) return setError("Ingresa un teléfono WhatsApp válido (11 dígitos).");
    if (!buyer.state) return setError("Selecciona tu estado.");
    setError(null);
    cambiarVista("cmetododepago");
  };

  return (
<div className="relative -mt-10 md:-mt-16">
  <div className="absolute -top-32 left-0 w-full h-px pointer-events-none" />
  <div className="max-w-4xl mx-auto px-6 mb-8 mt-4" />
  <div className="mt-8 md:mt-24">
    <div className="w-full max-w-lg md:max-w-6xl mx-auto p-4 animate-in fade-in slide-in-from-right-8 duration-500">
      <button className="text-slate-400 mb-6 flex items-center gap-1 hover:text-[var(--color-primary)] text-sm font-bold transition-colors mx-auto"
        onClick={() => cambiarVista('inicio')}>
        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right rotate-180">
          <path d="m9 18 6-6-6-6" />
        </svg>
        Modificar Cantidad ({cantidad} {cantidad === 1 ? "ticket" : "tickets"})
      </button>
      <div className="max-w-xl mx-auto">
        <h2 className="text-xl font-black text-white mb-6 uppercase text-center flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user text-[var(--color-primary)]">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx={12} cy={7} r={4} />
          </svg>{" "}
          Tus Datos
        </h2>
        <div className="space-y-4 mb-8 bg-slate-900/50 p-6 rounded-2xl border border-white/5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 ml-1 flex items-center gap-1">
              <span>NOMBRE Y APELLIDO</span>
              <span className="text-rose-400">*</span>
            </label>
            <input
              className="w-full bg-slate-950 border rounded-lg px-4 py-3 text-white placeholder-slate-600 outline-none transition-all border-slate-700 focus:border-[var(--color-primary)]"
              placeholder="Ej. Juan Pérez"
              value={buyer.name}
              onChange={(e) => setBuyerField("name", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 ml-1 flex items-center gap-1">
                <span>CÉDULA</span>
                <span className="text-rose-400">*</span>
              </label>
              <div className="flex">
                <select
                  value={buyer.cedulaType}
                  onChange={(e) => setBuyerField("cedulaType", e.target.value)}
                  className="bg-slate-950 border border-r-0 rounded-l-lg px-3 py-3 text-white outline-none border-slate-700 font-bold"
                >
                  <option value="V">V</option>
                  <option value="E">E</option>
                  <option value="J">J</option>
                </select>
                <input
                  className="flex-1 bg-slate-950 border rounded-r-lg px-4 py-3 text-white outline-none transition-all border-slate-700 focus:border-[var(--color-primary)]"
                  placeholder="12345678"
                  inputMode="numeric"
                  value={buyer.cedula}
                  onChange={(e) => setBuyerField("cedula", e.target.value.replace(/\D/g, ""))}
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 ml-1 flex items-center gap-1">
                <span>WHATSAPP</span>
                <span className="text-rose-400">*</span>
              </label>
              <input
                className="w-full bg-slate-950 border rounded-lg px-4 py-3 text-white outline-none transition-all border-slate-700 focus:border-[var(--color-primary)]"
                placeholder=" Ej 04121234567"
                inputMode="numeric"
                maxLength={11}
                value={buyer.phone}
                onChange={(e) => setBuyerField("phone", e.target.value.replace(/\D/g, ""))}
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 ml-1 flex items-center gap-1">
              <span>ESTADO</span>
              <span className="text-rose-400 font-black">* (OBLIGATORIO)</span>
            </label>
            <select
              value={buyer.state}
              onChange={(e) => setBuyerField("state", e.target.value)}
              className="w-full bg-slate-950 border rounded-lg px-4 py-3 text-white outline-none transition-all border-slate-700 focus:border-[var(--color-primary)]"
            >
              <option value="" disabled className="text-slate-600">
                Selecciona tu Estado
              </option>
              {ESTADOS.map((e) => (
                <option key={e} value={e} className="bg-slate-900 text-white">
                  {e}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 ml-1">
              CORREO ELECTRÓNICO (recomendado para recibir tu verificación)
            </label>
            <input
              type="email"
              className="w-full bg-slate-950 border rounded-lg px-4 py-3 text-white outline-none transition-all border-slate-700 focus:border-[var(--color-primary)]"
              placeholder="ejemplo@correo.com"
              value={buyer.email}
              onChange={(e) => setBuyerField("email", e.target.value)}
            />
          </div>
          {error && (
            <p className="text-sm font-bold text-rose-400 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-circle">
                <circle cx={12} cy={12} r={10} />
                <line x1={12} x2={12} y1={8} y2={12} />
                <line x1={12} x2="12.01" y1={16} y2={16} />
              </svg>
              {error}
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex-[2] order-1 sm:order-2 py-4 font-black text-lg uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 group bg-[var(--color-primary)] hover:brightness-110 active:scale-95 text-black shadow-[0_0_20px_rgba(234,179,8,0.2)]"
            onClick={continuar}>
            Continuar
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right group-hover:translate-x-1 transition-transform">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
          <button className="flex-1 order-2 sm:order-1 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 group border border-white/5"
            onClick={() => cambiarVista('inicio')}>
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left group-hover:-translate-x-1 transition-transform">
              <path d="m15 18-6-6 6-6" />
            </svg>{" "}
            Volver
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}
