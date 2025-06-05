import React, { useState } from 'react';
import { estimateTestosterone } from '../utils/algorithm';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [change, setChange] = useState<number | null>(null);

  const handleSubmit = () => {
    if (!name || !email || !consent) {
      alert('모든 정보를 입력하고 동의해야 합니다.');
      return;
    }

    const value = estimateTestosterone({
      sex: 'M',
      age: 30,
      height: 176,
      weight: 74,
      baseTestosterone: 500,
      diabetes: true,
      sleepApnea: true,
      hypertension: false,
      liverKidneyDisease: false,
      thyroid: false,
      glucocorticoids: false,
      opioids: false,
      antifungal: false,
      spironolactone: false,
      cimetidine: false,
      clomiphene: true,
      hcg: false,
      antiestrogen: false,
      alcohol: false,
      exercise: true,
      sleepHours: 4.5,
      sleepConsistency: 4,
      stepsPerDay: 3000,
      activeDays: 3,
      moderateExerciseHours: 2,
      intenseExerciseSessions: 1,
      aerobicConsistency: true
    });

    setResult(value);
    setChange(((value - 500) / 500) * 100);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 40 }}>
      <h1>6Letters 테스토스테론 측정</h1>
      <input placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} /><br />
      <input placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
      <label>
        <input type="checkbox" checked={consent} onChange={() => setConsent(!consent)} />
        개인정보 활용 및 이메일 수신에 동의합니다
      </label>
      <button onClick={handleSubmit}>테스토스테론 측정하기</button>
      {result && (
        <>
          <p>예상 테스토스테론 수치: {result.toFixed(2)} ng/dL</p>
          <p>기저치(500ng/dL) 대비: {change?.toFixed(1)}% 입니다.</p>
        </>
      )}
    </div>
  );
}