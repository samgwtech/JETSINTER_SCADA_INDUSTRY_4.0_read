"use client";

import { logger } from "@/lib/clientLogger";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import DashboardLayout from "@/components/ui/DashboardLayout";
import ChartComponent from "@/components/ui/ChartComponent";
import { exit } from "node:process";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Disable TLS cert validation globally (use with caution!)

type CsvApiResponse = {
  columns: (number | string)[][];
};

function toTimeLabel(sec: number) {
  const s = Math.max(0, Math.floor(sec));
  const mm = Math.floor(s / 60);
  const ss = s % 60;
  return `${mm}:${String(ss).padStart(2, "0")}`;
}


function num(v: number | string) {
  const n = typeof v === "string" ? Number(v) : v;
  return Number.isFinite(n) ? n : 0;
}

function getAt(arr: number[], idx: number, fallback = 0) {
  return idx >= 0 && idx < arr.length ? arr[idx] : fallback;
}

function avg(arr: number[]) {
  if (!arr.length) return 0;
  let s = 0;
  for (const v of arr) s += v;
  return s / arr.length;
}

export default function Home() {
  logger.system("Dashboard loaded");
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"real" | "training" | null>(null);
  const [chillerOn, setChillerOn] = useState(false);
  const [chillerLoading, setChillerLoading] = useState(false);
  const [chillerTurnOff, setChillerTurnOff] = useState(false);
  const [chillerStartLoading, setJetsinterStartLoading] = useState(false);
  const [isJetsinterOn, setIsJetsinterOn] = useState(false);

  useEffect(() => {
    fetch("/api/jetsinter-status")
      .then((r) => r.json())
      .then((d) => setIsJetsinterOn(d.on === true))
      .catch(() => {});
  }, []);

  const [recipeValue, setRecipeValue] = useState(' ');
  const [recipeAddress, setRecipeAddress] = useState('1');

  const handleSetRecipe = async () => {
    await fetch("/api/update-env", {
      method: "POST",
      body: JSON.stringify({
        index: recipeAddress,
        value: recipeValue})
    });
    logger.mw(`Recipe set to ${recipeValue} at address ${recipeAddress}`);
    console.log(`Recipe set to ${recipeValue} at address ${recipeAddress}`);
    await fetch('/api/recipe', { method: 'POST' });
    setRecipeValue(' ');
    logger.mw(`Recipe value updated`);
    console.log(`Recipe value updated`);
  }

  const handleJetsinterTurnOff = async () => {
    logger.jetsinter(`Turning off chiller...`);
    setChillerTurnOff(true);
    try {
      const res = await fetch('/api/python/jetsinterOff', { method: 'POST' });
      const data = await res.json();
      console.log(data.success ? 'Jetsinter Stopped!' : data.error);
      logger.jetsinter(`Jetsinter turned off: ${data.success ? 'Success' : 'Failed'}`);
      if (data.success) setIsJetsinterOn(false);
    } catch (e) {
      console.error(e);
    }
    setChillerTurnOff(false);
  };

  const handleJetsinterClick = async () => {
    setJetsinterStartLoading(true);
    try {
      alert("Per accendere il Jetsinter, è necessario farlo manualmente dal dispositivo. Questa funzionalità è disabilitata per motivi di sicurezza.");
      exit(1);
      const res = await fetch('/api/python/jetsinter', { method: 'POST' });
      const data = await res.json();
      console.log(data.success ? 'Jetsinter started!' : data.error);
      if (data.success) setIsJetsinterOn(true);
    } catch (e) {
      console.error(e);
    }
    setJetsinterStartLoading(false);
  };

  const handleJetsinterToggle = async () => {
    if (isJetsinterOn) {
      await handleJetsinterTurnOff();
    } else {
      await handleJetsinterClick();
    }
  };

  const startMeasurement = async () => {
    logger.system(`Starting measurement...`);
    try {
      await fetch("/api/python/start", { method: "POST" });
      setIsRunning(true);
      setMode("real");
    } catch (e) {
      console.error("Failed to start", e);
    }
  };

  const stopMeasurement = async () => {
    logger.system(`Stopping measurement...`);
    try {
      await fetch("/api/python/stop", { method: "POST" });
      setIsRunning(false);
      setMode(null);
    } catch (e) {
      console.error("Failed to stop", e);
    }
  };

  const startTraining = async () => {
    logger.system(`Starting training mode...`);
    try {
      await fetch("/api/python/training", { method: "POST" });
      setIsRunning(true);
      setMode("training");
    } catch (e) {
      logger.error(`Failed to start training mode: ${e instanceof Error ? e.message : 'Unknown error'}`);
      console.error("Failed to start training", e);
    }
  };

  const [hoverIndex, setHoverIndex] = useState<number>(-1);
  const [activeChart, setActiveChart] = useState<number>(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Data
  const [timeLabels, setTimeLabels] = useState<string[]>([]);
  const [pressureData, setPressureData] = useState<number[]>([]);

  // Cassetti
  const [temperatureData, setTemperatureData] = useState<number[]>([]);
  const [microwavePowerData, setMwPowerData] = useState<number[]>([]);

  const fetchCsv = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch("/api/csv", { cache: "no-store" });
      if (!res.ok) throw new Error(`CSV API failed: ${res.status}`);
      const data = (await res.json()) as CsvApiResponse;

      const cols = data.columns;

      const secCol = (cols[0] ?? []).map((v) => num(v));
      const temperatureDataCol = (cols[2] ?? []).map((v) => num(v));
      const mwPowerCol = (cols[3] ?? []).map((v) => num(v));

      logger.system(`CSV data fetched successfully with ${secCol.length} entries`);
      logger.system(`Sample data - Time: ${getAt(secCol, 0)}s, Temperature: ${getAt(temperatureDataCol, 0)}°C, Microwave Power: ${getAt(mwPowerCol, 0)}%`);
      logger.system(`CSV columns - Time: ${secCol.length} entries, Temperature: ${temperatureDataCol.length} entries, Microwave Power: ${mwPowerCol.length} entries`);

      setTimeLabels(secCol.map(toTimeLabel));
      setTemperatureData(temperatureDataCol);
      setMwPowerData(mwPowerCol);
    } catch (e) {
      logger.error(`Error fetching CSV data: ${e instanceof Error ? e.message : 'Unknown error'}`);
      const msg = e instanceof Error ? e.message : "Unknown fetch error";
      setError(msg);
      logger.error(`Failed to fetch CSV data: ${msg}`);
      console.error("Data fetch error 🤕", e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch once on mount
  useEffect(() => {
    logger.system(`Fetching initial CSV data...`);
    fetchCsv();
  }, [fetchCsv]);

  // Polling for CSV updates
  useEffect(() => {
    const id = setInterval(fetchCsv, 2500);
    return () => clearInterval(id);
  }, [fetchCsv]);

const charts = useMemo(
  () => [
    { name: "", max: 1800, unit: "Temperatura (°C)", data: temperatureData, color: "rgba(150, 70, 54, 0.5)" },
//    { name: "", max: 4095, unit: "Potenza Microonde (%)", data: microwavePowerData, color: "rgba(98,131,149,0.5)" },
  ],
  [temperatureData, microwavePowerData]
);

  return (
    <DashboardLayout
      sidebar={
        <div className="flex flex-col gap-3 px-3 py-4 text-sm">
          {/* Section label */}
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground px-1 pb-1 border-b border-border">
            Controls
          </p>

          {/* Jetsinter toggle */}
          <button
            onClick={handleJetsinterToggle}
            disabled={chillerStartLoading || chillerTurnOff}
            className={`w-full px-3 py-2 rounded-md text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed
              ${isJetsinterOn
                ? "bg-destructive/20 text-red-400 border border-destructive/40 hover:bg-destructive/30"
                : "bg-primary/10 text-cyan-300 border border-primary/30 hover:bg-primary/20"
              }`}>
            {(chillerStartLoading || chillerTurnOff) ? "..." : isJetsinterOn ? "Spegni Jetsinter" : "Accendi Jetsinter"}
          </button>

          {/* Measurement controls */}
          <div className="flex flex-col gap-2">
            <button
              onClick={startMeasurement}
              className="w-full px-3 py-2 rounded-md text-sm font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all">
              Inizia Misurazione
            </button>
            <button
              onClick={stopMeasurement}
              className="w-full px-3 py-2 rounded-md text-sm font-medium bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-all">
              Stop Measurement
            </button>
            <button
              onClick={startTraining}
              className="w-full px-3 py-2 rounded-md text-sm font-medium bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20 transition-all">
              Training Mode
            </button>
          </div>

          {/* Recipe setter */}
          <div className="flex flex-col gap-2 pt-2 border-t border-border">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground px-1">
              Recipe
            </p>
            <input
              type="number"
              placeholder="MW Address (246)"
              value={recipeAddress}
              onChange={(e) => setRecipeAddress(e.target.value)}
              className="w-full bg-input border border-border rounded-md px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <input
              type="number"
              placeholder="Insert value"
              value={recipeValue}
              onChange={(e) => setRecipeValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSetRecipe()}
              className="w-full bg-input border border-border rounded-md px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <button
              onClick={handleSetRecipe}
              className="w-full px-3 py-2 rounded-md text-sm font-medium bg-primary/10 text-cyan-300 border border-primary/30 hover:bg-primary/20 transition-all">
              Set Recipe
            </button>
          </div>
        </div>
      }>
        <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${charts.length}, minmax(0, 1fr))` }}>
          {charts.map((ch, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-2">
              <ChartComponent
                name_measurement={ch.name}
                max_x_axis={ch.max}
                unit={ch.unit}
                unitOfTime="sec"
                labels={timeLabels}
                data={ch.data}
                onHoverIndex={setHoverIndex}
                color={ch.color}
              />
            </div>
          ))}
        </div>
    </DashboardLayout>
  );
}