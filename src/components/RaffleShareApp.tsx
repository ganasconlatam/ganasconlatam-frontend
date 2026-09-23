"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Vista } from "@/components/types";
import ComponenteVerDetalles from "@/components/ComponenteVerDetalles";
import ComponenteCTusDatos from "@/components/ComponenteCTusDatos";
import ComponenteCMetodoDePago from "@/components/ComponenteCMetodoDePago";
import ComponenteCPagoEnRevision from "@/components/ComponenteCPagoEnRevision";
import ComponenteCSeleccionManualTickets from "@/components/ComponenteCSeleccionManualTickets";
import ComponenteCSeleccionManualConfirmar from "@/components/ComponenteCSeleccionManualConfirmar";
import ComponenteConsultarCTickets from "@/components/ComponenteConsultarCTickets";
import ComponenteConsultarCTResultados from "@/components/ComponenteConsultarCTResultados";
import ComponenteAccessAdmin from "@/components/ComponenteAccessAdmin";
import { PurchaseProvider } from "@/components/PurchaseContext";

// App para el enlace único de una rifa (/rifa/[code]).
// Reutiliza el mismo flujo de compra que la página principal, pero arranca
// directamente en "Ver detalles" con la rifa identificada por su código,
// para poder compartirla individualmente por redes sociales.
export default function RaffleShareApp({ code }: { code: string }) {
  const router = useRouter();
  const [vistaActiva, setVistaActiva] = useState<Vista>("verdetalles");

  const cambiarVista = (nuevaVista: Vista) => {
    // "Volver a Rifas" dentro del detalle debe llevar a la página principal real.
    if (nuevaVista === "inicio" || nuevaVista === "iniciopromocion") {
      router.push("/");
      return;
    }
    setVistaActiva(nuevaVista);
  };

  if (vistaActiva === "accessadmin") {
    return <ComponenteAccessAdmin vistaActiva={vistaActiva} cambiarVista={cambiarVista} />;
  }

  const renderizarInterfaz = () => {
    switch (vistaActiva) {
      case "verdetalles":
        return <ComponenteVerDetalles cambiarVista={cambiarVista} />;
      case "ctusdatos":
        return <ComponenteCTusDatos cambiarVista={cambiarVista} />;
      case "cmetododepago":
        return <ComponenteCMetodoDePago cambiarVista={cambiarVista} />;
      case "cpagoenrevision":
        return <ComponenteCPagoEnRevision cambiarVista={cambiarVista} />;
      case "cseleccionmanualtickets":
        return <ComponenteCSeleccionManualTickets cambiarVista={cambiarVista} />;
      case "cseleccionmanualconfirmar":
        return <ComponenteCSeleccionManualConfirmar cambiarVista={cambiarVista} />;
      default:
        return <ComponenteVerDetalles cambiarVista={cambiarVista} />;
    }
  };

  return (
    <PurchaseProvider initialCode={code}>
      <div
        className="min-h-screen w-full max-w-full text-white flex flex-col font-sans relative transition-colors duration-300 selection:bg-[var(--color-primary)] selection:text-white"
        style={
          {
            "--ColorPrimary": "#f8f400",
            "--ColorSecondary": "#f4ef00",
            "--ColorBackground": "#000000FC",
            "--ColorSurface": "#151f3247",
            "--ColorText": "#ffffff",
            "--ColorPrimaryDark": "#f8f400",
            "--ColorPrimaryForeground": "#000000",
            backgroundColor: "rgba(0,0,0,0.99)",
          } as React.CSSProperties
        }
      >
        <ComponenteConsultarCTResultados vistaActiva={vistaActiva} cambiarVista={cambiarVista} />
        <ComponenteConsultarCTickets vistaActiva={vistaActiva} cambiarVista={cambiarVista} />
        <header
          className="sticky top-0 z-40 w-full backdrop-blur-md border-b transition-all bg-transparent"
          style={{ background: "transparent", borderColor: "rgba(248,244,0,0.145)" }}
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 md:h-24 flex items-center justify-between gap-2">
            <button
              className="flex items-center gap-2 sm:gap-4 cursor-pointer shrink-0"
              onClick={() => router.push("/")}
              aria-label="Ir al inicio"
            >
              <img
                src="images/4.webp"
                alt="Logo"
                className="h-10 sm:h-14 md:h-20 w-auto object-contain max-w-[110px] sm:max-w-[170px] md:max-w-[260px] relative z-50 drop-shadow-sm transition-all"
              />
            </button>
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              <button
                className="flex items-center gap-1 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full font-bold text-[11px] sm:text-xs border bg-transparent transition-all hover:scale-105 active:scale-95 shadow-sm"
                title="Salón de la Fama - Ganadores 10PM"
                style={{ borderColor: "rgba(255,215,0,0.45)", color: "rgb(255,215,0)", background: "rgba(255,215,0,0.06)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trophy fill-current shrink-0">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
                <span className="whitespace-nowrap">Salón</span>
              </button>
              <button
                className="px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-bold text-[11px] sm:text-xs md:text-sm border bg-transparent hover:bg-[var(--color-primary)]/10 flex items-center gap-1.5 group transition-all active:scale-95 shadow-sm"
                title="Verificar Boletos"
                style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)" }}
                onClick={() => cambiarVista("cconsultarctickets")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ticket text-current shrink-0">
                  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                  <path d="M13 5v2" />
                  <path d="M13 17v2" />
                  <path d="M13 11v2" />
                </svg>
                <span className="whitespace-nowrap">Mis Tickets</span>
              </button>
              <button
                className="p-1.5 sm:p-2 rounded-full bg-transparent hover:bg-slate-800/40 hover:text-white transition-all active:scale-95 border"
                title="Acceso Administrativo"
                style={{ borderColor: "var(--color-secondary)", color: "var(--color-secondary)" }}
                onClick={() => cambiarVista("accessadmin")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield">
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-grow pb-24">
          <div className="w-full max-w-full overflow-x-hidden animate-in fade-in duration-500 relative">
            <div className="min-h-screen bg-slate-950">
              <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[var(--color-background,#020617)] pb-8 font-sans relative">
                <div className="fixed inset-0 z-0 pointer-events-none transform-gpu will-change-transform">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to bottom,#072f0408,#072f0408,var(--color-background,#020617))",
                    }}
                  ></div>
                </div>
                <div className="relative z-10">{renderizarInterfaz()}</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </PurchaseProvider>
  );
}
