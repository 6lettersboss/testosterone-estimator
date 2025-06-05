
import React, { useState } from 'react';
import { calculateTestosterone } from '../utils/algorithm';

export default function Home() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [consent, setConsent] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const handleSubmit = () => {
    if (!email || !name || !consent) {
      alert('이름, 이메일, 개인정보 동의가 필요합니다.');
      return;
    }
    const input = { exercise: true, sleepApnea: false, clomiphene: true }; // 예시 입력
    const value = calculateTestosterone(input);
    setResult(value);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 40 }}>
      <h1>6Letters 테스토스테론 측정</h1>
      <input
        type="text"
        placeholder="이름 입력"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: 10, marginBottom: 10, display: 'block' }}
      />
      <input
        type="email"
        placeholder="이메일 입력"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: 10, marginBottom: 10, display: 'block' }}
      />
      <label>
        <input
          type="checkbox"
          checked={consent}
          onChange={() => setConsent(!consent)}
        />
        개인정보 활용 및 이메일 수신에 동의합니다
      </label>
      <button onClick={handleSubmit} style={{ marginTop: 10 }}>
        테스토스테론 측정하기
      </button>
      {result !== null && (
        <>
          <p>예상 테스토스테론 수치: {result.toFixed(2)} ng/dL</p>
          <p>기저치(500ng/dL) 대비: {((result - 500) / 500 * 100).toFixed(1)}% 입니다.</p>
        </>
      )}
    </div>
  );
}
