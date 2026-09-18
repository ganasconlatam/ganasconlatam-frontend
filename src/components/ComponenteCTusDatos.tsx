// 1. ¡Obligatorio! Esto activa la reactividad y las funciones del navegador
"use client"; 

import { useState } from "react";
import { HijoProps } from './types'; 

export default function ComponenteCMetodoDePago({ cambiarVista }: HijoProps) {


  return (
<div className="relative -mt-10 md:-mt-16">
  <div className="absolute -top-32 left-0 w-full h-px pointer-events-none" />
  <div className="max-w-4xl mx-auto px-6 mb-8 mt-4" />
  <div className="mt-8 md:mt-24">
    <div className="w-full max-w-lg md:max-w-6xl mx-auto p-4 animate-in fade-in slide-in-from-right-8 duration-500">
      <button className="text-slate-400 mb-6 flex items-center gap-1 hover:text-[var(--color-primary)] text-sm font-bold transition-colors mx-auto"
        onClick={() => cambiarVista('inicio')}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-chevron-right rotate-180"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
        Modificar Cantidad (2 tickets)
      </button>
      <div className="max-w-xl mx-auto">
        <h2 className="text-xl font-black text-white mb-6 uppercase text-center flex items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-user text-[var(--color-primary)]"
          >
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
              defaultValue=""
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 ml-1 flex items-center gap-1">
                <span>CÉDULA</span>
                <span className="text-rose-400">*</span>
              </label>
              <div className="flex">
                <select defaultValue="V" className="bg-slate-950 border border-r-0 rounded-l-lg px-3 py-3 text-white outline-none border-slate-700 font-bold">
                  <option value="V">V</option>
                  <option value="E">E</option>
                  <option value="J">J</option>
                </select>
                <input
                  className="flex-1 bg-slate-950 border rounded-r-lg px-4 py-3 text-white outline-none transition-all border-slate-700 focus:border-[var(--color-primary)]"
                  placeholder="12345678"
                  defaultValue=""
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
                defaultValue=""
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 ml-1 flex items-center gap-1">
              <span>ESTADO</span>
              <span className="text-rose-400 font-black">* (OBLIGATORIO)</span>
            </label>
            <select className="w-full bg-slate-950 border rounded-lg px-4 py-3 text-white outline-none transition-all border-slate-700 focus:border-[var(--color-primary)]">
              <option
                value=""
                disabled=""
                className="text-slate-600"
                selected=""
              >
                Selecciona tu Estado
              </option>
              <option value="Amazonas" className="bg-slate-900 text-white">
                Amazonas
              </option>
              <option value="Anzoátegui" className="bg-slate-900 text-white">
                Anzoátegui
              </option>
              <option value="Apure" className="bg-slate-900 text-white">
                Apure
              </option>
              <option value="Aragua" className="bg-slate-900 text-white">
                Aragua
              </option>
              <option value="Barinas" className="bg-slate-900 text-white">
                Barinas
              </option>
              <option value="Bolívar" className="bg-slate-900 text-white">
                Bolívar
              </option>
              <option value="Carabobo" className="bg-slate-900 text-white">
                Carabobo
              </option>
              <option value="Cojedes" className="bg-slate-900 text-white">
                Cojedes
              </option>
              <option value="Delta Amacuro" className="bg-slate-900 text-white">
                Delta Amacuro
              </option>
              <option
                value="Distrito Capital"
                className="bg-slate-900 text-white"
              >
                Distrito Capital
              </option>
              <option value="Falcón" className="bg-slate-900 text-white">
                Falcón
              </option>
              <option value="Guárico" className="bg-slate-900 text-white">
                Guárico
              </option>
              <option value="La Guaira" className="bg-slate-900 text-white">
                La Guaira
              </option>
              <option value="Lara" className="bg-slate-900 text-white">
                Lara
              </option>
              <option value="Mérida" className="bg-slate-900 text-white">
                Mérida
              </option>
              <option value="Miranda" className="bg-slate-900 text-white">
                Miranda
              </option>
              <option value="Monagas" className="bg-slate-900 text-white">
                Monagas
              </option>
              <option value="Nueva Esparta" className="bg-slate-900 text-white">
                Nueva Esparta
              </option>
              <option value="Portuguesa" className="bg-slate-900 text-white">
                Portuguesa
              </option>
              <option value="Sucre" className="bg-slate-900 text-white">
                Sucre
              </option>
              <option value="Táchira" className="bg-slate-900 text-white">
                Táchira
              </option>
              <option value="Trujillo" className="bg-slate-900 text-white">
                Trujillo
              </option>
              <option value="Yaracuy" className="bg-slate-900 text-white">
                Yaracuy
              </option>
              <option value="Zulia" className="bg-slate-900 text-white">
                Zulia
              </option>
              <option
                value="Extranjero / Fuera del País"
                className="bg-slate-900 text-white"
              >
                Extranjero / Fuera del País
              </option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 ml-1">
              CORREO ELECTRÓNICO (OPCIONAL)
            </label>
            <input
              type="email"
              className="w-full bg-slate-950 border rounded-lg px-4 py-3 text-white outline-none transition-all border-slate-700 focus:border-[var(--color-primary)]"
              placeholder="ejemplo@correo.com"
              defaultValue=""
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex-[2] order-1 sm:order-2 py-4 font-black text-lg uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 group bg-[var(--color-primary)] hover:brightness-110 active:scale-95 text-black shadow-[0_0_20px_rgba(234,179,8,0.2)]"
            onClick={() => cambiarVista('cmetododepago')}>
            Continuar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right group-hover:translate-x-1 transition-transform"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
          <button className="flex-1 order-2 sm:order-1 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 group border border-white/5"
            onClick={() => cambiarVista('inicio')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-left group-hover:-translate-x-1 transition-transform"
            >
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
