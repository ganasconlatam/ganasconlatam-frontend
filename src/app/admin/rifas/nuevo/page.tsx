import { createRaffle } from "@/app/admin/_actions/raffles";
import { getConfig } from "@/app/admin/_actions/config";
import { PageHeader, Card } from "@/components/admin/ui";
import RaffleForm from "@/components/admin/RaffleForm";

export const dynamic = "force-dynamic";

export default async function NuevaRifaPage() {
  const config = await getConfig();
  return (
    <div className="max-w-3xl">
      <PageHeader title="Nueva rifa" subtitle="Crea un nuevo sorteo." />
      <Card>
        <RaffleForm action={createRaffle} dollarRate={config.dollarRate} />
      </Card>
    </div>
  );
}
