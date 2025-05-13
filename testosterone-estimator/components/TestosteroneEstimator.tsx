
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function TestosteroneEstimator() {
  const [inputs, setInputs] = useState({
    age: "",
    time: "Morning",
    height: "",
    weight: "",
    exercise: "",
    hypertension: false,
    diabetes: false,
    dyslipidemia: false,
    vitaminD: false,
    zinc: false,
  });

  const [estimate, setEstimate] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputs({
      ...inputs,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const calculateTestosterone = () => {
    const agePenalty = (parseFloat(inputs.age) - 20) * 4.3;
    const base = 500 - (isNaN(agePenalty) ? 0 : agePenalty);
    const timeMultiplier = inputs.time === "Morning" ? 1.0 : 0.7;

    const heightM = parseFloat(inputs.height) / 100;
    const bmi = parseFloat(inputs.weight) / (heightM * heightM);
    const bmiPenalty = bmi > 25 ? (bmi - 25) * 2 : 0;

    const exerciseBoost = parseFloat(inputs.exercise || 0) * 2.5;
    const chronicPenalty =
      (inputs.hypertension ? 25 : 0) +
      (inputs.diabetes ? 25 : 0) +
      (inputs.dyslipidemia ? 25 : 0);
    const vitaminPenalty = inputs.vitaminD ? 30 : 0;
    const zincPenalty = inputs.zinc ? 25 : 0;

    const result =
      (base - bmiPenalty + exerciseBoost - chronicPenalty - vitaminPenalty - zincPenalty) *
      timeMultiplier;
    return Math.max(0, Math.round(result));
  };

  const handleEstimate = () => {
    const result = calculateTestosterone();
    setEstimate(result);
  };

  const averageByAge = [
    { age: 20, avg: 550 },
    { age: 30, avg: 500 },
    { age: 40, avg: 460 },
    { age: 50, avg: 420 },
    { age: 60, avg: 380 },
  ];

  return (
    <Card className="max-w-xl mx-auto p-4 space-y-6">
      <CardContent className="space-y-4">
        <h2 className="text-xl font-bold">Testosterone Estimator</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Age</Label>
            <Input name="age" value={inputs.age} onChange={handleChange} />
          </div>
          <div>
            <Label>Time of Day</Label>
            <select name="time" value={inputs.time} onChange={handleChange} className="w-full border rounded p-2">
              <option>Morning</option>
              <option>Afternoon</option>
            </select>
          </div>
          <div>
            <Label>Height (cm)</Label>
            <Input name="height" value={inputs.height} onChange={handleChange} />
          </div>
          <div>
            <Label>Weight (kg)</Label>
            <Input name="weight" value={inputs.weight} onChange={handleChange} />
          </div>
          <div>
            <Label>Exercise Frequency (per week)</Label>
            <Input name="exercise" value={inputs.exercise} onChange={handleChange} />
          </div>
          <div className="col-span-2">
            <Label className="block">Chronic Conditions</Label>
            <div className="flex flex-wrap gap-4 mt-2">
              <label><input type="checkbox" name="hypertension" checked={inputs.hypertension} onChange={handleChange} /> Hypertension</label>
              <label><input type="checkbox" name="diabetes" checked={inputs.diabetes} onChange={handleChange} /> Diabetes</label>
              <label><input type="checkbox" name="dyslipidemia" checked={inputs.dyslipidemia} onChange={handleChange} /> Dyslipidemia</label>
            </div>
          </div>
          <div className="col-span-2">
            <Label className="block">Deficiencies</Label>
            <div className="flex gap-4 mt-2">
              <label><input type="checkbox" name="vitaminD" checked={inputs.vitaminD} onChange={handleChange} /> Vitamin D</label>
              <label><input type="checkbox" name="zinc" checked={inputs.zinc} onChange={handleChange} /> Zinc</label>
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
          <Button onClick={handleEstimate}>
            Estimate Testosterone
          </Button>
        </div>

        {estimate !== null && (
          <div className="text-center mt-4 space-y-2">
            <p className="text-lg font-semibold">Estimated Testosterone: {estimate} ng/dL</p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={averageByAge}>
                <XAxis dataKey="age" label={{ value: "Age", position: "insideBottomRight", offset: -5 }} />
                <YAxis domain={[300, 600]} label={{ value: "ng/dL", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Line type="monotone" dataKey="avg" stroke="#8884d8" name="Average Testosterone" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
