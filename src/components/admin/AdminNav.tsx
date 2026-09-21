"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/rifas", label: "Rifas" },
  { href: "/admin/boletos", label: "Boletos por aprobar" },
  { href: "/admin/participantes", label: "Participantes" },
  { href: "/admin/metodos-pago", label: "Métodos de pago" },
  { href: "/admin/top", label: "Top 3 de compras" },
  { href: "/admin/configuracion", label: "Configuración global" },
  { href: "/admin/usuarios", label: "Usuarios administrativos" },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1">
      {items.map((it) => {
        const active = it.exact
          ? pathname === it.href
          : pathname === it.href || pathname.startsWith(it.href + "/");
        return (
          <Link
            key={it.href}
            href={it.href}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-[#f8f400] text-slate-900"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
