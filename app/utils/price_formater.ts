export const price_formater = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  }).format(price);
