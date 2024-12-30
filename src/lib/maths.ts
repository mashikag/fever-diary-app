export function roundDownToHalf(num: number, marginOfError = 0) {
  if (marginOfError >= 0.5) {
    throw new Error("Margin of error must be less than 0.5");
  }

  const floor = Math.floor(num);
  const remainder = num - floor;

  if (remainder + marginOfError >= 0.5) {
    return floor + 0.5;
  }

  return floor;
}
