// Calcula el precio en bolívares a partir del precio USD y la tasa del día.
export function usdToBs(priceUsd: number, dollarRate: number): number {
  return Math.round(priceUsd * dollarRate * 100) / 100;
}

export function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function formatBs(value: number): string {
  return (
    new Intl.NumberFormat("es-VE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value) + " Bs"
  );
}
