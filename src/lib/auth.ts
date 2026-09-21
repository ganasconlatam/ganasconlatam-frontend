import "server-only";
import { redirect } from "next/navigation";
import { getSession, type AdminSession } from "./session";

// Usar en Server Components / Server Actions del panel para exigir sesión.
export async function requireAdmin(): Promise<AdminSession> {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}
