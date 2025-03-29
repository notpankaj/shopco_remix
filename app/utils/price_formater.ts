export const price_formater = (price: number) => {
  if (typeof price === "number" && !isNaN(price)) {
    return new Intl.NumberFormat("en-IN", {
      maximumSignificantDigits: 3,
    }).format(price);
  }
  return null;
};
