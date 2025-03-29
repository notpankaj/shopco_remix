export const price_formater = (price: number) => {
  if (typeof price === "number" && !isNaN(price)) {
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  }
  return null;
};
