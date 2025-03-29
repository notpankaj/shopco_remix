export function getDiscountedPrice(price: number, discountPercent: number) {
  if (price < 0 || discountPercent < 0 || discountPercent > 100) {
    throw new Error(
      "Invalid input: Price and discount must be positive, and discount must be between 0-100."
    );
  }

  let discountAmount = (price * discountPercent) / 100;
  return price - discountAmount;
}
