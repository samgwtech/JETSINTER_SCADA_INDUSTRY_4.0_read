"use client";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

type Phase   = { t_ini: number; t_fin: number; vel: number; sosta: number };
type Recipes = { default: { name: string; phases: Phase[] }; custom: { name: string; phases: Phase[] } | null };

function decodeMD(b64: string, start: number): Record<number, number> {
  const raw    = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
  const result: Record<number, number> = {};
  for (let i = 0; i < raw.length / 4; i++) {
    const view = new DataView(raw.buffer, i * 4, 4);
    result[start + i] = view.getInt32(0, true);
  }
  return result;
}

export default function Home() {
  const [start,   setStart]   = useState(0);
  const [ready,   setReady]   = useState(false);
  const [live,    setLive]    = useState({ FASE: 0, TEMP_C: 0, T_TARGET: 0, PWM_PERCENT: 0, MINUTI_TOTALI: 0 });
  const [recipes, setRecipes] = useState<Recipes | null>(null);
  const [phases,  setPhases]  = useState<Phase[]>([]);
  const [recipeOpen, setRecipeOpen] = useState(false);
  const [chartData, setChartData] = useState<{ t: number; temp: number; target: number }[]>([]);

  // Stato START
  useEffect(() => {
    fetch("/api/plc?op=M&index=2")
      .then(r => r.json())
      .then(data => setStart(data?.OPERANDS?.MSINGLE?.[0]?.V ?? 0))
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  // Polling live
  useEffect(() => {
    const poll = async () => {
      try {
        const [r1, r2] = await Promise.all([
          fetch("/api/plc?op=MD&index=201,214").then(r => r.json()),
          fetch("/api/plc?op=MB&index=200").then(r => r.json()),
        ]);
        const range = r1?.OPERANDS?.MDRANGE?.[0];
        if (range) {
          const vals = decodeMD(range.V, range.START);
          setLive(prev => ({
            ...prev,
            TEMP_C:        vals[207] ?? 0,
            T_TARGET:      vals[209] ?? 0,
            PWM_PERCENT:   vals[210] ?? 0,
            MINUTI_TOTALI: vals[212] ?? 0,
          }));

          setChartData(prev => {
          const next = [...prev, { t: prev.length, temp: vals[207] ?? 0, target: vals[209] ?? 0 }];
          return next.slice(-120);
        });
        }
        const fase = r2?.OPERANDS?.MBSINGLE?.[0]?.V ?? 0;
        setLive(prev => ({ ...prev, FASE: fase }));
      } catch {}
    };
    poll();
    const id = setInterval(poll, 2000);
    return () => clearInterval(id);
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
    await fetch("/api/plc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ op: "M", index: 2, value: newValue }),
    });
    setStart(newValue);
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

  return (
    <main className="p-6 flex flex-col gap-6">
      <button
        onClick={toggleStart}
        disabled={!ready}
        suppressHydrationWarning
        className={`w-32 px-4 py-2 rounded font-medium transition-all disabled:opacity-40 ${
          start === 1
            ? "bg-red-500/20 text-red-400 border border-red-500/40"
            : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
        }`}>
        {!ready ? "..." : start === 1 ? "STOP" : "START"}
      </button>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[
          { label: "Temperatura", value: `${live.TEMP_C} °C`     },
          { label: "Target",      value: `${live.T_TARGET} °C`   },
          { label: "Potenza MW",  value: `${live.PWM_PERCENT} %` },
          { label: "Minuti",      value: `${live.MINUTI_TOTALI}` },
          { label: "Fase",        value: `${live.FASE}`          },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-lg border border-border bg-card p-3">
            <p className="text-xs text-muted-foreground mb-1">{label}</p>
            <p className="text-lg font-semibold">{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-border bg-card p-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="t" hide />
            <YAxis domain={[0, 1800]} width={40} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temp"   name="Temperatura (°C)" stroke="#f87171" dot={false} isAnimationActive={false} />
            <Line type="monotone" dataKey="target" name="Target (°C)"      stroke="#34d399" dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

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
                <button onClick={updatePlc} className="px-4 py-2 rounded text-sm font-medium bg-amber-500/20 text-amber-400 border border-amber-500/40">
                  Aggiorna
                </button>
                <button onClick={saveAndUpdate} className="px-4 py-2 rounded text-sm font-medium bg-primary/20 text-cyan-300 border border-primary/40">
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