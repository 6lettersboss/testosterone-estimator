
import React, { useState } from 'react';
import { estimateTestosterone } from '../utils/algorithm';

export default function Home() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    age: 30,
    height: 170,
    weight: 70,
    diabetes: false,
    sleepApnea: false,
    hypertension: false,
    liverKidney: false,
    thyroid: false,
    glucocorticoids: false,
    opioids: false,
    antifungal: false,
    spironolactone: false,
    cimetidine: false,
    clomiphene: false,
    hcg: false,
    antiestrogen: false,
    alcohol: false,
    exercise: false,
    sleepHours: 6,
    stepCount: 3000,
    intenseWorkout: true
  });

  const [result, setResult] = useState<number | null>(null);
  const [percent, setPercent] = useState<number | null>(null);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    const value = estimateTestosterone(form);
    setResult(value);
    setPercent(((value - 500) / 500) * 100);
  };

  return (
    <div style={{ padding: 30, maxWidth: 800, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>6Letters 테스토스테론 측정</h1>
      <input placeholder="이름" name="name" value={form.name} onChange={handleChange} />
      <input placeholder="이메일" name="email" value={form.email} onChange={handleChange} />
      <input type="number" name="age" placeholder="나이" value={form.age} onChange={handleChange} />
      <input type="number" name="height" placeholder="키(cm)" value={form.height} onChange={handleChange} />
      <input type="number" name="weight" placeholder="몸무게(kg)" value={form.weight} onChange={handleChange} />
      <br /><br />
      <label><input type="checkbox" name="diabetes" checked={form.diabetes} onChange={handleChange}/> 당뇨</label>
      <label><input type="checkbox" name="sleepApnea" checked={form.sleepApnea} onChange={handleChange}/> 수면무호흡증</label>
      <label><input type="checkbox" name="hypertension" checked={form.hypertension} onChange={handleChange}/> 고혈압</label>
      <label><input type="checkbox" name="liverKidney" checked={form.liverKidney} onChange={handleChange}/> 간/신장 질환</label>
      <label><input type="checkbox" name="thyroid" checked={form.thyroid} onChange={handleChange}/> 갑상선 기능 저하</label>
      <br />
      <label><input type="checkbox" name="glucocorticoids" checked={form.glucocorticoids} onChange={handleChange}/> 글루코코르티코이드</label>
      <label><input type="checkbox" name="opioids" checked={form.opioids} onChange={handleChange}/> 오피오이드</label>
      <label><input type="checkbox" name="antifungal" checked={form.antifungal} onChange={handleChange}/> 항진균제</label>
      <label><input type="checkbox" name="spironolactone" checked={form.spironolactone} onChange={handleChange}/> 스피로놀락톤</label>
      <label><input type="checkbox" name="cimetidine" checked={form.cimetidine} onChange={handleChange}/> 시메티딘</label>
      <label><input type="checkbox" name="clomiphene" checked={form.clomiphene} onChange={handleChange}/> 클로미펜</label>
      <label><input type="checkbox" name="hcg" checked={form.hcg} onChange={handleChange}/> hCG</label>
      <label><input type="checkbox" name="antiestrogen" checked={form.antiestrogen} onChange={handleChange}/> 항에스트로겐</label>
      <label><input type="checkbox" name="alcohol" checked={form.alcohol} onChange={handleChange}/> 만성 음주</label>
      <label><input type="checkbox" name="exercise" checked={form.exercise} onChange={handleChange}/> 운동</label>
      <br /><br />
      <button onClick={handleSubmit}>테스토스테론 계산</button>
      {result && (
        <div>
          <p>예상 테스토스테론 수치: {result.toFixed(1)} ng/dL</p>
          <p>기저치 대비 변화: {percent?.toFixed(1)}%</p>
        </div>
      )}
    </div>
  );
}
