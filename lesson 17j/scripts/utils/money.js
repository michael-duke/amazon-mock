function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}

export function formatTaxCent(priceCents) {
  return (priceCents * 10) / 100;
}

export default formatCurrency;
