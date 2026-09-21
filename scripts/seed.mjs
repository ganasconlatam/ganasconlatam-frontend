import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Admin por defecto
  const email = "admin@ganasconlatam.com";
  const password = "admin123";
  const hash = await bcrypt.hash(password, 10);
  await prisma.admin.upsert({
    where: { email },
    update: {},
    create: { email, password: hash, name: "Administrador", role: "superadmin" },
  });
  console.log("Admin listo:", email, "/", password);

  // Configuración global (fila única id=1)
  await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      dollarRate: 40,
      buttonColor: "#f8f400",
      borderColor: "#f8f400",
      frameColor: "#151f32",
    },
  });

  // Métodos de pago
  const countPM = await prisma.paymentMethod.count();
  if (countPM === 0) {
    await prisma.paymentMethod.createMany({
      data: [
        { name: "Pago Móvil", type: "pagomovil", details: "Banco: 0102 | Tel: 0414-0000000 | CI: V-00000000", order: 1 },
        { name: "Zelle", type: "zelle", details: "correo@ejemplo.com", order: 2 },
        { name: "Binance", type: "binance", details: "correo@ejemplo.com", order: 3 },
      ],
    });
  }

  // Redes sociales
  const countSocial = await prisma.socialLink.count();
  if (countSocial === 0) {
    await prisma.socialLink.createMany({
      data: [
        { platform: "whatsapp", url: "https://wa.me/000000000", order: 1 },
        { platform: "instagram", url: "https://instagram.com/", order: 2 },
        { platform: "facebook", url: "https://facebook.com/", order: 3 },
        { platform: "tiktok", url: "https://tiktok.com/", enabled: false, order: 4 },
      ],
    });
  }

  // Rifas iniciales (migradas del contenido estático)
  const countRaffles = await prisma.raffle.count();
  if (countRaffles === 0) {
    await prisma.raffle.createMany({
      data: [
        {
          code: "CNL-AUT-RF-2026-000861",
          title: "Jac Arena 2027 + iPhone 17 Pro Max",
          details: "Gran sorteo de un Jac Arena 2027 más un iPhone 17 Pro Max.",
          imageUrl: "/images/6.webp",
          priceUsd: 2,
          progress: 82,
          totalTickets: 1000,
          drawDate: "2026-09-10",
          drawTime: "21:59",
          status: "FINALIZADA",
          winnerTicket: "0472",
        },
        {
          code: "CNL-AUT-RF-2026-245690",
          title: "Ganate 15.000 lechugas por tan solo 2299 BS!",
          details: "Sorteo especial de 15.000 en efectivo.",
          imageUrl: "/images/6.webp",
          priceUsd: 1.5,
          progress: 97.93,
          totalTickets: 1000,
          drawDate: "2026-09-07",
          drawTime: "21:59",
          status: "FINALIZADA",
        },
        {
          code: "CNL-AUT-RF-2026-000792",
          title: "Combo Meru + 3.000 lechugas por tan solo 3799 BS!",
          details: "Combo Meru más 3.000 en efectivo.",
          imageUrl: "/images/7.webp",
          priceUsd: 3,
          progress: 89.31,
          totalTickets: 1000,
          drawDate: "2026-09-05",
          drawTime: "21:59",
          status: "ACTIVA",
        },
      ],
    });
  }

  // Top 3 de compras
  const countTop = await prisma.topPurchase.count();
  if (countTop === 0) {
    await prisma.topPurchase.createMany({
      data: [
        { position: 1, name: "Carlos R.", detail: "120 boletos", amount: 240 },
        { position: 2, name: "María G.", detail: "85 boletos", amount: 170 },
        { position: 3, name: "José P.", detail: "60 boletos", amount: 120 },
      ],
    });
  }

  console.log("Seed completado.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
