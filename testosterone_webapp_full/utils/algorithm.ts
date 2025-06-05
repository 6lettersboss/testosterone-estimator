
export function calculateTestosterone(input: {
  exercise: boolean;
  sleepApnea: boolean;
  clomiphene: boolean;
}): number {
  let base = 500;
  if (input.exercise) base += 40;
  if (input.sleepApnea) base -= 20;
  if (input.clomiphene) base += 50;
  return base;
}
