import { getConfig, getSocials } from "@/app/admin/_actions/config";
import { PageHeader } from "@/components/admin/ui";
import { DollarRateForm, ColorsForm, SocialsForm } from "@/components/admin/ConfigForms";

export const dynamic = "force-dynamic";

export default async function ConfiguracionPage() {
  const [config, socials] = await Promise.all([getConfig(), getSocials()]);

  return (
    <div className="max-w-4xl space-y-6">
      <PageHeader
        title="Configuración global"
        subtitle="Cada sección se guarda de forma independiente."
      />

      <DollarRateForm dollarRate={config.dollarRate} />

      <ColorsForm
        buttonColor={config.buttonColor}
        borderColor={config.borderColor}
        frameColor={config.frameColor}
      />

      <SocialsForm socials={socials} />
    </div>
  );
}
