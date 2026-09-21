import type { ReactNode } from "react";
import { getSession } from "@/lib/session";
import AdminNav from "@/components/admin/AdminNav";
import LogoutButton from "@/components/admin/LogoutButton";

export const metadata = {
  title: "Panel Administrativo | Ganas con Latam",
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();

  // La página de login no lleva sidebar.
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-200 flex">
      <aside className="hidden md:flex w-64 flex-col border-r border-slate-800 bg-slate-900/40 p-4 fixed inset-y-0 left-0">
        <div className="px-3 py-4">
          <p className="text-lg font-bold text-white">Ganas con Latam</p>
          <p className="text-xs text-slate-500">Panel Administrativo</p>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <AdminNav />
        </div>
        <div className="border-t border-slate-800 pt-4">
          <p className="px-3 pb-2 text-xs text-slate-500 truncate">
            {session.name} · {session.email}
          </p>
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 md:ml-64 p-4 md:p-8 min-w-0">{children}</main>
    </div>
  );
}
