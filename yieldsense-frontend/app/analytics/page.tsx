"use client";

import { useState } from "react";

export default function AnalyticsPage() {
  const [result, setResult] = useState<any>(null);

  async function getRecommendations() {
    const response = await fetch(
      "http://127.0.0.1:8000/api/v1/analytics/recommendations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          crop_type: "Rice",
          avg_temp: 36,
          rainfall: 250,
          soil_ph: 5.5,
          nitrogen: 30,
          phosphorus: 20,
          potassium: 25,
        }),
      }
    );

    const data = await response.json();
    setResult(data);
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>🌾 AI Recommendation Dashboard</h1>

      <button
        onClick={getRecommendations}
        style={{
          padding: "12px 25px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Generate Recommendation
      </button>

      {result && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "12px",
          }}
        >
          <h2>Overall Risk</h2>

          <h3>{result.overall_risk_level}</h3>

          <h2>Recommendations</h2>

          <ul>
            {result.actionable_recommendations.map(
              (item: string, index: number) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>

          <h2>Risk Alerts</h2>

          <ul>
            {result.identified_risks.map((risk: any, index: number) => (
              <li key={index}>
                {risk.type} - {risk.severity}
              </li>
            ))}
          </ul>

          <h2>Best Practices</h2>

          <ul>
            {result.best_practice_tips.map(
              (tip: string, index: number) => (
                <li key={index}>{tip}</li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}