import "server-only";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  signToken,
  verifyToken,
  type AdminSession,
} from "./jwt";

export type { AdminSession };
export { SESSION_COOKIE };

export async function createSession(payload: AdminSession) {
  const token = await signToken(payload);
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    // El preview de v0 corre dentro de un iframe cross-site: sameSite none + secure
    sameSite: process.env.NODE_ENV === "development" ? "none" : "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function getSession(): Promise<AdminSession | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifyToken(token);
}
