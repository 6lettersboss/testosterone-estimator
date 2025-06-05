
export function estimateTestosterone(input: any): number {
  let t = 500;
  if (input.diabetes) t -= 60;
  if (input.sleepApnea) t -= 20;
  if (input.hypertension) t -= 10;
  if (input.liverKidney) t -= 25;
  if (input.thyroid) t -= 20;
  if (input.glucocorticoids) t -= 50;
  if (input.opioids) t -= 40;
  if (input.antifungal) t -= 40;
  if (input.spironolactone) t -= 30;
  if (input.cimetidine) t -= 20;
  if (input.clomiphene) t += 50;
  if (input.hcg) t += 50;
  if (input.antiestrogen) t += 35;
  if (input.alcohol) t -= 30;
  if (input.exercise) t += 40;
  if (input.sleepHours >= 4) t += 10;
  if (input.stepCount >= 3000) t += 5;
  if (input.intenseWorkout) t += 15;
  return t;
}
