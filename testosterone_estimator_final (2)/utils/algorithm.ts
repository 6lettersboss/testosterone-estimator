type Input = {
  sex: 'M' | 'F',
  age: number,
  height: number,
  weight: number,
  baseTestosterone: number,
  diabetes: boolean,
  sleepApnea: boolean,
  hypertension: boolean,
  liverKidneyDisease: boolean,
  thyroid: boolean,
  glucocorticoids: boolean,
  opioids: boolean,
  antifungal: boolean,
  spironolactone: boolean,
  cimetidine: boolean,
  clomiphene: boolean,
  hcg: boolean,
  antiestrogen: boolean,
  alcohol: boolean,
  exercise: boolean,
  sleepHours: number,
  sleepConsistency: number,
  stepsPerDay: number,
  activeDays: number,
  moderateExerciseHours: number,
  intenseExerciseSessions: number,
  aerobicConsistency: boolean
};

export function estimateTestosterone(input: Input): number {
  let result = input.baseTestosterone;

  if (input.diabetes) result -= 60;
  if (input.sleepApnea) result -= 20;
  if (input.hypertension) result -= 10;
  if (input.liverKidneyDisease) result -= 25;
  if (input.thyroid) result -= 20;
  if (input.glucocorticoids) result -= 50;
  if (input.opioids) result -= 40;
  if (input.antifungal) result -= 40;
  if (input.spironolactone) result -= 30;
  if (input.cimetidine) result -= 20;
  if (input.clomiphene) result += 50;
  if (input.hcg) result += 50;
  if (input.antiestrogen) result += 35;
  if (input.alcohol) result -= 30;
  if (input.exercise) result += 40;

  if (input.sleepHours >= 4) result += 10;
  if (input.sleepConsistency >= 4) result += 10;
  if (input.stepsPerDay >= 3000) result += 5;
  if (input.activeDays < 3) result -= 5;
  if (input.moderateExerciseHours >= 2) result += 10;
  if (input.intenseExerciseSessions >= 1) result += 15;
  if (input.aerobicConsistency) result += 5;

  return result;
}