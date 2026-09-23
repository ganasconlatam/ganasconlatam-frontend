import { redirect } from "next/navigation";
import { raffleExistsByCode } from "@/app/_actions/public";
import RaffleShareApp from "@/components/RaffleShareApp";

// Página de enlace único por rifa: /rifa/CODIGO-DE-LA-RIFA
// Carga el detalle de la rifa correspondiente a ese código para poder
// compartirla individualmente por redes sociales.
export default async function RafflePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const exists = await raffleExistsByCode(code);
  if (!exists) redirect("/");

  return <RaffleShareApp code={code} />;
}
