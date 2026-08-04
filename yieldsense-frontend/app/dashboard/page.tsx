"use client";

import Sidebar from "../components/Sidebar";
import YieldTrendChart from "../components/YieldTrendChart";
import SeasonalBarChart from "../components/SeasonalBarChart";
import RiskCard from "../components/RiskCard";
import RecommendationCard from "../components/RecommendationCard";
import DownloadReportButton from "../components/DownloadReportButton";

export default function DashboardPage() {
  const recommendations = [
    "Apply agricultural lime to improve soil pH.",
    "Increase nitrogen fertilizer.",
    "Use drip irrigation.",
    "Monitor weather updates.",
  ];

  return (
    <>
      <Sidebar />

      <main
        style={{
          marginLeft: "240px",
          padding: "30px",
          minHeight: "100vh",
          background: "#f5f7fa",
          boxSizing: "border-box",
        }}
      >
        <h1 style={{ color: "#2E7D32" }}>
          🌾 YieldSense AI Dashboard
        </h1>

        <p style={{ color: "#666", marginBottom: "20px" }}>
          Welcome to your analytics dashboard.
        </p>

        <DownloadReportButton />

        <div style={{ marginTop: "20px" }}>
          <YieldTrendChart />
        </div>

        <div style={{ marginTop: "20px" }}>
          <SeasonalBarChart />
        </div>

        <div style={{ marginTop: "20px" }}>
          <RiskCard level="High" />
        </div>

        <div style={{ marginTop: "20px" }}>
          <RecommendationCard recommendations={recommendations} />
        </div>
      </main>
    </>
  );
}