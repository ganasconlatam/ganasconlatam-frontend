"use client";

import { useState, useTransition } from "react";
import { ColorField } from "./ColorField";
import { updateDollarRate, updateColors, updateSocials, updatePopularTickets } from "@/app/admin/_actions/config";
import { type SocialsMap } from "@/lib/socials";

function SaveButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-[var(--admin-accent,#f8f400)] px-4 py-2 text-sm font-semibold text-black transition disabled:opacity-60"
    >
      {pending ? "Guardando..." : "Guardar"}
    </button>
  );
}

function Status({ state }: { state: "idle" | "ok" | "error" }) {
  if (state === "ok") return <span className="text-sm text-emerald-400">Guardado correctamente</span>;
  if (state === "error") return <span className="text-sm text-red-400">Ocurrió un error</span>;
  return null;
}

function useSaveAction(action: (fd: FormData) => Promise<unknown>) {
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<"idle" | "ok" | "error">("idle");
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await action(fd);
        setState("ok");
      } catch {
        setState("error");
      }
    });
  }
  return { pending, state, onSubmit };
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      {description ? <p className="mt-1 text-sm text-white/50">{description}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function DollarRateForm({ dollarRate }: { dollarRate: number }) {
  const { pending, state, onSubmit } = useSaveAction(updateDollarRate);
  return (
    <Section title="Tasa del día" description="Bolívares por dólar usados para calcular los precios.">
      <form onSubmit={onSubmit} className="flex flex-wrap items-end gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-white/70">Tasa (Bs por USD)</span>
          <input
            name="dollarRate"
            type="number"
            step="0.01"
            min="0"
            defaultValue={dollarRate}
            className="w-40 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-white/30"
          />
        </label>
        <div className="flex items-center gap-3">
          <SaveButton pending={pending} />
          <Status state={state} />
        </div>
      </form>
    </Section>
  );
}

const TICKET_PRESETS = [1, 2, 5, 10, 20, 50];

export function PopularTicketsForm({ popularTickets }: { popularTickets: number }) {
  const { pending, state, onSubmit } = useSaveAction(updatePopularTickets);
  return (
    <Section
      title="Número popular"
      description='Resalta una cantidad de boletos con la etiqueta "POPULAR" en la página principal.'
    >
      <form onSubmit={onSubmit} className="flex flex-wrap items-end gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-white/70">Cantidad destacada</span>
          <select
            name="popularTickets"
            defaultValue={String(popularTickets)}
            className="w-48 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-white/30"
          >
            <option value="0">Ninguno</option>
            {TICKET_PRESETS.map((n) => (
              <option key={n} value={String(n)}>
                {n} {n === 1 ? "boleto" : "boletos"}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-center gap-3">
          <SaveButton pending={pending} />
          <Status state={state} />
        </div>
      </form>
    </Section>
  );
}

export function ColorsForm({
  buttonColor,
  borderColor,
  frameColor,
}: {
  buttonColor: string;
  borderColor: string;
  frameColor: string;
}) {
  const { pending, state, onSubmit } = useSaveAction(updateColors);
  return (
    <Section title="Colores" description="Se aplican a botones, bordes, marcos y barra de progreso de la página web.">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <ColorField name="buttonColor" label="Botones y barra de progreso" value={buttonColor} />
          <ColorField name="borderColor" label="Bordes" value={borderColor} />
          <ColorField name="frameColor" label="Marcos / fondo de tarjetas" value={frameColor} />
        </div>
        <div className="flex items-center gap-3">
          <SaveButton pending={pending} />
          <Status state={state} />
        </div>
      </form>
    </Section>
  );
}

const SOCIAL_META: { key: keyof SocialsMap; label: string; placeholder: string; hint: string }[] = [
  {
    key: "whatsapp",
    label: "WhatsApp (comunidad)",
    placeholder: "https://chat.whatsapp.com/...",
    hint: 'Botón "Únete a nuestra comunidad de WhatsApp" en la página principal.',
  },
  {
    key: "telegram",
    label: "Telegram (soporte al cliente)",
    placeholder: "https://t.me/...",
    hint: "Botón flotante azul de soporte en la esquina inferior derecha.",
  },
  {
    key: "instagram",
    label: "Instagram",
    placeholder: "https://instagram.com/...",
    hint: "Ícono del footer.",
  },
  {
    key: "tiktok",
    label: "TikTok",
    placeholder: "https://tiktok.com/@...",
    hint: "Ícono del footer.",
  },
];

export function SocialsForm({ socials }: { socials: SocialsMap }) {
  const { pending, state, onSubmit } = useSaveAction(updateSocials);
  return (
    <Section title="Redes sociales" description="Enlaces gestionados para los botones del sitio.">
      <form onSubmit={onSubmit} className="space-y-4">
        {SOCIAL_META.map(({ key, label, placeholder, hint }) => (
          <div key={key} className="rounded-xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-medium text-white">{label}</p>
                <p className="text-xs text-white/50">{hint}</p>
              </div>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-white/70">
                <input
                  type="checkbox"
                  name={`${key}_enabled`}
                  defaultChecked={socials[key].enabled}
                  className="h-4 w-4 accent-[var(--admin-accent,#f8f400)]"
                />
                Activo
              </label>
            </div>
            <input
              name={`${key}_url`}
              type="url"
              defaultValue={socials[key].url}
              placeholder={placeholder}
              className="mt-3 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-white/30"
            />
          </div>
        ))}
        <div className="flex items-center gap-3">
          <SaveButton pending={pending} />
          <Status state={state} />
        </div>
      </form>
    </Section>
  );
}
