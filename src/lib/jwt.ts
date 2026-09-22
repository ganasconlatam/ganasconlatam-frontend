import { SignJWT, jwtVerify } from "jose";

// Módulo compartido (edge-safe) para firmar/verificar el token de sesión.
// No importa next/headers, por lo que puede usarse en middleware y en el server.
// Secreto dedicado para firmar sesiones. NUNCA reutilizar DATABASE_URL
// (filtraría credenciales de BD al material del token) ni un literal en producción.
const secretValue =
  process.env.AUTH_SECRET ||
  process.env.BETTER_AUTH_SECRET ||
  (process.env.NODE_ENV === "production"
    ? ""
    : "ganasconlatam-dev-only-insecure-secret");

if (!secretValue) {
  throw new Error(
    "AUTH_SECRET no está configurado. Genera uno con `openssl rand -base64 32` y añádelo a las variables de entorno del proyecto.",
  );
}

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
