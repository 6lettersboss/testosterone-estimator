import React, { useState } from 'react';
import { estimateTestosterone, getDatingType } from '../utils/algorithm';
import jsPDF from 'jspdf';

export default function Home() {
  const [form, setForm] = useState({ name: '', email: '', age: 30, weight: 70, height: 170 });
  const [result, setResult] = useState<number | null>(null);
  const [type, setType] = useState<string | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const t = estimateTestosterone(form);
    const d = getDatingType(form);
    setResult(t);
    setType(d);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("테스토스테론 결과 리포트", 20, 20);
    doc.text(`이름: ${form.name}`, 20, 30);
    doc.text(`테스토스테론 수치: ${result} ng/dL`, 20, 40);
    doc.text(`유형: ${type}`, 20, 50);
    doc.save("testosterone_report.pdf");
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 40 }}>
      <h1>테스토스테론 측정</h1>
      <input name="name" placeholder="이름" onChange={handleChange} /><br />
      <input name="email" placeholder="이메일" onChange={handleChange} /><br />
      <input name="age" type="number" placeholder="나이" onChange={handleChange} /><br />
      <input name="height" type="number" placeholder="키(cm)" onChange={handleChange} /><br />
      <input name="weight" type="number" placeholder="몸무게(kg)" onChange={handleChange} /><br />
      <button onClick={handleSubmit}>결과 보기</button>
      {result && (
        <div>
          <p>예상 테스토스테론 수치: {result.toFixed(2)} ng/dL</p>
          <p>데이팅 유형: {type}</p>
          <button onClick={generatePDF}>PDF 다운로드</button>
        </div>
      )}
    </div>
  );
}