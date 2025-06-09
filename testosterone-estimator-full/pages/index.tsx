import React, { useState } from 'react';
import { estimateTestosterone, getDatingType, getDatingDescription } from '../utils/algorithm';
import jsPDF from 'jspdf';

export default function Home() {
  const [form, setForm] = useState({
    name: '', email: '', age: 30, height: 170, weight: 70,
    diabetes: false, sleepApnea: false, hypertension: false,
    liverKidney: false, thyroid: false,
    glucocorticoids: false, opioids: false, antifungal: false,
    spironolactone: false, cimetidine: false, clomiphene: false,
    hcg: false, antiestrogen: false,
    alcohol: false, exercise: false, sleepHours: 6, steps: 3000, intenseWorkout: true
  });

  const [result, setResult] = useState<number | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [desc, setDesc] = useState<string | null>(null);
  const [percent, setPercent] = useState<number | null>(null);

  const handleChange = (e: any) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = () => {
    const t = estimateTestosterone(form);
    const d = getDatingType(form);
    const p = ((t - 500) / 500) * 100;
    setResult(t);
    setType(d);
    setDesc(getDatingDescription(d));
    setPercent(p);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("6Letters Testosterone Report", 20, 20);
    doc.text(`Name: ${form.name}`, 20, 30);
    doc.text(`Email: ${form.email}`, 20, 40);
    doc.text(`Score: ${result} ng/dL (${percent?.toFixed(1)}%)`, 20, 50);
    doc.text(`Type: ${type}`, 20, 60);
    doc.text(desc || '', 20, 70);
    doc.save("testosterone_report.pdf");
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 40, backgroundColor: '#f4f4ff' }}>
      <h1 style={{ color: '#6633cc' }}>6Letters 테스토스테론 분석</h1>

      <section>
        <h2>개인 정보</h2>
        <input name="name" placeholder="이름" onChange={handleChange} /><br/>
        <input name="email" placeholder="이메일" onChange={handleChange} /><br/>
        <input type="number" name="age" placeholder="나이" onChange={handleChange} /><br/>
        <input type="number" name="height" placeholder="키(cm)" onChange={handleChange} /><br/>
        <input type="number" name="weight" placeholder="몸무게(kg)" onChange={handleChange} /><br/>
      </section>

      <section>
        <h2>질병 유무</h2>
        {["diabetes","sleepApnea","hypertension","liverKidney","thyroid"].map(k => (
          <label key={k}><input type="checkbox" name={k} checked={form[k]} onChange={handleChange}/> {k}</label>
        ))}
      </section>

      <section>
        <h2>약물 복용 여부</h2>
        {["glucocorticoids","opioids","antifungal","spironolactone","cimetidine","clomiphene","hcg","antiestrogen"].map(k => (
          <label key={k}><input type="checkbox" name={k} checked={form[k]} onChange={handleChange}/> {k}</label>
        ))}
      </section>

      <section>
        <h2>생활 습관</h2>
        <label>수면 시간 (시간): <input type="number" name="sleepHours" value={form.sleepHours} onChange={handleChange}/></label><br/>
        <label>걸음 수: <input type="number" name="steps" value={form.steps} onChange={handleChange}/></label><br/>
        <label><input type="checkbox" name="alcohol" checked={form.alcohol} onChange={handleChange}/> 음주</label><br/>
        <label><input type="checkbox" name="exercise" checked={form.exercise} onChange={handleChange}/> 운동</label><br/>
        <label><input type="checkbox" name="intenseWorkout" checked={form.intenseWorkout} onChange={handleChange}/> 고강도 운동</label>
      </section>

      <button onClick={handleSubmit}>테스토스테론 결과 보기</button>

      {result && (
        <div style={{ background: '#fff', padding: 20, marginTop: 20, borderRadius: 8 }}>
          <h3>예상 수치: {result.toFixed(1)} ng/dL</h3>
          <p>기저치 대비: {percent?.toFixed(1)}%</p>
          <h4>유형: {type}</h4>
          <p>{desc}</p>
          <button onClick={generatePDF}>PDF 다운로드</button>
        </div>
      )}
    </div>
  );
}