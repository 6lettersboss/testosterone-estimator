
import React, { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const handleSubmit = () => {
    if (!consent) {
      alert("개인정보 수집에 동의해주세요.");
      return;
    }
    const base = 500;
    const modifiers = 90;
    const testosterone = base + modifiers;
    setResult(testosterone);
  };

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>6Letters 테스토스테론 측정</h1>
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: 10, marginBottom: 10, display: "block" }}
      />
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: 10, marginBottom: 10, display: "block" }}
      />
      <label>
        <input
          type="checkbox"
          checked={consent}
          onChange={() => setConsent(!consent)}
        />{" "}
        개인정보 활용 및 이메일 수신에 동의합니다
      </label>
      <button onClick={handleSubmit} style={{ marginTop: 10 }}>
        테스토스테론 측정하기
      </button>
      {result && (
        <p>
          예상 테스토스테론 수치: {result.toFixed(2)} ng/dL<br />
          기저치(500ng/dL) 대비: {(((result - 500) / 500) * 100).toFixed(1)}%
          입니다.
        </p>
      )}
    </div>
  );
}
