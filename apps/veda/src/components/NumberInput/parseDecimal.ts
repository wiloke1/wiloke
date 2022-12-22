export function parseDecimal(num: number, to = 2) {
  return parseFloat(num.toFixed(to));
}
