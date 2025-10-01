export function fromCentsToDollars(num: number) {
  const total = (num / 100).toFixed(2);
  return `$${total}`;
}
