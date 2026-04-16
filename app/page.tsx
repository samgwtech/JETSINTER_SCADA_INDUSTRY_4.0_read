"use client";
import { useState, useEffect, memo } from "react";

type Phase   = { t_ini: number; t_fin: number; vel: number; sosta: number };
type Recipes = { default: { name: string; phases: Phase[] }; custom: { name: string; phases: Phase[] } | null };
type ChartPoint = { temp: number; target: number };

// -----------------------------------------------------------------------
// Decoder MD — shared DataView per zero allocazioni
// -----------------------------------------------------------------------
const buf4 = new ArrayBuffer(4);
const dv4  = new DataView(buf4);
const u8_4 = new Uint8Array(buf4);

function decodeMD(b64: string, start: number): Record<number, number> {
  const raw    = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
  const result: Record<number, number> = {};
  const count  = raw.length >> 2;
  for (let i = 0; i < count; i++) {
    u8_4.set(raw.subarray(i * 4, i * 4 + 4));
    result[start + i] = dv4.getInt32(0, true);
  }
  return result;
}

// -----------------------------------------------------------------------
// TempChart — SVG puro, zero dipendenze, zero animazioni
// -----------------------------------------------------------------------
const TempChart = memo(function TempChart({ data }: { data: ChartPoint[] }) {
  const W = 560, H = 200;
  const PAD_L = 40, PAD_T = 10, PAD_R = 90, PAD_B = 28;
  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;
  const MAX_Y  = 1800;
  const TICKS  = [0, 450, 900, 1350, 1800];

  const xOf = (i: number) => PAD_L + (data.length < 2 ? 0 : (i / (data.length - 1)) * innerW);
  const yOf = (v: number) => PAD_T + innerH - (Math.min(Math.max(v, 0), MAX_Y) / MAX_Y) * innerH;

  const pts = (key: keyof ChartPoint) =>
    data.map((d, i) => `${xOf(i).toFixed(1)},${yOf(d[key]).toFixed(1)}`).join(" ");

  const last    = data[data.length - 1];
  const lastX   = PAD_L + innerW + 6;
  const tempY   = last ? yOf(last.temp)   : PAD_T + innerH / 2;
  const targetY = last ? yOf(last.target) : PAD_T + innerH / 2;
  const gap     = Math.abs(tempY - targetY);
  const adjTemp = gap < 14 && tempY >= targetY  ? tempY  + (14 - gap) / 2 : tempY;
  const adjTgt  = gap < 14 && targetY > tempY   ? targetY + (14 - gap) / 2 : targetY;
  const legendY = PAD_T + innerH + 18;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ display: "block" }}>
      {TICKS.map(v => {
        const y = yOf(v);
        return (
          <g key={v}>
            <line x1={PAD_L} y1={y} x2={PAD_L + innerW} y2={y} stroke="#ffffff18" strokeWidth={1} />
            <text x={PAD_L - 5} y={y + 3.5} textAnchor="end" fill="#555" fontSize={10}>{v}</text>
          </g>
        );
      })}
      <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={PAD_T + innerH} stroke="#ffffff22" strokeWidth={1} />
      <line x1={PAD_L} y1={PAD_T + innerH} x2={PAD_L + innerW} y2={PAD_T + innerH} stroke="#ffffff22" strokeWidth={1} />
      {data.length > 1 && (
        <>
          <polyline points={pts("temp")}   fill="none" stroke="#f87171" strokeWidth={1.5} strokeLinejoin="round" />
          <polyline points={pts("target")} fill="none" stroke="#34d399" strokeWidth={1.5} strokeLinejoin="round" />
        </>
      )}
      {last && (
        <>
          <circle cx={PAD_L + innerW} cy={tempY}   r={3} fill="#f87171" />
          <text x={lastX} y={adjTemp + 4} fontSize={13} fontWeight="bold" fill="#f87171">{last.temp} °C</text>
          <circle cx={PAD_L + innerW} cy={targetY} r={3} fill="#34d399" />
          <text x={lastX} y={adjTgt  + 4} fontSize={13} fontWeight="bold" fill="#34d399">{last.target} °C</text>
        </>
      )}
      <rect x={PAD_L}       y={legendY - 7} width={10} height={2} rx={1} fill="#f87171" />
      <text x={PAD_L + 14}  y={legendY} fontSize={10} fill="#f87171">Temp. pirometro</text>
      <rect x={PAD_L + 120} y={legendY - 7} width={10} height={2} rx={1} fill="#34d399" />
      <text x={PAD_L + 134} y={legendY} fontSize={10} fill="#34d399">Target</text>
    </svg>
  );
});

// -----------------------------------------------------------------------
// Main page
// -----------------------------------------------------------------------
export default function Home() {
  const [start,      setStart]      = useState(0);
  const [ready,      setReady]      = useState(false);
  const [allarme,    setAllarme]    = useState(0);   // M05 ALLARME_TIMEOUT
  const [transMode,  setTransMode]  = useState(0);   // M04 TRANSFORMER_MODE
  const [live, setLive] = useState({
    FASE:           0,
    FILTERED_TEMP:  0,   // MD248 — temperatura filtrata (usata dal controllo)
    T_TARGET:       0,   // MD209
    PWM_PERCENT:    0,   // MD210
    MINUTI_TOTALI:  0,   // MD212
  });
  const [recipes,    setRecipes]    = useState<Recipes | null>(null);
  const [phases,     setPhases]     = useState<Phase[]>([]);
  const [recipeOpen, setRecipeOpen] = useState(false);
  const [chartData,  setChartData]  = useState<ChartPoint[]>([]);
  const [chartFull,  setChartFull]  = useState(false);

  // -----------------------------------------------------------------------
  // Stato iniziale: START (M02), ALLARME (M05), TRANSFORMER_MODE (M04)
  // -----------------------------------------------------------------------
  useEffect(() => {
    Promise.all([
      fetch("/api/plc?op=M&index=2").then(r => r.json()),
      fetch("/api/plc?op=M&index=4").then(r => r.json()),
      fetch("/api/plc?op=M&index=5").then(r => r.json()),
    ])
      .then(([d2, d4, d5]) => {
        setStart(    d2?.OPERANDS?.MSINGLE?.[0]?.V ?? 0);
        setTransMode(d4?.OPERANDS?.MSINGLE?.[0]?.V ?? 0);
        setAllarme(  d5?.OPERANDS?.MSINGLE?.[0]?.V ?? 0);
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  // -----------------------------------------------------------------------
  // Polling live ogni 2 secondi
  // Fetch 1: MD201-216 (variabili runtime + KP_INV + TIMEOUT_MIN)
  // Fetch 2: MB200 (FASE)
  // Fetch 3: MD248 (FILTERED_TEMP — separato perché fuori dalla range 201-216)
  // Fetch 4: M04, M05 (TRANSFORMER_MODE, ALLARME_TIMEOUT)
  // -----------------------------------------------------------------------
  useEffect(() => {
    let active    = true;
    let isPolling = false;

    const poll = async () => {
      if (isPolling) return;
      isPolling = true;
      try {
        const [r1, r2, r3, r4] = await Promise.all([
          fetch("/api/plc?op=MD&index=201,216").then(r => r.json()),
          fetch("/api/plc?op=MB&index=200").then(r => r.json()),
          fetch("/api/plc?op=MD&index=248,248").then(r => r.json()),
          fetch("/api/plc?op=M&index=4,5").then(r => r.json()),
        ]);

        if (!active) return;

        const range1 = r1?.OPERANDS?.MDRANGE?.[0];
        const range3 = r3?.OPERANDS?.MDRANGE?.[0];
        const fase   = r2?.OPERANDS?.MBSINGLE?.[0]?.V ?? 0;
        const mBits  = r4?.OPERANDS?.MSINGLE ?? [];

        for (const bit of mBits) {
          if (bit.INDEX === 4) setTransMode(bit.V ?? 0);
          if (bit.INDEX === 5) setAllarme(bit.V ?? 0);
        }

        const vals1 = range1 ? decodeMD(range1.V, range1.START) : {};
        const vals3 = range3 ? decodeMD(range3.V, range3.START) : {};

        const filteredTemp = vals3[248] ?? 0;
        const target       = vals1[209] ?? 0;

        setLive({
          FASE:          fase,
          FILTERED_TEMP: filteredTemp,
          T_TARGET:      target,
          PWM_PERCENT:   vals1[210] ?? 0,
          MINUTI_TOTALI: vals1[212] ?? 0,
        });

        setChartData(prev => {
          const next = [...prev, { temp: filteredTemp, target }];
          return next.length > 120 ? next.slice(-120) : next;
        });

      } catch {
        // PLC irraggiungibile: riprova al prossimo tick
      } finally {
        isPolling = false;
      }
    };

    poll();
    const id = setInterval(poll, 2000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  // Carica ricette
  useEffect(() => {
    fetch("/api/plc?op=recipes")
      .then(r => r.json())
      .then((data: Recipes) => {
        setRecipes(data);
        setPhases(data.custom?.phases ?? data.default.phases);
      });
  }, []);

  const toggleStart = async () => {
    const newValue = start === 0 ? 1 : 0;
    await Promise.all([
      fetch("/api/plc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ op: "M", index: 2, value: newValue }),
      }),
      fetch("/api/python", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: newValue === 1 ? "start" : "stop" }),
      }),
    ]);
    setStart(newValue);
  };

  const resetAllarme = async () => {
    await fetch("/api/plc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ op: "M", index: 5, value: 0 }),
    });
    setAllarme(0);
  };

  const updatePlc = async () => {
    await fetch("/api/plc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "update_recipe", phases }),
    });
  };

  const saveAndUpdate = async () => {
    await fetch("/api/plc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "save_recipe", phases }),
    });
    const data = await fetch("/api/plc?op=recipes").then(r => r.json());
    setRecipes(data);
  };

  // -----------------------------------------------------------------------
  // Vista grafico fullscreen
  // -----------------------------------------------------------------------
  if (chartFull) return (
    <main className="h-full p-4 flex flex-col gap-2">
      <button
        onClick={() => setChartFull(false)}
        className="self-end px-3 py-1 rounded text-xs font-medium bg-card border border-border text-muted-foreground">
        ✕ Esci
      </button>
      <div className="flex-1 min-h-0 rounded-lg border border-border bg-card p-4">
        <TempChart data={chartData} />
      </div>
    </main>
  );

  // -----------------------------------------------------------------------
  // Vista principale
  // -----------------------------------------------------------------------
  return (
    <main className="p-6 flex flex-col gap-4 h-full overflow-auto">

      {/* Banner allarme timeout — visibile solo se M05=TRUE */}
      {allarme === 1 && (
        <div className="flex items-center justify-between rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3">
          <span className="text-sm font-semibold text-red-400">
            ⚠ ALLARME — Fase non completata in tempo (timeout)
          </span>
          <button
            onClick={resetAllarme}
            className="px-3 py-1 rounded text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/40">
            Reset allarme
          </button>
        </div>
      )}

      {/* Riga controlli: START/STOP + badge modalità */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleStart}
          disabled={!ready}
          suppressHydrationWarning
          className={`w-32 px-4 py-2 rounded font-medium transition-colors disabled:opacity-40 ${
            start === 1
              ? "bg-red-500/20 text-red-400 border border-red-500/40"
              : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
          }`}>
          {!ready ? "..." : start === 1 ? "STOP" : "START"}
        </button>

        {/* Badge modalità M04: TRASFORMATORE o INVERTER */}
        <span className={`px-3 py-1 rounded text-xs font-semibold border ${
          transMode === 1
            ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
            : "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
        }`}>
          {transMode === 1 ? "TRASFORMATORE" : "INVERTER"}
        </span>
      </div>

      {/* Metriche live */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[
          { label: "Temp. pirometro", value: `${live.FILTERED_TEMP} °C` },
          { label: "Target",          value: `${live.T_TARGET} °C`      },
          { label: "Potenza MW",      value: `${live.PWM_PERCENT} %`    },
          { label: "Minuti",          value: `${live.MINUTI_TOTALI}`    },
          { label: "Fase",            value: `${live.FASE}`             },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-lg border border-border bg-card p-3">
            <p className="text-xs text-muted-foreground mb-1">{label}</p>
            <p className="text-lg font-semibold">{value}</p>
          </div>
        ))}
      </div>

      {/* Grafico */}
      <div className="flex-1 min-h-0 rounded-lg border border-border bg-card p-4 relative">
        <button
          onClick={() => setChartFull(true)}
          title="Schermo intero"
          className="absolute top-2 right-2 z-10 px-3 py-2 rounded-md text-sm font-semibold bg-primary/15 border border-primary/40 text-primary hover:bg-primary/25">
          ⛶ Espandi
        </button>
        <TempChart data={chartData} />
      </div>

      {/* Ricetta */}
      {phases.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setRecipeOpen(o => !o)}
              className="text-sm font-semibold flex items-center gap-2">
              Ricetta
              <span className="text-muted-foreground">{recipeOpen ? "▲" : "▼"}</span>
            </button>
            {recipes?.custom && (
              <button onClick={() => setPhases(recipes.default.phases)} className="text-xs text-muted-foreground underline">
                Carica default
              </button>
            )}
            {recipes?.custom && (
              <button onClick={() => setPhases(recipes.custom!.phases)} className="text-xs text-muted-foreground underline">
                Carica custom
              </button>
            )}
          </div>

          {recipeOpen && (
            <>
              <div className="overflow-x-auto">
                <table className="text-sm w-full border-collapse">
                  <thead>
                    <tr className="text-muted-foreground text-xs">
                      <th className="text-left p-2">Fase</th>
                      <th className="text-left p-2">T ini (°C)</th>
                      <th className="text-left p-2">T fin (°C)</th>
                      <th className="text-left p-2">Vel (°C/min)</th>
                      <th className="text-left p-2">Sosta (min)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {phases.map((p, i) => (
                      <tr key={i} className="border-t border-border">
                        <td className="p-2 text-muted-foreground">{i + 1}</td>
                        {(["t_ini", "t_fin", "vel", "sosta"] as (keyof Phase)[]).map(field => (
                          <td key={field} className="p-2">
                            <input
                              type="number"
                              value={p[field]}
                              onChange={e => {
                                const updated = [...phases];
                                updated[i] = { ...updated[i], [field]: Number(e.target.value) };
                                setPhases(updated);
                              }}
                              className="w-20 bg-input border border-border rounded px-2 py-1 text-sm"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={updatePlc}
                  className="px-4 py-2 rounded text-sm font-medium bg-amber-500/20 text-amber-400 border border-amber-500/40">
                  Aggiorna
                </button>
                <button
                  onClick={saveAndUpdate}
                  className="px-4 py-2 rounded text-sm font-medium bg-primary/20 text-cyan-300 border border-primary/40">
                  Salva come custom e aggiorna
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </main>
  );
}