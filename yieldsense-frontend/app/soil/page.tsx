"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import SoilCard from "../components/SoilCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

interface Soil {
  soil_health: string;
  ph: string;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  moisture: string;
}

export default function SoilPage() {
  const [soil, setSoil] = useState<Soil | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSoil();
  }, []);

  async function loadSoil() {
    setLoading(true);
    setError("");

    try {
      console.log("Fetching soil data...");

      const response = await fetch("http://127.0.0.1:8000/soil", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      console.log("Status:", response.status);

      if (!response.ok) {
        throw new Error("Server returned " + response.status);
      }

      const data = await response.json();

      console.log("Soil Data:", data);

      setSoil(data);
    } catch (err: any) {
      console.error("Fetch Error:", err);
      setError(err.message || "Unable to load soil data.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loading />;

  return (
    <>
      <Sidebar />

      <div
        style={{
          marginLeft: "260px",
          padding: "30px",
          background: "#f4f6f8",
          minHeight: "100vh",
        }}
      >
        <h1
          style={{
            color: "#2E7D32",
            marginBottom: "10px",
          }}
        >
          🌱 Soil Health Analysis
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Monitor soil quality for better crop productivity.
        </p>

        {error && <ErrorMessage message={error} />}

        {soil && (
          <>
            <SoilCard soil={soil} />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                gap: "20px",
                marginTop: "30px",
              }}
            >
              <InfoCard
                title="🧪 Soil pH"
                value={soil.ph}
                color="#43A047"
              />

              <InfoCard
                title="🌿 Nitrogen"
                value={soil.nitrogen}
                color="#1976D2"
              />

              <InfoCard
                title="🌾 Phosphorus"
                value={soil.phosphorus}
                color="#FB8C00"
              />

              <InfoCard
                title="🍃 Potassium"
                value={soil.potassium}
                color="#8E24AA"
              />

              <InfoCard
                title="💧 Moisture"
                value={soil.moisture}
                color="#00ACC1"
              />
            </div>
          </>
        )}

        <button
          onClick={loadSoil}
          style={{
            marginTop: "30px",
            padding: "12px 25px",
            background: "#2E7D32",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          🔄 Refresh Soil Data
        </button>
      </div>
    </>
  );
}

function InfoCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ color }}>{title}</h3>

      <h2
        style={{
          color: "#333",
          marginTop: "10px",
        }}
      >
        {value}
      </h2>
    </div>
  );
}