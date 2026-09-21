import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";

export async function POST(req: Request) {
  const { email, password } = await req.json().catch(() => ({}));

  if (!email || !password) {
    return NextResponse.json(
      { error: "Correo y contraseña son requeridos" },
      { status: 400 }
    );
  }

  const admin = await prisma.admin.findUnique({
    where: { email: String(email).toLowerCase().trim() },
  });

  if (!admin || !(await bcrypt.compare(String(password), admin.password))) {
    return NextResponse.json(
      { error: "Credenciales inválidas" },
      { status: 401 }
    );
  }

  await createSession({
    id: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
  });

  return NextResponse.json({ ok: true });
}
