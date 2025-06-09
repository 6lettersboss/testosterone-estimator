export function estimateTestosterone(input: any): number {
  let t = 500;
  if (input.age > 40) t -= 30;
  if ((input.weight / ((input.height / 100) ** 2)) > 25) t -= 20;
  if (input.exercise) t += 40;
  if (input.sleepHours >= 4) t += 10;
  if (input.steps >= 3000) t += 5;
  if (input.intenseWorkout) t += 15;
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
  return t;
}

export function getDatingType(input: any): string {
  if (input.exercise && input.intenseWorkout) return "Energizer";
  if (input.sleepHours > 6 && input.steps > 4000) return "Artist";
  if (input.age > 40 && input.weight > 75) return "Thinker";
  return "Dominant";
}

export function getDatingDescription(type: string): string {
  switch (type) {
    case "Energizer": return "활력 넘치고 적극적인 연애 스타일. 감정 표현과 에너지 레벨이 높습니다.";
    case "Artist": return "감성적이고 깊은 정서적 교감을 선호하는 창의적인 스타일입니다.";
    case "Thinker": return "분석적이고 신중한 접근을 선호하며 깊은 대화를 중시합니다.";
    case "Dominant": return "리더십이 강하고 관계에서 주도적인 역할을 맡는 스타일입니다.";
    default: return "";
  }
}