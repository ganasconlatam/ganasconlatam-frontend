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
    <div className="w-full max-w-6xl mx-auto px-4 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 mt-8 md:mt-24">
      <div className="text-center mb-12 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[var(--color-primary)]/20 blur-[100px] rounded-full pointer-events-none"></div>
        <button className="group flex items-center gap-2 mx-auto mb-6 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all active:scale-95"
          onClick={() => cambiarVista('ctusdatos')}
          >
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
            className="lucide lucide-chevron-left text-slate-400 group-hover:text-white transition-colors"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span className="text-xs font-bold text-slate-400 group-hover:text-white uppercase tracking-wider transition-colors">
            Volver a mis datos
          </span>
        </button>
        <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-2xl">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Método de Pago
          </span>
        </h3>
        <p className="text-slate-400 max-w-lg mx-auto font-medium text-sm md:text-base leading-relaxed">
          Selecciona tu plataforma preferida y completa tu participación de
          forma segura.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="p-2 rounded-lg bg-[var(--color-primary)]/10">
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
                className="lucide lucide-credit-card text-[var(--color-primary)]"
              >
                <rect width={20} height={14} x={2} y={5} rx={2} />
                <line x1={2} x2={22} y1={10} y2={10} />
              </svg>
            </div>
            <span className="text-sm font-bold text-white uppercase tracking-wider">
              Plataformas Disponibles
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="relative group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300 overflow-hidden bg-[var(--color-primary)]/10 border-[var(--color-primary)] shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.2)]">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/0 to-[var(--color-primary)]/0 group-hover:from-[var(--color-primary)]/5 group-hover:to-transparent transition-all duration-500"></div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 relative z-10 bg-[var(--color-primary)] text-black shadow-lg shadow-[var(--color-primary)]/30">
                <img
                  src="images/5.png"
                  alt=""
                  className="w-6 h-6 object-contain"
                  data-sf-original-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3KY4mZ5kqB-pTiC2ikxWwXxu4oe5nhcYk3g&s"
                />
              </div>
              <div className="text-center relative z-10">
                <div className="text-sm font-bold leading-tight uppercase tracking-tight text-white">
                  Pago Movil
                </div>
              </div>
              <div className="absolute top-3 right-3 animate-in zoom-in">
                <div className="w-5 h-5 rounded-full bg-[var(--color-primary)] flex items-center justify-center shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={12}
                    height={12}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-check text-black"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
              </div>
            </button>
            <button className="relative group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300 overflow-hidden bg-slate-900/40 border-white/5 hover:bg-slate-800/60 hover:border-white/10 hover:shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/0 to-[var(--color-primary)]/0 group-hover:from-[var(--color-primary)]/5 group-hover:to-transparent transition-all duration-500"></div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 relative z-10 bg-slate-800 text-slate-400 group-hover:text-white">
                <img
                  src="images/6.png"
                  alt=""
                  className="w-6 h-6 object-contain"
                  data-sf-original-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0fTqprPeF46bBfctW0mBbpubIZkPGkWNLxg&s"
                />
              </div>
              <div className="text-center relative z-10">
                <div className="text-sm font-bold leading-tight uppercase tracking-tight text-slate-400 group-hover:text-white">
                  Pago móvil 2: Banco de Venezuela
                </div>
              </div>
            </button>
            <button className="relative group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300 overflow-hidden bg-slate-900/40 border-white/5 hover:bg-slate-800/60 hover:border-white/10 hover:shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/0 to-[var(--color-primary)]/0 group-hover:from-[var(--color-primary)]/5 group-hover:to-transparent transition-all duration-500"></div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 relative z-10 bg-slate-800 text-slate-400 group-hover:text-white">
                <img
                  src="images/6.png"
                  alt=""
                  className="w-6 h-6 object-contain"
                  data-sf-original-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0fTqprPeF46bBfctW0mBbpubIZkPGkWNLxg&s"
                />
              </div>
              <div className="text-center relative z-10">
                <div className="text-sm font-bold leading-tight uppercase tracking-tight text-slate-400 group-hover:text-white">
                  Transferencia Bancaria
                </div>
              </div>
            </button>
            <button className="relative group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300 overflow-hidden bg-slate-900/40 border-white/5 hover:bg-slate-800/60 hover:border-white/10 hover:shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/0 to-[var(--color-primary)]/0 group-hover:from-[var(--color-primary)]/5 group-hover:to-transparent transition-all duration-500"></div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 relative z-10 bg-slate-800 text-slate-400 group-hover:text-white">
                <img
                  src="images/5.png"
                  alt=""
                  className="w-6 h-6 object-contain"
                  data-sf-original-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3KY4mZ5kqB-pTiC2ikxWwXxu4oe5nhcYk3g&s"
                />
              </div>
              <div className="text-center relative z-10">
                <div className="text-sm font-bold leading-tight uppercase tracking-tight text-slate-400 group-hover:text-white">
                  Transferencia Bancaria
                </div>
              </div>
            </button>
            <button className="relative group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300 overflow-hidden bg-slate-900/40 border-white/5 hover:bg-slate-800/60 hover:border-white/10 hover:shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/0 to-[var(--color-primary)]/0 group-hover:from-[var(--color-primary)]/5 group-hover:to-transparent transition-all duration-500"></div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 relative z-10 bg-slate-800 text-slate-400 group-hover:text-white">
                <img
                  src="images/7.jpg"
                  alt=""
                  className="w-6 h-6 object-contain"
                  data-sf-original-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShAOAoBqv9sFFtuK5P7n1BsN8xGVFivsq41vnSEemtPA&s=10"
                />
              </div>
              <div className="text-center relative z-10">
                <div className="text-sm font-bold leading-tight uppercase tracking-tight text-slate-400 group-hover:text-white">
                  Zelle TEMPORAL
                </div>
              </div>
            </button>
            <button className="relative group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300 overflow-hidden bg-slate-900/40 border-white/5 hover:bg-slate-800/60 hover:border-white/10 hover:shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/0 to-[var(--color-primary)]/0 group-hover:from-[var(--color-primary)]/5 group-hover:to-transparent transition-all duration-500"></div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 relative z-10 bg-slate-800 text-slate-400 group-hover:text-white">
                <img
                  src="images/8.webp"
                  alt=""
                  className="w-6 h-6 object-contain"
                  data-sf-original-src="https://static.vecteezy.com/system/resources/previews/013/373/690/large_2x/binance-coin-bnb-3d-rendering-isometric-icon-free-png.png"
                />
              </div>
              <div className="text-center relative z-10">
                <div className="text-sm font-bold leading-tight uppercase tracking-tight text-slate-400 group-hover:text-white">
                  Binance
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="h-full">
            <div className="relative h-full animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-[var(--color-primary)]/30 to-purple-500/30 rounded-[2.5rem] blur-xl opacity-50"></div>
              <div className="relative h-full bg-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl flex flex-col">
                <div className="flex flex-col items-center justify-center py-8 border-b border-white/5 relative mb-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="absolute top-0 right-0">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={10}
                        height={10}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-dollar-sign"
                      >
                        <line x1={12} x2={12} y1={2} y2={22} />
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>{" "}
                      VES
                    </span>
                  </div>
                  <span className="text-[var(--color-primary)] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 animate-pulse">
                    Monto a Transferir
                  </span>
                  <div className="flex items-center gap-4 relative group cursor-pointer">
                    <div className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-[0_0_25px_rgba(255,255,255,0.1)] text-center font-mono">
                      Bs 47.481,00
                    </div>
                    <div className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
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
                        className="lucide lucide-copy text-slate-500"
                      >
                        <rect
                          width={14}
                          height={14}
                          x={8}
                          y={8}
                          rx={2}
                          ry={2}
                        />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-red-400 font-mono text-xs font-bold bg-red-500/10 px-3 py-1 rounded-lg border border-red-500/20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={12}
                      height={12}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-clock animate-pulse"
                    >
                      <circle cx={12} cy={12} r={10} />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    7:13
                  </div>
                </div>
                <div className="flex-1 space-y-4 mb-8">
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="flex items-center gap-2 mb-2">
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
                        className="lucide lucide-wallet text-[var(--color-primary)]"
                      >
                        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                      </svg>
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Datos de Transferencia
                      </span>
                    </div>
                    <div className="bg-slate-900/50 rounded-2xl p-2 border border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="relative flex flex-col justify-center p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5 overflow-hidden">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 group-hover:text-slate-300 transition-colors">
                          CEDULA
                        </span>
                        <div className="flex items-center justify-between gap-2 mt-0.5">
                          <span className="text-sm font-mono font-bold text-white truncate">
                            25145596{" "}
                          </span>
                          <div className="w-6 h-6 rounded-md flex items-center justify-center transition-all shrink-0 bg-slate-800 text-slate-400 group-hover:bg-[var(--color-primary)] group-hover:text-black">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={12}
                              height={12}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-copy"
                            >
                              <rect
                                width={14}
                                height={14}
                                x={8}
                                y={8}
                                rx={2}
                                ry={2}
                              />
                              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="relative flex flex-col justify-center p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5 overflow-hidden">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 group-hover:text-slate-300 transition-colors">
                          TLF
                        </span>
                        <div className="flex items-center justify-between gap-2 mt-0.5">
                          <span className="text-sm font-mono font-bold text-white truncate">
                            04120521773
                          </span>
                          <div className="w-6 h-6 rounded-md flex items-center justify-center transition-all shrink-0 bg-slate-800 text-slate-400 group-hover:bg-[var(--color-primary)] group-hover:text-black">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={12}
                              height={12}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-copy"
                            >
                              <rect
                                width={14}
                                height={14}
                                x={8}
                                y={8}
                                rx={2}
                                ry={2}
                              />
                              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="relative flex flex-col justify-center p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5 overflow-hidden">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 group-hover:text-slate-300 transition-colors">
                          BANCO
                        </span>
                        <div className="flex items-center justify-between gap-2 mt-0.5">
                          <span className="text-sm font-mono font-bold text-white truncate">
                            {" "}
                            Banco R4 Microfinanciero
                          </span>
                          <div className="w-6 h-6 rounded-md flex items-center justify-center transition-all shrink-0 bg-slate-800 text-slate-400 group-hover:bg-[var(--color-primary)] group-hover:text-black">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={12}
                              height={12}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-copy"
                            >
                              <rect
                                width={14}
                                height={14}
                                x={8}
                                y={8}
                                rx={2}
                                ry={2}
                              />
                              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="relative flex flex-col justify-center p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5 overflow-hidden">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 group-hover:text-slate-300 transition-colors">
                          Código
                        </span>
                        <div className="flex items-center justify-between gap-2 mt-0.5">
                          <span className="text-sm font-mono font-bold text-white truncate">
                            0169{" "}
                          </span>
                          <div className="w-6 h-6 rounded-md flex items-center justify-center transition-all shrink-0 bg-slate-800 text-slate-400 group-hover:bg-[var(--color-primary)] group-hover:text-black">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={12}
                              height={12}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-copy"
                            >
                              <rect
                                width={14}
                                height={14}
                                x={8}
                                y={8}
                                rx={2}
                                ry={2}
                              />
                              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 mb-8 animate-in fade-in">
                  <div className="flex items-center gap-2 mb-2">
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
                      className="lucide lucide-smartphone text-[var(--color-primary)]"
                    >
                      <rect width={14} height={20} x={5} y={2} rx={2} ry={2} />
                      <path d="M12 18h.01" />
                    </svg>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Tus Datos Bancarios
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="bg-slate-900 border rounded-xl px-4 py-3 transition-all border-white/10 focus-within:border-[var(--color-primary)]">
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                          Banco
                          <span className="text-rose-400">*</span>
                        </label>
                        <select className="w-full bg-transparent text-white font-bold outline-none text-sm appearance-none">
                          <option
                            value=""
                            className="bg-slate-900 text-slate-400"
                          >
                            Seleccionar...
                          </option>
                          <option
                            value="0102"
                            className="bg-slate-900"
                            selected=""
                          >
                            0102 - BANCO DE VENEZUELA
                          </option>
                          <option value="0156" className="bg-slate-900">
                            0156 - 100% BANCO
                          </option>
                          <option value="0172" className="bg-slate-900">
                            0172 - BANCAMIGA BANCO UNIVERSAL, C.A.
                          </option>
                          <option value="0114" className="bg-slate-900">
                            0114 - BANCARIBE
                          </option>
                          <option value="0171" className="bg-slate-900">
                            0171 - BANCO ACTIVO
                          </option>
                          <option value="0128" className="bg-slate-900">
                            0128 - BANCO CARONÍ
                          </option>
                          <option value="0163" className="bg-slate-900">
                            0163 - BANCO DEL TESORO
                          </option>
                          <option value="0175" className="bg-slate-900">
                            0175 - BANCO DIGITAL DE LOS TRABAJADORES
                          </option>
                          <option value="0115" className="bg-slate-900">
                            0115 - BANCO EXTERIOR
                          </option>
                          <option value="0151" className="bg-slate-900">
                            0151 - BANCO FONDO COMÚN
                          </option>
                          <option value="0105" className="bg-slate-900">
                            0105 - BANCO MERCANTIL
                          </option>
                          <option value="0191" className="bg-slate-900">
                            0191 - BANCO NACIONAL DE CRÉDITO
                          </option>
                          <option value="0138" className="bg-slate-900">
                            0138 - BANCO PLAZA
                          </option>
                          <option value="0137" className="bg-slate-900">
                            0137 - BANCO SOFITASA
                          </option>
                          <option value="0104" className="bg-slate-900">
                            0104 - BANCO VENEZOLANO DE CRÉDITO
                          </option>
                          <option value="0168" className="bg-slate-900">
                            0168 - BANCRECER
                          </option>
                          <option value="0134" className="bg-slate-900">
                            0134 - BANESCO
                          </option>
                          <option value="0177" className="bg-slate-900">
                            0177 - BANFANB
                          </option>
                          <option value="0146" className="bg-slate-900">
                            0146 - BANGENTE
                          </option>
                          <option value="0174" className="bg-slate-900">
                            0174 - BANPLUS
                          </option>
                          <option value="0108" className="bg-slate-900">
                            0108 - BBVA PROVINCIAL
                          </option>
                          <option value="0157" className="bg-slate-900">
                            0157 - DELSUR BANCO UNIVERSAL
                          </option>
                          <option value="0601" className="bg-slate-900">
                            0601 - INSTITUTO MUNICIPAL DE CRÉDITO POPULAR
                          </option>
                          <option value="0178" className="bg-slate-900">
                            0178 - N58 BANCO DIGITAL
                          </option>
                          <option value="0169" className="bg-slate-900">
                            0169 - R4 BANCO MICROFINANCIERO
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="bg-slate-900 border rounded-xl px-4 py-3 transition-all border-rose-500/90 ring-1 ring-rose-500/30 bg-rose-500/[0.04]">
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                          Cédula del Titular{" "}
                          <span className="text-rose-400">*</span>
                        </label>
                        <div className="flex gap-2">
                          <select 
                            defaultValue="V" 
                            className="bg-transparent text-white font-bold outline-none text-sm w-12 appearance-none">
                            <option className="bg-slate-900" value="V">
                              V
                            </option>
                            <option value="E" className="bg-slate-900">
                              E
                            </option>
                            <option value="J" className="bg-slate-900">
                              J
                            </option>
                            <option value="P" className="bg-slate-900">
                              P
                            </option>
                          </select>
                          <input
                            placeholder="12345678"
                            className="w-full bg-transparent text-white font-bold outline-none text-sm placeholder:text-slate-700"
                            maxLength={9}
                            defaultValue=""
                          />
                        </div>
                      </div>
                      <p className="text-[11px] font-bold text-rose-400 flex items-center gap-1 mt-1 animate-in fade-in">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={12}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-alert-circle"
                        >
                          <circle cx={12} cy={12} r={10} />
                          <line x1={12} x2={12} y1={8} y2={12} />
                          <line x1={12} x2="12.01" y1={16} y2={16} />
                        </svg>{" "}
                        Cédula del titular requerida (mín. 6 números)
                      </p>
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <div className="bg-slate-900 border rounded-xl px-4 py-3 transition-all border-rose-500/90 ring-1 ring-rose-500/30 bg-rose-500/[0.04]">
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                          Teléfono Emisor Pago Móvil{" "}
                          <span className="text-rose-400">*</span>
                        </label>
                        <input
                          placeholder="04141234567"
                          className="w-full bg-transparent text-white font-bold outline-none text-sm placeholder:text-slate-700"
                          maxLength={11}
                          defaultValue=""
                        />
                      </div>
                      <p className="text-[11px] font-bold text-rose-400 flex items-center gap-1 mt-1 animate-in fade-in">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={12}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-alert-circle"
                        >
                          <circle cx={12} cy={12} r={10} />
                          <line x1={12} x2={12} y1={8} y2={12} />
                          <line x1={12} x2="12.01" y1={16} y2={16} />
                        </svg>{" "}
                        Teléfono emisor obligatorio (11 dígitos)
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 mb-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="space-y-1">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/20 to-purple-500/20 blur opacity-0 focus-within:opacity-100 transition-opacity rounded-xl"></div>
                      <div className="relative bg-slate-900 border-2 rounded-xl flex items-center transition-all border-rose-500/90 ring-1 ring-rose-500/30 bg-rose-500/[0.04]">
                        <span className="pl-4 text-slate-500 font-mono text-lg">
                          #
                        </span>
                        <input
                          maxLength={6}
                          className="w-full bg-transparent text-white font-black font-mono text-lg tracking-widest outline-none px-4 py-4 uppercase placeholder:text-slate-400 placeholder:font-sans placeholder:tracking-normal placeholder:font-medium placeholder:text-xs"
                          placeholder="ÚLTIMOS 6 DÍGITOS"
                          defaultValue=""
                        />
                        <button className="mr-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-bold text-white uppercase tracking-wider transition-colors shrink-0">
                          Pegar
                        </button>
                      </div>
                    </div>
                    <p className="text-[11px] font-bold text-rose-400 flex items-center gap-1 mt-1 animate-in fade-in">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={12}
                        height={12}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-alert-circle"
                      >
                        <circle cx={12} cy={12} r={10} />
                        <line x1={12} x2={12} y1={8} y2={12} />
                        <line x1={12} x2="12.01" y1={16} y2={16} />
                      </svg>{" "}
                      Ingresa los 6 dígitos de la referencia
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="mb-1">
                      <label className="text-xs font-bold text-white/80 flex items-center gap-1">
                        <span>Comprobante de Pago</span>
                      </label>
                    </div>
                    <div className="relative overflow-hidden group border-2 border-dashed rounded-xl p-4 flex flex-col md:flex-row items-center justify-center gap-4 cursor-pointer transition-all border-slate-800 hover:border-[var(--color-primary)]/50 bg-slate-900/30">
                      <input
                        id="comprobante-upload"
                        type="file"
                        className="hidden sf-hidden"
                        accept="image/*"
                        defaultValue=""
                      />
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
                        className="lucide lucide-upload-cloud text-slate-500 group-hover:text-[var(--color-primary)] transition-colors shrink-0"
                      >
                        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                        <path d="M12 12v9" />
                        <path d="m16 16-4-4-4 4" />
                      </svg>
                      <span className="text-xs font-bold text-slate-400 group-hover:text-white uppercase tracking-widest transition-colors text-center">
                        Adjuntar Comprobante{" "}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-auto pt-6 border-t border-white/5 flex flex-row items-center gap-4">
                  <button className="py-4 px-6 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white font-bold text-sm uppercase tracking-wide rounded-xl transition-all flex items-center justify-center border border-white/5 disabled:opacity-50 active:scale-95 shrink-0"
                    onClick={() => cambiarVista('ctusdatos')}
                   >
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
                      className="lucide lucide-chevron-left"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                    <span className="ml-2 hidden sm:inline sf-hidden">
                      Volver
                    </span>
                  </button>
                  <button className="flex-1 py-4 rounded-xl font-black text-lg md:text-xl uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl transition-all bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.3)] hover:scale-[1.02] active:scale-95"
                    onClick={() => cambiarVista('cpagoenrevision')}
                    >
                    <span>Confirmar</span>
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
                      className="lucide lucide-arrow-right"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}
