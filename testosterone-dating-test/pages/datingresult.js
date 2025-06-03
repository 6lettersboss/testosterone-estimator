import { useRouter } from 'next/router';
import html2canvas from 'html2canvas';
import { useRef } from 'react';

export default function DatingResult() {
  const router = useRouter();
  const ref = useRef();
  const q = router.query;

  const scores = {
    dominance: parseInt(q.dominance || 0),
    emotionality: parseInt(q.emotionality || 0),
    romantic_bias: parseInt(q.romantic_bias || 0),
    conscientiousness: parseInt(q.conscientiousness || 0)
  };

  const score = Object.values(scores).reduce((a, b) => a + b, 0);
  let type = "Unknown";
  let description = "";

  if (scores.dominance >= 4 && scores.conscientiousness >= 4) {
    type = "🔥 Alpha Romantic";
    description = "열정적이고 주도적인 연애 스타일";
  } else if (scores.emotionality >= 4 && scores.romantic_bias >= 4) {
    type = "🌊 Sensitive Lover";
    description = "감정을 중시하는 따뜻한 연인형";
  } else if (scores.conscientiousness >= 4 && scores.romantic_bias <= 2) {
    type = "🧠 Rational Friend";
    description = "신중하고 논리적인 연애 스타일";
  } else if (scores.dominance >= 4 && scores.emotionality <= 2) {
    type = "🌪 Free Explorer";
    description = "즉흥적이고 자유로운 연애 스타일";
  }

  const downloadImage = () => {
    html2canvas(ref.current).then(canvas => {
      const link = document.createElement('a');
      link.download = 'dating_result.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div ref={ref} style={{ padding: 30 }}>
      <h2>Your Dating Type</h2>
      <h3>{type}</h3>
      <p>{description}</p>
      <pre>{JSON.stringify(scores, null, 2)}</pre>
      <button onClick={downloadImage} style={{ marginTop: 20 }}>Download Result</button>
    </div>
  );
}
