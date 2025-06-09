export function estimateTestosterone(input: any): number {
  let base = 500;
  if (input.age > 40) base -= 30;
  if (input.weight / ((input.height / 100) ** 2) > 25) base -= 20;
  return base;
}

export function getDatingType(input: any): string {
  if (input.age < 30) return "Energizer";
  if (input.weight < 65) return "Artist";
  if (input.height > 180) return "Dominant";
  return "Thinker";
}