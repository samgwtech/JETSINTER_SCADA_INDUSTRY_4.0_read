"use client";
import { useState, useEffect, memo, useRef } from "react";

type Phase   = { t_ini: number; t_fin: number; vel: number; sosta: number };
type Recipes = { default: { name: string; phases: Phase[] }; custom: { name: string; phases: Phase[] } | null };
type ChartPoint = { minute: number; temp: number; target: number; t_ini: number; t_fin: number };
type CsvRow     = { ELAPSED_MINUTES: number; FASE: number; FILTERED_TEMP: number; T_INI: number; T_FIN: number; VELOCITA: number; SOSTA_MIN: number };
type LineToggles = { target: boolean; t_fin: boolean; t_ini: boolean };

// -----------------------------------------------------------------------
// Decoder MD
// -----------------------------------------------------------------------
const buf4 = new ArrayBuffer(4);
const dv4  = new DataView(buf4);
const u8_4 = new Uint8Array(buf4);

function decodeMD(b64: string, start: number): Record<number, number> {
  const raw = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
  const result: Record<number, number> = {};
  const count = raw.length >> 2;
  for (let i = 0; i < count; i++) {
    u8_4.set(raw.subarray(i * 4, i * 4 + 4));
    result[start + i] = dv4.getInt32(0, true);
  }
  return result;
}

// -----------------------------------------------------------------------
// CSV helpers
// -----------------------------------------------------------------------
function parseCsv(text: string): CsvRow[] {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map(h => h.trim());
  return lines.slice(1).map(line => {
    const vals = line.split(",");
    const obj: Record<string, number> = {};
    headers.forEach((h, i) => { obj[h] = Number(vals[i] ?? 0); });
    return obj as unknown as CsvRow;
  }).filter(r => !isNaN(r.ELAPSED_MINUTES));
}

function csvToChartPoints(rows: CsvRow[]): ChartPoint[] {
  const byMin = new Map<number, { sumTemp: number; n: number; fase: number; vel: number; t_ini: number; t_fin: number }>();
  for (const r of rows) {
    const m = r.ELAPSED_MINUTES;
    const e = byMin.get(m);
    if (e) { e.sumTemp += r.FILTERED_TEMP; e.n++; }
    else byMin.set(m, { sumTemp: r.FILTERED_TEMP, n: 1, fase: r.FASE, vel: r.VELOCITA, t_ini: r.T_INI, t_fin: r.T_FIN });
  }
  const faseTargets = new Map<number, number>();
  return Array.from(byMin.entries()).sort((a, b) => a[0] - b[0]).map(([minute, v]) => {
    const { fase, vel, t_ini, t_fin } = v;
    if (!faseTargets.has(fase)) faseTargets.set(fase, t_ini);
    const next = Math.min(faseTargets.get(fase)! + vel, t_fin);
    faseTargets.set(fase, next);
    return { minute, temp: Math.round(v.sumTemp / v.n), target: next, t_ini, t_fin };
  });
}

// -----------------------------------------------------------------------
// Step polyline helper: builds step-chart point string from data
// -----------------------------------------------------------------------
function buildStepPts(data: ChartPoint[], key: "t_ini" | "t_fin", xOf: (m: number) => number, yOf: (v: number) => number): string {
  if (data.length === 0) return "";
  const pts: string[] = [];
  data.forEach((d, i) => {
    const x = xOf(d.minute).toFixed(1);
    const y = yOf(d[key]).toFixed(1);
    if (i > 0 && d[key] !== data[i-1][key]) {
      pts.push(`${xOf(data[i-1].minute).toFixed(1)},${y}`);
    }
    pts.push(`${x},${y}`);
  });
  return pts.join(" ");
}

// -----------------------------------------------------------------------
// Toggle button component
// -----------------------------------------------------------------------
function ToggleBtn({ active, color, label, onClick }: { active: boolean; color: string; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs border transition-all"
      style={{
        borderColor: active ? color + "60" : undefined,
        background:  active ? color + "18" : undefined,
        color:       active ? color : undefined,
        opacity:     active ? 1 : 0.4,
      }}>
      <span style={{ width: 10, height: 2, background: color, display: "inline-block", borderRadius: 1 }} />
      {label}
    </button>
  );
}

// -----------------------------------------------------------------------
// GlobalChart
// -----------------------------------------------------------------------
const GlobalChart = memo(function GlobalChart({
  data, maxX = 300, toggles
}: { data: ChartPoint[]; maxX?: number; toggles: LineToggles }) {
  if (data.length < 2) return (
    <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
      In attesa di dati...
    </div>
  );

  const W = 700, H = 280, PL = 52, PT = 14, PR = 84, PB = 36;
  const iW = W - PL - PR, iH = H - PT - PB;

  // X: from actual data start to maxX
  const dataMinX = data[0].minute;
  const xOf = (m: number) => PL + ((Math.min(Math.max(m, 0), maxX) / maxX)) * iW;

  // Y: autoscale with padding (not fixed 0-1600 — too compressed for real data)
  const allVals = data.flatMap(d => {
    const v = [d.temp];
    if (toggles.target) v.push(d.target);
    if (toggles.t_fin)  v.push(d.t_fin);
    if (toggles.t_ini)  v.push(d.t_ini);
    return v;
  }).filter(v => v > 0);
  const rawMin = allVals.length ? Math.min(...allVals) : 0;
  const rawMax = allVals.length ? Math.max(...allVals) : 1600;
  const pad = Math.max(50, (rawMax - rawMin) * 0.12);
  const minY = Math.max(0,    rawMin - pad);
  const maxY = Math.min(1600, rawMax + pad);
  const rangeY = maxY - minY || 1;

  const yOf = (v: number) => PT + iH - ((Math.min(Math.max(v, minY), maxY) - minY) / rangeY) * iH;

  const last = data[data.length - 1];
  const lastX = xOf(last.minute);

  // Y ticks — 5 evenly spaced
  const yTicks = Array.from({ length: 6 }, (_, i) => Math.round(minY + (rangeY / 5) * i));
  // X ticks
  const xTicks = Array.from({ length: 7 }, (_, i) => Math.round((maxX / 6) * i));

  const ptsTemp   = data.map(d => `${xOf(d.minute).toFixed(1)},${yOf(d.temp).toFixed(1)}`).join(" ");
  const ptsTarget = data.map(d => `${xOf(d.minute).toFixed(1)},${yOf(d.target).toFixed(1)}`).join(" ");
  const stepFin   = buildStepPts(data, "t_fin", xOf, yOf);
  const stepIni   = buildStepPts(data, "t_ini", xOf, yOf);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ display: "block" }}>
      {/* Grid */}
      {yTicks.map(v => <g key={v}>
        <line x1={PL} y1={yOf(v)} x2={PL+iW} y2={yOf(v)} stroke="#ffffff0e" strokeWidth={1}/>
        <text x={PL-6} y={yOf(v)+4} textAnchor="end" fill="#666" fontSize={10}>{v}</text>
      </g>)}
      {xTicks.map(v => <g key={v}>
        <line x1={xOf(v)} y1={PT} x2={xOf(v)} y2={PT+iH} stroke="#ffffff07" strokeWidth={1}/>
        <text x={xOf(v)} y={PT+iH+14} textAnchor="middle" fill="#666" fontSize={10}>{v}</text>
      </g>)}
      <line x1={PL} y1={PT} x2={PL} y2={PT+iH} stroke="#ffffff22" strokeWidth={1}/>
      <line x1={PL} y1={PT+iH} x2={PL+iW} y2={PT+iH} stroke="#ffffff22" strokeWidth={1}/>
      {/* Data start marker */}
      {dataMinX > 0 && <line x1={xOf(dataMinX)} y1={PT} x2={xOf(dataMinX)} y2={PT+iH} stroke="#ffffff18" strokeWidth={1} strokeDasharray="3,4"/>}
      {/* Current time cursor */}
      <line x1={lastX} y1={PT} x2={lastX} y2={PT+iH} stroke="#ffffff18" strokeWidth={1} strokeDasharray="2,4"/>

      {toggles.t_ini && stepIni && <polyline points={stepIni} fill="none" stroke="#94a3b8" strokeWidth={1.5} strokeLinejoin="round" opacity={0.65}/>}
      {toggles.t_fin && stepFin && <polyline points={stepFin} fill="none" stroke="#fb923c" strokeWidth={2}   strokeLinejoin="round" opacity={0.9}/>}
      {toggles.target && <polyline points={ptsTarget} fill="none" stroke="#34d399" strokeWidth={1.5} strokeLinejoin="round" strokeDasharray="5,3" opacity={0.85}/>}
      <polyline points={ptsTemp} fill="none" stroke="#f87171" strokeWidth={2.5} strokeLinejoin="round"/>

      {/* Live dots + labels */}
      <circle cx={lastX} cy={yOf(last.temp)} r={4} fill="#f87171"/>
      <text x={PL+iW+7} y={yOf(last.temp)+4} fontSize={13} fontWeight="bold" fill="#f87171">{last.temp}°</text>
      {toggles.target && <>
        <circle cx={lastX} cy={yOf(last.target)} r={3} fill="#34d399"/>
        <text x={PL+iW+7} y={yOf(last.target)+4} fontSize={11} fill="#34d399">{last.target}°</text>
      </>}
      {toggles.t_fin && <>
        <circle cx={lastX} cy={yOf(last.t_fin)} r={3} fill="#fb923c"/>
        <text x={PL+iW+7} y={yOf(last.t_fin)+4} fontSize={11} fill="#fb923c">{last.t_fin}°</text>
      </>}

      <text x={PL+iW/2} y={H-2} textAnchor="middle" fill="#555" fontSize={10}>minuti</text>
    </svg>
  );
});

// -----------------------------------------------------------------------
// ZoomChart
// -----------------------------------------------------------------------
const ZoomChart = memo(function ZoomChart({
  data, windowMin = 30, toggles
}: { data: ChartPoint[]; windowMin?: number; toggles: LineToggles }) {
  if (data.length < 2) return (
    <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
      In attesa di dati...
    </div>
  );

  const W = 700, H = 260, PL = 52, PT = 14, PR = 84, PB = 36;
  const iW = W - PL - PR, iH = H - PT - PB;

  const lastMin  = data[data.length - 1].minute;
  const startMin = Math.max(data[0].minute, lastMin - windowMin);
  const visible  = data.filter(d => d.minute >= startMin);

  const allVals = visible.flatMap(d => {
    const v = [d.temp];
    if (toggles.target) v.push(d.target);
    if (toggles.t_fin)  v.push(d.t_fin);
    if (toggles.t_ini)  v.push(d.t_ini);
    return v;
  }).filter(v => v > 0);
  const rawMin = allVals.length ? Math.min(...allVals) : 0;
  const rawMax = allVals.length ? Math.max(...allVals) : 1600;
  const pad = Math.max(30, (rawMax - rawMin) * 0.15);
  const minY = Math.max(0,    rawMin - pad);
  const maxY = Math.min(1600, rawMax + pad);
  const rangeY = maxY - minY || 1;

  const xOf = (m: number) => PL + ((m - startMin) / windowMin) * iW;
  const yOf = (v: number) => PT + iH - ((Math.min(Math.max(v, minY), maxY) - minY) / rangeY) * iH;

  const ptsTemp   = visible.map(d => `${xOf(d.minute).toFixed(1)},${yOf(d.temp).toFixed(1)}`).join(" ");
  const ptsTarget = visible.map(d => `${xOf(d.minute).toFixed(1)},${yOf(d.target).toFixed(1)}`).join(" ");
  const bandPts   = [
    ...visible.map(d => `${xOf(d.minute).toFixed(1)},${yOf(d.target).toFixed(1)}`),
    ...[...visible].reverse().map(d => `${xOf(d.minute).toFixed(1)},${yOf(d.temp).toFixed(1)}`),
  ].join(" ");
  const stepFin   = buildStepPts(visible, "t_fin", xOf, yOf);
  const stepIni   = buildStepPts(visible, "t_ini", xOf, yOf);

  const yTicks  = Array.from({length:6},(_,i)=>Math.round(minY+(rangeY/5)*i));
  const xTicks  = Array.from({length:7},(_,i)=>Math.round(startMin+(windowMin/6)*i));
  const last    = visible[visible.length-1];
  const errLast = last ? last.target - last.temp : 0;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ display: "block" }}>
      {yTicks.map(v=><g key={v}>
        <line x1={PL} y1={yOf(v)} x2={PL+iW} y2={yOf(v)} stroke="#ffffff0e" strokeWidth={1}/>
        <text x={PL-6} y={yOf(v)+4} textAnchor="end" fill="#666" fontSize={10}>{v}</text>
      </g>)}
      {xTicks.map(v=><g key={v}>
        <line x1={xOf(v)} y1={PT} x2={xOf(v)} y2={PT+iH} stroke="#ffffff07" strokeWidth={1}/>
        <text x={xOf(v)} y={PT+iH+14} textAnchor="middle" fill="#666" fontSize={10}>{v}</text>
      </g>)}
      <line x1={PL} y1={PT} x2={PL} y2={PT+iH} stroke="#ffffff22" strokeWidth={1}/>
      <line x1={PL} y1={PT+iH} x2={PL+iW} y2={PT+iH} stroke="#ffffff22" strokeWidth={1}/>

      {/* Banda errore */}
      {toggles.target && visible.length>1 && <polygon points={bandPts} fill={errLast>=0?"#f87171":"#34d399"} opacity={0.08}/>}

      {toggles.t_ini && stepIni && <polyline points={stepIni} fill="none" stroke="#94a3b8" strokeWidth={1.5} strokeLinejoin="round" opacity={0.65}/>}
      {toggles.t_fin && stepFin && <polyline points={stepFin} fill="none" stroke="#fb923c" strokeWidth={2}   strokeLinejoin="round" opacity={0.9}/>}
      {toggles.target && <polyline points={ptsTarget} fill="none" stroke="#34d399" strokeWidth={1.5} strokeLinejoin="round" strokeDasharray="5,3" opacity={0.85}/>}
      <polyline points={ptsTemp} fill="none" stroke="#f87171" strokeWidth={2.5} strokeLinejoin="round"/>

      {last && <>
        <circle cx={xOf(last.minute)} cy={yOf(last.temp)} r={4} fill="#f87171"/>
        <text x={PL+iW+7} y={yOf(last.temp)+4} fontSize={13} fontWeight="bold" fill="#f87171">{last.temp}°</text>
        {toggles.target && <>
          <circle cx={xOf(last.minute)} cy={yOf(last.target)} r={3} fill="#34d399"/>
          <text x={PL+iW+7} y={yOf(last.target)+4} fontSize={11} fill="#34d399">{last.target}°</text>
          <text x={PL+iW+7} y={yOf(last.target)+18} fontSize={11} fill={errLast>=0?"#fb923c":"#a3e635"}>
            Δ{errLast>=0?"+":""}{errLast}°
          </text>
        </>}
        {toggles.t_fin && <>
          <circle cx={xOf(last.minute)} cy={yOf(last.t_fin)} r={3} fill="#fb923c"/>
          <text x={PL+iW+7} y={yOf(last.t_fin)+4} fontSize={11} fill="#fb923c">{last.t_fin}°</text>
        </>}
      </>}
      <text x={PL+iW/2} y={H-2} textAnchor="middle" fill="#555" fontSize={10}>minuti</text>
    </svg>
  );
});

// -----------------------------------------------------------------------
// LineControls — toggles + legend condivisi
// -----------------------------------------------------------------------
function LineControls({ toggles, setToggles }: { toggles: LineToggles; setToggles: (t: LineToggles) => void }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex items-center gap-1.5 mr-1">
        <span style={{ width: 14, height: 2.5, background: "#f87171", display: "inline-block", borderRadius: 1 }}/>
        <span className="text-xs text-red-400">Temp. reale</span>
      </div>
      <ToggleBtn active={toggles.target} color="#34d399" label="Setpoint"
        onClick={()=>setToggles({...toggles,target:!toggles.target})}/>
      <ToggleBtn active={toggles.t_fin}  color="#fb923c" label="T_FIN fase"
        onClick={()=>setToggles({...toggles,t_fin:!toggles.t_fin})}/>
      <ToggleBtn active={toggles.t_ini}  color="#94a3b8" label="T_INI fase"
        onClick={()=>setToggles({...toggles,t_ini:!toggles.t_ini})}/>
    </div>
  );
}

// -----------------------------------------------------------------------
// HistoricalView
// -----------------------------------------------------------------------
function HistoricalView() {
  const [csvData,    setCsvData]    = useState<ChartPoint[]>([]);
  const [csvName,    setCsvName]    = useState<string | null>(null);
  const [csvStats,   setCsvStats]   = useState<{ minMin: number; maxMin: number; maxTemp: number; fasi: number[] } | null>(null);
  const [zoomWindow, setZoomWindow] = useState(30);
  const [zoomOffset, setZoomOffset] = useState(0);
  const [toggles,    setToggles]    = useState<LineToggles>({ target: true, t_fin: true, t_ini: false });
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const text = ev.target?.result as string;
      const rows = parseCsv(text);
      const points = csvToChartPoints(rows);
      setCsvData(points);
      setCsvName(file.name);
      const mins  = points.map(p => p.minute);
      const temps = points.map(p => p.temp);
      // filter out FASE 0 for display
      const fasi  = [...new Set(rows.filter(r=>r.FASE>0).map(r => r.FASE))].sort((a,b)=>a-b);
      const maxMin = Math.max(...mins);
      setCsvStats({ minMin: Math.min(...mins), maxMin, maxTemp: Math.max(...temps), fasi });
      setZoomOffset(Math.max(0, maxMin - zoomWindow));
    };
    reader.readAsText(file);
  };

  const zoomedData = csvData.filter(d => d.minute >= zoomOffset && d.minute <= zoomOffset + zoomWindow);
  const maxMin = csvStats?.maxMin ?? 300;

  return (
    <div className="h-full flex flex-col gap-4 p-5 overflow-auto">
      {/* Upload */}
      <div onClick={() => fileRef.current?.click()}
        className="flex items-center gap-4 rounded-lg border-2 border-dashed border-border bg-card px-6 py-3 cursor-pointer hover:border-primary/40 transition-colors shrink-0">
        <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={handleFile}/>
        <span style={{ fontSize: 22 }}>📂</span>
        <div>
          <p className="text-sm font-medium">{csvName ?? "Carica un CSV di sinterizzazione"}</p>
          <p className="text-xs text-muted-foreground">START, ELAPSED_MINUTES, FASE, FILTERED_TEMP, T_INI, T_FIN, VELOCITA, SOSTA_MIN</p>
        </div>
        {csvName && <span className="ml-auto text-xs text-primary font-medium">✓ Caricato</span>}
      </div>

      {csvStats && (
        <div className="grid grid-cols-4 gap-3 shrink-0">
          {[
            { label:"Intervallo", value:`${csvStats.minMin}–${csvStats.maxMin} min` },
            { label:"Temp max",   value:`${csvStats.maxTemp}°C` },
            { label:"Fasi",       value:csvStats.fasi.map(f=>`F${f}`).join(" → ") },
            { label:"Punti",      value:`${csvData.length}` },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-lg border border-border bg-card p-3">
              <p className="text-xs text-muted-foreground mb-1">{label}</p>
              <p className="text-xl font-semibold">{value}</p>
            </div>
          ))}
        </div>
      )}

      {csvData.length > 0 && (
        <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
          {/* Globale */}
          <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between shrink-0">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Curva completa</span>
              <span className="text-xs text-muted-foreground">{csvStats?.minMin}–{maxMin} min</span>
            </div>
            <LineControls toggles={toggles} setToggles={setToggles}/>
            <div className="flex-1 min-h-0">
              <GlobalChart data={csvData} maxX={maxMin} toggles={toggles}/>
            </div>
          </div>

          {/* Zoom */}
          <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between shrink-0">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Zoom — {zoomOffset}–{Math.min(zoomOffset+zoomWindow,maxMin)} min
              </span>
              <div className="flex gap-2">
                {[15,30,60].map(w=>(
                  <button key={w} onClick={()=>{setZoomWindow(w);setZoomOffset(Math.max(0,maxMin-w));}}
                    className={`px-2 py-0.5 rounded text-xs border transition-colors ${zoomWindow===w?"bg-primary/20 text-primary border-primary/40":"text-muted-foreground border-border"}`}>{w}m</button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-muted-foreground w-8">{zoomOffset}</span>
              <input type="range" min={0} max={Math.max(0,maxMin-zoomWindow)} step={1}
                value={zoomOffset} onChange={e=>setZoomOffset(Number(e.target.value))} className="flex-1"/>
              <span className="text-xs text-muted-foreground w-10 text-right">{Math.min(zoomOffset+zoomWindow,maxMin)}</span>
            </div>
            <div className="flex-1 min-h-0">
              <ZoomChart data={zoomedData} windowMin={zoomWindow} toggles={toggles}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------
// Main page
// -----------------------------------------------------------------------
export default function Home() {
  const [tab,        setTab]        = useState<"live" | "storico">("live");
  const [start,      setStart]      = useState(0);
  const [ready,      setReady]      = useState(false);
  const [allarme,    setAllarme]    = useState(0);
  const [transMode,  setTransMode]  = useState(0);
  const [live, setLive] = useState({ FASE:0, FILTERED_TEMP:0, T_TARGET:0, T_INI:0, T_FIN:0, PWM_PERCENT:0, MINUTI_TOTALI:0 });
  const [recipes,    setRecipes]    = useState<Recipes | null>(null);
  const [phases,     setPhases]     = useState<Phase[]>([]);
  const [recipeOpen, setRecipeOpen] = useState(false);
  const [chartData,  setChartData]  = useState<ChartPoint[]>([]);
  const [zoomWindow, setZoomWindow] = useState(30);
  const [toggles,    setToggles]    = useState<LineToggles>({ target: true, t_fin: true, t_ini: false });

  useEffect(() => {
    Promise.all([
      fetch("/api/plc?op=M&index=2").then(r=>r.json()),
      fetch("/api/plc?op=M&index=4").then(r=>r.json()),
      fetch("/api/plc?op=M&index=5").then(r=>r.json()),
    ]).then(([d2,d4,d5])=>{
      setStart(    d2?.OPERANDS?.MSINGLE?.[0]?.V??0);
      setTransMode(d4?.OPERANDS?.MSINGLE?.[0]?.V??0);
      setAllarme(  d5?.OPERANDS?.MSINGLE?.[0]?.V??0);
    }).catch(()=>{}).finally(()=>setReady(true));
  }, []);

  useEffect(() => {
    let active=true, isPolling=false;
    const poll = async () => {
      if (isPolling) return; isPolling=true;
      try {
        const [r1,r2,r3,r4] = await Promise.all([
          fetch("/api/plc?op=MD&index=201,216").then(r=>r.json()),
          fetch("/api/plc?op=MB&index=200").then(r=>r.json()),
          fetch("/api/plc?op=MD&index=248,248").then(r=>r.json()),
          fetch("/api/plc?op=M&index=4,5").then(r=>r.json()),
        ]);
        if (!active) return;
        const range1=r1?.OPERANDS?.MDRANGE?.[0], range3=r3?.OPERANDS?.MDRANGE?.[0];
        const fase=r2?.OPERANDS?.MBSINGLE?.[0]?.V??0;
        for (const bit of (r4?.OPERANDS?.MSINGLE??[])) {
          if (bit.INDEX===4) setTransMode(bit.V??0);
          if (bit.INDEX===5) setAllarme(bit.V??0);
        }
        const vals1=range1?decodeMD(range1.V,range1.START):{};
        const vals3=range3?decodeMD(range3.V,range3.START):{};
        const filteredTemp=vals3[248]??0, target=vals1[209]??0, t_ini=vals1[202]??0, t_fin=vals1[203]??0, minutiTotali=vals1[212]??0;
        setLive({ FASE:fase, FILTERED_TEMP:filteredTemp, T_TARGET:target, T_INI:t_ini, T_FIN:t_fin, PWM_PERCENT:vals1[210]??0, MINUTI_TOTALI:minutiTotali });
        setChartData(prev => {
          const pt: ChartPoint = { minute:minutiTotali, temp:filteredTemp, target, t_ini, t_fin };
          if (prev.length>0 && prev[prev.length-1].minute===minutiTotali) return [...prev.slice(0,-1), pt];
          const next=[...prev, pt];
          return next.length>1800?next.slice(-1800):next;
        });
      } catch {} finally { isPolling=false; }
    };
    poll(); const id=setInterval(poll,2000);
    return ()=>{ active=false; clearInterval(id); };
  }, []);

  useEffect(() => {
    fetch("/api/plc?op=recipes").then(r=>r.json()).then((data:Recipes)=>{
      setRecipes(data); setPhases(data.custom?.phases??data.default.phases);
    });
  }, []);

  const toggleStart = async () => {
    const nv=start===0?1:0;
    if (nv===1) setChartData([]);
    await Promise.all([
      fetch("/api/plc",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({op:"M",index:2,value:nv})}),
      fetch("/api/python",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:nv===1?"start":"stop"})}),
    ]);
    setStart(nv);
  };

  const resetAllarme = async () => {
    await fetch("/api/plc",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({op:"M",index:5,value:0})});
    setAllarme(0);
  };

  const updatePlc     = () => fetch("/api/plc",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"update_recipe",phases})});
  const saveAndUpdate = async () => {
    await fetch("/api/plc",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"save_recipe",phases})});
    const data=await fetch("/api/plc?op=recipes").then(r=>r.json());
    setRecipes(data);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Tab bar */}
      <div className="shrink-0 flex gap-1 px-5 pt-3 border-b border-border">
        {(["live","storico"] as const).map(t=>(
          <button key={t} onClick={()=>setTab(t)}
            className={`px-5 py-2 rounded-t text-sm font-medium transition-colors border-b-2 ${
              tab===t?"border-primary text-primary bg-card":"border-transparent text-muted-foreground hover:text-foreground"
            }`}>
            {t==="live"?"⚡ Live":"📂 Storico"}
          </button>
        ))}
      </div>

      {tab==="storico" && <div className="flex-1 min-h-0 overflow-hidden"><HistoricalView/></div>}

      {tab==="live" && (
        <div className="flex-1 min-h-0 flex overflow-hidden">
          {/* Sidebar */}
          <aside className="w-60 shrink-0 flex flex-col gap-3 p-4 border-r border-border overflow-y-auto">
            {allarme===1 && (
              <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2">
                <p className="text-xs font-semibold text-red-400 mb-1">⚠ ALLARME TIMEOUT</p>
                <p className="text-xs text-red-400/70 mb-2">Rampa congelata, forno ON</p>
                <button onClick={resetAllarme} className="w-full px-2 py-1 rounded text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/40">Reset</button>
              </div>
            )}
            <button onClick={toggleStart} disabled={!ready} suppressHydrationWarning
              className={`w-full py-3 rounded-lg font-bold text-base transition-colors disabled:opacity-40 ${
                start===1?"bg-red-500/20 text-red-400 border border-red-500/40":"bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
              }`}>
              {!ready?"...":start===1?"⏹ STOP":"▶ START"}
            </button>
            <div className={`w-full text-center py-2 rounded-lg text-xs font-bold border ${
              transMode===1?"bg-amber-500/10 text-amber-400 border-amber-500/30":"bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
            }`}>
              {transMode===1?"TRASFORMATORE":"INVERTER"}
            </div>
            <div className="flex flex-col gap-2">
              {[
                { label:"Temp. pirometro", value:`${live.FILTERED_TEMP}`, unit:"°C",  color:"#f87171" },
                { label:"Setpoint mobile",  value:`${live.T_TARGET}`,      unit:"°C",  color:"#34d399" },
                { label:"T_FIN fase",       value:`${live.T_FIN}`,         unit:"°C",  color:"#fb923c" },
                { label:"T_INI fase",       value:`${live.T_INI}`,         unit:"°C",  color:"#94a3b8" },
                { label:"Fase attiva",      value:`${live.FASE}`,          unit:"/6",  color:"#a78bfa" },
                { label:"Potenza MW",       value:`${live.PWM_PERCENT}`,   unit:"%",   color:"#60a5fa" },
                { label:"Minuti totali",    value:`${live.MINUTI_TOTALI}`, unit:"min", color:"#64748b" },
              ].map(({ label, value, unit, color }) => (
                <div key={label} className="rounded-lg border border-border bg-card px-3 py-2">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-xl font-bold" style={{ color }}>
                    {value}<span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>
                  </p>
                </div>
              ))}
              {live.FASE > 0 && (
                <div className="rounded-lg border border-border bg-card px-3 py-2">
                  <p className="text-xs text-muted-foreground">Errore (Δ)</p>
                  <p className={`text-xl font-bold ${live.T_TARGET-live.FILTERED_TEMP>0?"text-orange-400":"text-green-400"}`}>
                    {live.T_TARGET-live.FILTERED_TEMP>0?"+":""}{live.T_TARGET-live.FILTERED_TEMP}
                    <span className="text-sm font-normal text-muted-foreground ml-1">°C</span>
                  </p>
                </div>
              )}
            </div>
            {phases.length>0 && (
              <div className="flex flex-col gap-2">
                <button onClick={()=>setRecipeOpen(o=>!o)} className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <span>Ricetta</span><span>{recipeOpen?"▲":"▼"}</span>
                </button>
                {recipeOpen && (<>
                  <div className="flex gap-2">
                    {recipes?.custom && <button onClick={()=>setPhases(recipes.default.phases)} className="flex-1 text-xs text-muted-foreground underline">Default</button>}
                    {recipes?.custom && <button onClick={()=>setPhases(recipes.custom!.phases)} className="flex-1 text-xs text-muted-foreground underline">Custom</button>}
                  </div>
                  <table className="text-xs w-full border-collapse">
                    <thead><tr className="text-muted-foreground">
                      <th className="text-left py-1">F</th><th className="text-left py-1">Ini</th>
                      <th className="text-left py-1">Fin</th><th className="text-left py-1">V</th><th className="text-left py-1">S</th>
                    </tr></thead>
                    <tbody>{phases.map((p,i)=>(
                      <tr key={i} className="border-t border-border">
                        <td className="py-1 text-muted-foreground">{i+1}</td>
                        {(["t_ini","t_fin","vel","sosta"] as (keyof Phase)[]).map(field=>(
                          <td key={field} className="py-1 pr-1">
                            <input type="number" value={p[field]}
                              onChange={e=>{const u=[...phases];u[i]={...u[i],[field]:Number(e.target.value)};setPhases(u);}}
                              className="w-14 bg-input border border-border rounded px-1 py-0.5 text-xs"/>
                          </td>
                        ))}
                      </tr>
                    ))}</tbody>
                  </table>
                  <div className="flex gap-2">
                    <button onClick={updatePlc} className="flex-1 py-1.5 rounded text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/40">Aggiorna</button>
                    <button onClick={saveAndUpdate} className="flex-1 py-1.5 rounded text-xs font-medium bg-primary/20 text-cyan-300 border border-primary/40">Salva</button>
                  </div>
                </>)}
              </div>
            )}
          </aside>

          {/* Area grafici */}
          <main className="flex-1 min-w-0 flex flex-col p-4 gap-4 overflow-hidden">

            {/* Toggles condivisi per entrambi i grafici */}
            <div className="shrink-0 flex items-center gap-3">
              <span className="text-xs text-muted-foreground">Linee visibili:</span>
              <LineControls toggles={toggles} setToggles={setToggles}/>
            </div>

            {/* Grafico 1 */}
            <div className="flex-1 min-h-0 rounded-lg border border-border bg-card p-4 flex flex-col">
              <div className="flex items-center justify-between mb-2 shrink-0">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Vista globale — 0–300 min</span>
                <span className="text-xs text-muted-foreground">autoscala Y</span>
              </div>
              <div className="flex-1 min-h-0"><GlobalChart data={chartData} toggles={toggles}/></div>
            </div>

            {/* Grafico 2 */}
            <div className="flex-1 min-h-0 rounded-lg border border-border bg-card p-4 flex flex-col">
              <div className="flex items-center justify-between mb-2 shrink-0">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Vista zoom — ultimi {zoomWindow} min</span>
                <div className="flex gap-2">
                  {[15,30,60].map(w=>(
                    <button key={w} onClick={()=>setZoomWindow(w)}
                      className={`px-3 py-1 rounded text-xs border transition-colors ${zoomWindow===w?"bg-primary/20 text-primary border-primary/40":"text-muted-foreground border-border"}`}>{w}m</button>
                  ))}
                </div>
              </div>
              <div className="flex-1 min-h-0"><ZoomChart data={chartData} windowMin={zoomWindow} toggles={toggles}/></div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}