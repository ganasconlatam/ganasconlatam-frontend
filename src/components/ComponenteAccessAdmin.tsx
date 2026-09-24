// 1. ¡Obligatorio! Esto activa la reactividad y las funciones del navegador
"use client"; 

import { useState } from "react";
import { Vista } from './types'; 

interface ComponenteProp {
  vistaActiva?: Vista;
  cambiarVista?: (nuevaVista: Vista) => void; // Define que es una función
}

export default function ComponenteAccessAdmin({ vistaActiva, cambiarVista }: ComponenteProp) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "No se pudo iniciar sesión");
        setLoading(false);
        return;
      }
      window.location.href = "/admin";
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
      setLoading(false);
    }
  }

  return (

<div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-4 relative overflow-hidden">
  <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none"></div>
  <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
  <button
    type="button"
    onClick={() => cambiarVista?.("inicio")}
    className="absolute top-5 left-5 z-20 inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm font-semibold text-slate-300 backdrop-blur-md transition-colors hover:bg-slate-800 hover:text-white"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
    Volver al inicio
  </button>
  <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative z-10 animate-in zoom-in-95 duration-500">
    <div className="p-8 pt-12 text-center">
      <div className="mx-auto mb-8 flex justify-center animate-in slide-in-from-top-4 fade-in duration-700">
        <div className="relative group cursor-default">
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/40 to-primary-500/40 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
          <img
            src="images/admin/3.png"
            alt="SUR Logo"
            className="relative h-16 md:h-20 w-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
            data-sf-original-src="https://www.ganasconlatam.com/logos/sur_logo.png"
          />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">
        Panel Administrativo
      </h2>
      <p className="text-slate-400 text-sm">
        Acceso restringido para personal autorizado
      </p>
    </div>
    <form className="p-8 pt-0 space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase ml-1">
          Correo Corporativo
        </label>
        <div className="relative group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-mail absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-500 transition-colors"
          >
            <rect width={20} height={16} x={2} y={4} rx={2} />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <input
            type="email"
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-12 pr-4 py-3.5 text-white outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all placeholder-slate-600"
            placeholder="admin@ganasconlatam.com"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase ml-1">
          Contraseña
        </label>
        <div className="relative group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-500 transition-colors"
          >
            <rect width={18} height={11} x={3} y={11} rx={2} ry={2} />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <input
            type="password"
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-12 pr-4 py-3.5 text-white outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all placeholder-slate-600"
            placeholder="••••••••••••"
          />
        </div>
      </div>
      {error ? (
        <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      ) : null}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary-500 hover:bg-primary-600 text-slate-900 font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary-500/20 flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? "Ingresando..." : "Ingresar al Sistema"}{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-right"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </button>
    </form>
    <div className="p-6 bg-slate-950/30 text-center border-t border-slate-800/50 flex flex-col items-center gap-4">
      <p className="text-xs text-slate-600">© 2025 SUR Secure Access</p>
      <div className="flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity duration-300">
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
          Homologado por la CONALOT
        </p>
        <img
          src="images/admin/4.png"
          alt="CONALOT Logo"
          className="h-9 md:h-11 object-contain grayscale hover:grayscale-0 transition-all duration-300"
          data-sf-original-src="https://www.ganasconlatam.com/logos/conalot.png"
        />
      </div>
    </div>
  </div>
</div>

    
  );
}
