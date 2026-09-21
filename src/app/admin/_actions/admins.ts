"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function getAdmins() {
  return prisma.admin.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });
}

export async function createAdmin(formData: FormData) {
  await requireAdmin();
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const password = String(formData.get("password") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "admin");

  if (!email || !password) return { error: "Correo y contraseña requeridos" };

  const exists = await prisma.admin.findUnique({ where: { email } });
  if (exists) return { error: "Ya existe un usuario con ese correo" };

  await prisma.admin.create({
    data: { email, password: await bcrypt.hash(password, 10), name, role },
  });
  revalidatePath("/admin/usuarios");
  return { ok: true };
}

export async function updateAdmin(id: string, formData: FormData) {
  await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "admin");
  const password = String(formData.get("password") ?? "");

  const data: { name: string; role: string; password?: string } = { name, role };
  if (password) data.password = await bcrypt.hash(password, 10);

  await prisma.admin.update({ where: { id }, data });
  revalidatePath("/admin/usuarios");
  return { ok: true };
}

export async function deleteAdmin(id: string) {
  await requireAdmin();
  const count = await prisma.admin.count();
  if (count <= 1) return { error: "Debe existir al menos un administrador" };
  await prisma.admin.delete({ where: { id } });
  revalidatePath("/admin/usuarios");
  return { ok: true };
}
