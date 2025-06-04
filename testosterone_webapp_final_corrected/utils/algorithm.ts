
export function calculateTestosterone(input: any): number {
  let base = 500;
  base += input.exercise ? 40 : 0;
  base -= input.sleepApnea ? 20 : 0;
  base += input.clomiphene ? 50 : 0;
  return base;
}
