"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { crop: "Rice", yield: 5200 },
  { crop: "Wheat", yield: 4600 },
  { crop: "Maize", yield: 3900 },
  { crop: "Cotton", yield: 3100 },
];

export default function SeasonalBarChart() {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        marginBottom: "20px",
      }}
    >
      <h2 style={{ color: "#2E7D32", marginBottom: "20px" }}>
        📊 Seasonal Crop Comparison
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="crop" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="yield" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}