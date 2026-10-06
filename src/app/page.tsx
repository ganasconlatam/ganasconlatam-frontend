"use client"; 

import Image from "next/image";
import { useState } from "react";
// Importamos la pieza reactiva desde nuestra carpeta de componentes
import { Vista } from '@/components/types'; // Importas el tipo centralizado
import ComponenteInicio from '@/components/ComponenteInicio';
import ComponenteInicioPromocion from '@/components/ComponenteInicioPromocion';
import ComponenteVerDetalles from '@/components/ComponenteVerDetalles';
import ComponenteCTusDatos from '@/components/ComponenteCTusDatos';
import ComponenteCMetodoDePago from '@/components/ComponenteCMetodoDePago';
import ComponenteCPagoEnRevision from '@/components/ComponenteCPagoEnRevision';
import ComponenteCSeleccionManualTickets from '@/components/ComponenteCSeleccionManualTickets';
import ComponenteCSeleccionManualConfirmar from '@/components/ComponenteCSeleccionManualConfirmar';
import ComponenteConsultarCTickets from '@/components/ComponenteConsultarCTickets';
import ComponenteConsultarCTResultados from '@/components/ComponenteConsultarCTResultados';

import ComponenteFichaRifa from '@/components/ComponenteFichaRifa';
import ComponenteTopCompradores from '@/components/ComponenteTopCompradores';
import ComponenteUltimasRifas from '@/components/ComponenteUltimasRifas';

import ComponenteAccessAdmin from '@/components/ComponenteAccessAdmin';
import FooterSocials from '@/components/FooterSocials';
import FloatingSupport from '@/components/FloatingSupport';
import SiteThemeStyles from '@/components/SiteThemeStyles';
import { PurchaseProvider } from '@/components/PurchaseContext';

export default function NavegacionInterna() {
  const [vistaActiva, setVistaActiva] = useState<Vista>('inicio');

  const cambiarVista = (nuevaVista: Vista) => {
    setVistaActiva(nuevaVista);
  };

  switch (vistaActiva) {
      case 'accessadmin': 
        return <ComponenteAccessAdmin 
                 vistaActiva={vistaActiva} 
                 cambiarVista={cambiarVista} 
              />;
  }
  
  const renderizarInterfaz = () => {  
    switch (vistaActiva) {
      case 'inicio': 
        return <ComponenteInicio cambiarVista={setVistaActiva} />;
      case 'iniciopromocion': 
        return <ComponenteInicioPromocion cambiarVista={setVistaActiva} />;
      case 'verdetalles': 
        return <ComponenteVerDetalles cambiarVista={setVistaActiva} />;
      case 'ctusdatos': 
        return <ComponenteCTusDatos cambiarVista={setVistaActiva} />;
      case 'cmetododepago': 
        return <ComponenteCMetodoDePago cambiarVista={setVistaActiva} />;
      case 'cpagoenrevision': 
        return <ComponenteCPagoEnRevision cambiarVista={setVistaActiva} />;
      case 'cseleccionmanualtickets': 
        return <ComponenteCSeleccionManualTickets cambiarVista={setVistaActiva} />;
      case 'cseleccionmanualconfirmar': 
        return <ComponenteCSeleccionManualConfirmar cambiarVista={setVistaActiva} />;
      default: 
        return <ComponenteInicio cambiarVista={setVistaActiva} />;
    }
  };
  
  return (

     
<PurchaseProvider>
<div className="min-h-screen w-full max-w-full text-white flex flex-col font-sans relative transition-colors duration-300 selection:bg-[var(--color-primary)] selection:text-white" style={{ '--ColorPrimary': '#f8f400', '--ColorSecondary': '#f4ef00', '--ColorBackground': '#000000FC', '--ColorSurface': '#151f3247', '--ColorText': '#ffffff', '--ColorPrimaryDark': '#f8f400', '--ColorPrimaryForeground': '#000000', 'backgroundColor': 'rgba(0,0,0,0.99)' } as React.CSSProperties}>
    <SiteThemeStyles />
    <ComponenteConsultarCTResultados
      vistaActiva={vistaActiva} 
      cambiarVista={setVistaActiva} 
    /> 
   <ComponenteConsultarCTickets
      vistaActiva={vistaActiva} 
      cambiarVista={setVistaActiva} 
    />    
  <header className="sticky top-0 z-40 w-full backdrop-blur-md border-b transition-all bg-transparent" style={{ 'background': 'transparent', 'borderColor': 'rgba(248,244,0,0.145)' }}>
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 md:h-24 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 sm:gap-4 cursor-pointer shrink-0">
        <img src="images/4.webp" alt="Logo" className="h-10 sm:h-14 md:h-20 w-auto object-contain max-w-[110px] sm:max-w-[170px] md:max-w-[260px] relative z-50 drop-shadow-sm transition-all" data-sf-original-src="https://vds-api.rifalotodo.com/uploads/file-1783467924885-117198188.webp" />
      </div>
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        <button className="flex items-center gap-1 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full font-bold text-[11px] sm:text-xs border bg-transparent transition-all hover:scale-105 active:scale-95 shadow-sm" title="Salón de la Fama - Ganadores 10PM" style={{ 'borderColor': 'rgba(255,215,0,0.45)', 'color': 'rgb(255,215,0)', 'background': 'rgba(255,215,0,0.06)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trophy fill-current shrink-0">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
          </svg>
          <span className="whitespace-nowrap">
            Salón
          </span>
        </button>
        <button className="px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-bold text-[11px] sm:text-xs md:text-sm border bg-transparent hover:bg-[var(--color-primary)]/10 flex items-center gap-1.5 group transition-all active:scale-95 shadow-sm" title="Verificar Boletos" style={{ 'borderColor': 'var(--color-primary)', 'color': 'var(--color-primary)' }}
          onClick={() => cambiarVista('cconsultarctickets')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ticket text-current shrink-0">
            <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z">
            </path>
            <path d="M13 5v2" />
            <path d="M13 17v2" />
            <path d="M13 11v2" />
          </svg>
          <span className="whitespace-nowrap">
            Mis Tickets
          </span>
        </button>
        <button className="p-1.5 sm:p-2 rounded-full bg-transparent hover:bg-slate-800/40 hover:text-white transition-all active:scale-95 border" title="Acceso Administrativo" style={{ 'borderColor': 'var(--color-secondary)', 'color': 'var(--color-secondary)' }}
          onClick={() => cambiarVista('accessadmin')}
         >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield">
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z">
            </path>
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
                background:
                  "linear-gradient(to bottom,#072f0408,#072f0408,var(--color-background,#020617))"
              }}
            ></div>
          </div>
          
          <div className="relative z-10">

            
    
              <ComponenteFichaRifa
                vistaActiva={vistaActiva} 
                cambiarVista={setVistaActiva} 
              />
              
              {/* seccion a modular con componentes */}
              {renderizarInterfaz()}
              {/* FIN seccion a modular con componentes */}
              
          
    
          </div>
        </div>
      </div>
    

      
      
      {/* Top Compradores (gestionado desde el panel admin: /admin/top) */}
      <ComponenteTopCompradores />

      {/* Últimas Rifas */}
      <ComponenteUltimasRifas />
      </div>
    
  </main>
  
    
    
  <footer className="bg-slate-950 border-t border-white/5 py-12 transition-colors duration-300 relative z-0" style={{ 'backgroundColor': 'var(--color-surface)' }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4 w-full md:w-auto">
          <img src="images/8.png" alt="Rifaplay Logo" className="h-16 md:h-20 w-auto object-contain transition-all" data-sf-original-src="https://www.ganasconlatam.com/logos/rifaplay_logo.png" />
          <p className="text-slate-300 text-sm max-w-xs text-center md:text-left">
            La plataforma más segura y
                transparente para gestionar tus sorteos y rifas online. Sistema homologado por
            <a href="#" target="_blank" rel="noreferrer" className="text-[var(--color-primary)] hover:underline font-bold">
              CONALOT
            </a>
            .
          </p>
          <div className="flex w-full md:w-auto gap-2 mt-2">
            <div className="flex flex-col items-center md:items-start gap-2 p-2 rounded-lg bg-slate-900/50 border border-slate-800 flex-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock text-[var(--color-primary)]">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="text-[10px] font-bold text-white uppercase tracking-wider text-center md:text-left leading-tight">
                Pagos
                    Seguros
              </span>
            </div>
            <div className="flex flex-col items-center md:items-start gap-2 p-2 rounded-lg bg-slate-900/50 border border-slate-800 flex-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield text-[var(--color-primary)]">
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z">
                </path>
              </svg>
              <span className="text-[10px] font-bold text-white uppercase tracking-wider text-center md:text-left leading-tight">
                SSL
                    Encriptado
              </span>
            </div>
            <div className="flex flex-col items-center md:items-start gap-2 p-2 rounded-lg bg-slate-900/50 border border-slate-800 flex-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle text-[var(--color-primary)]">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="m9 11 3 3L22 4" />
              </svg>
              <span className="text-[10px] font-bold text-white uppercase tracking-wider text-center md:text-left leading-tight">
                Verificado
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 py-6 md:py-0">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            <div className="h-12 w-12 md:h-14 md:w-14 overflow-hidden rounded-lg hover:scale-105 transition-transform duration-300 shrink-0">
              <img src="/images/legal-logos.png" alt="CONALOT - Comisión Nacional de Lotería" className="h-full w-full object-cover object-left" />
            </div>
            <div className="h-12 w-12 md:h-14 md:w-14 overflow-hidden rounded-lg hover:scale-105 transition-transform duration-300 shrink-0">
              <img src="/images/legal-logos.png" alt="Lotería del Táchira" className="h-full w-full object-cover object-right" />
            </div>
            <img src="images/11.png" alt="SUPERGANA" className="h-8 md:h-12 object-contain hover:scale-105 transition-transform duration-300" data-sf-original-src="https://www.ganasconlatam.com/logos/SUPERGANA.png" />
          </div>
        </div>
        <FooterSocials />
      </div>
      <div className="mt-8 pt-8 border-t border-slate-800/50 text-center text-slate-400 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2">
          <p>
            © 2025 Global Tech 11-11 C.A. Todos los derechos reservados.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="hover:text-white transition-colors cursor-pointer text-xs">
            Términos y
                Condiciones
          </button>
          <a href="#" className="hover:text-white transition-colors text-xs">
            Política de
                Privacidad
          </a>
        </div>
      </div>
    </div>
  </footer>
  <FloatingSupport />
</div>
  
  
    </PurchaseProvider>
  );
}
