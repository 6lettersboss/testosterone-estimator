import { useRouter } from 'next/router';
import { useState } from 'react';

export default function DatingTest() {
  const [form, setForm] = useState({
    dominance: 3,
    emotionality: 3,
    romantic_bias: 3,
    conscientiousness: 3
  });
  const router = useRouter();

  const handleChange = e => setForm({ ...form, [e.target.name]: parseInt(e.target.value) });

  const handleSubmit = () => {
    const params = new URLSearchParams(form).toString();
    router.push('/datingresult?' + params);
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Answer 4 Questions</h2>
      {[
        { label: "첫 만남에서 주도적인가요?", name: "dominance" },
        { label: "감정 표현이 풍부한가요?", name: "emotionality" },
        { label: "연애에서 감정이 더 중요하다고 생각하나요?", name: "romantic_bias" },
        { label: "관계를 시작할 때 신중한 편인가요?", name: "conscientiousness" }
      ].map((q, idx) => (
        <div key={idx}>
          <p>{q.label}</p>
          <input type="range" min="1" max="5" name={q.name} value={form[q.name]} onChange={handleChange} />
          <span style={{ marginLeft: 10 }}>{form[q.name]}</span>
        </div>
      ))}
      <button onClick={handleSubmit} style={{ marginTop: 20 }}>See Result</button>
    </div>
  );
}
