// app/api/python/route.ts
// Lancia / ferma chart.py come processo figlio
import { spawn, ChildProcess } from "child_process";
import path from "path";

// Stato condiviso a livello di modulo (persiste tra le richieste nello stesso worker)
let proc: ChildProcess | null = null;

function isRunning(): boolean {
  return proc !== null && proc.exitCode === null;
}

// POST /api/python  { action: "start" | "stop" }
export async function POST(req: Request) {
  const { action } = await req.json();

  if (action === "start") {
    if (isRunning()) {
      return Response.json({ ok: true, status: "already_running", pid: proc!.pid });
    }

    const scriptPath = path.join(process.cwd(), "chart.py");
    proc = spawn("py", ["-3", scriptPath], {
      cwd: process.cwd(),
      stdio: "ignore",   // non blocca il processo Next.js con pipe buffer pieni
      detached: false,
    });

    proc.on("exit", () => { proc = null; });

    return Response.json({ ok: true, status: "started", pid: proc.pid });
  }

  if (action === "stop") {
    if (!isRunning()) {
      return Response.json({ ok: true, status: "not_running" });
    }
    proc!.kill("SIGTERM");
    proc = null;
    return Response.json({ ok: true, status: "stopped" });
  }

  return Response.json({ ok: false, error: "action must be 'start' or 'stop'" }, { status: 400 });
}

// GET /api/python  → stato corrente
export async function GET() {
  return Response.json({ running: isRunning(), pid: proc?.pid ?? null });
}
