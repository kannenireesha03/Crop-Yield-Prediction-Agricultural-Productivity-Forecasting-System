"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { year: "2022", yield: 3800 },
  { year: "2023", yield: 4200 },
  { year: "2024", yield: 4700 },
  { year: "2025", yield: 5100 },
];

export default function YieldTrendChart() {
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
        📈 Yield Trend Analysis
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="yield"
            stroke="#2E7D32"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}