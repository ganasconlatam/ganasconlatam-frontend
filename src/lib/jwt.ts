import { SignJWT, jwtVerify } from "jose";

// Módulo compartido (edge-safe) para firmar/verificar el token de sesión.
// No importa next/headers, por lo que puede usarse en middleware y en el server.
const secretValue =
  process.env.AUTH_SECRET ||
  process.env.DATABASE_URL ||
  "ganasconlatam-dev-secret-change-me";

const secret = new TextEncoder().encode(secretValue);

export const SESSION_COOKIE = "gcl_admin_session";

export interface AdminSession {
  id: string;
  email: string;
  name: string;
  role: string;
}

export async function signToken(payload: AdminSession): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return {
      id: String(payload.id),
      email: String(payload.email),
      name: String(payload.name),
      role: String(payload.role),
    };
  } catch {
    return null;
  }
}
