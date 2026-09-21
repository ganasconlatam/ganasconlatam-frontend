import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getConfig } from "@/app/admin/_actions/config";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [
    rifasActivas,
    rifasProximas,
    rifasFinalizadas,
    pendientes,
    participantes,
    config,
  ] = await Promise.all([
    prisma.raffle.count({ where: { status: "ACTIVA" } }),
    prisma.raffle.count({ where: { status: "PROXIMA" } }),
    prisma.raffle.count({ where: { status: "FINALIZADA" } }),
    prisma.ticketOrder.count({ where: { status: "PENDIENTE" } }),
    prisma.participant.count(),
    getConfig(),
  ]);

  const cards = [
    { label: "Rifas activas", value: rifasActivas, href: "/admin/rifas" },
    { label: "Rifas próximas", value: rifasProximas, href: "/admin/rifas" },
    { label: "Rifas finalizadas", value: rifasFinalizadas, href: "/admin/rifas" },
    { label: "Boletos por aprobar", value: pendientes, href: "/admin/boletos" },
    { label: "Participantes", value: participantes, href: "/admin/participantes" },
    { label: "Tasa del dólar (Bs)", value: config.dollarRate, href: "/admin/configuracion" },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-slate-400">Resumen general del sistema de rifas.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 hover:border-[#f8f400]/60 transition-colors"
          >
            <p className="text-sm text-slate-400">{c.label}</p>
            <p className="mt-2 text-3xl font-bold text-white">{c.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
