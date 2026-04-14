// app/api/plc/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs   from "fs";
import path from "path";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const PLC_BASE = `https://${process.env.PLC_IP ?? "192.168.151.100"}`;
const APIKEY   = process.env.API_SECRET_KEY ?? "";
const HEADERS  = { Authorization: `Bearer ${APIKEY}` };

const RECIPES_PATH = path.join(process.cwd(), "settings", "recipes.json");

// GET /api/plc?op=M&index=2
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const op    = searchParams.get("op");
  const index = searchParams.get("index");

  // GET /api/plc?op=recipes  → ritorna il JSON ricette
  if (op === "recipes") {
    const raw  = fs.readFileSync(RECIPES_PATH, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  }

  console.log(`GET request for op=${op} index=${index}`);
  const res  = await fetch(`${PLC_BASE}/api/get/data?elm=${op}(${index})`, { headers: HEADERS });
  const data = await res.json();
  return NextResponse.json(data);
}

// POST /api/plc
// action: "set"            → scrive singolo valore nel PLC
// action: "update_recipe"  → scrive fasi nel PLC senza salvare
// action: "save_recipe"    → salva come custom nel JSON e scrive nel PLC
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action } = body;

  // --- Singolo SET (comportamento precedente) ---
  if (!action || action === "set") {
    const { op, index, value } = body;
    const res = await fetch(`${PLC_BASE}/api/set/op?op=${op}&index=${index}&val=${value}`, {
      headers: HEADERS,
    });
    return NextResponse.json({ ok: res.ok, status: res.status });
  }

  // --- Scrivi ricetta nel PLC (update + opzionale save) ---
  if (action === "update_recipe" || action === "save_recipe") {
    const { phases } = body as {
      phases: { t_ini: number; t_fin: number; vel: number; sosta: number }[];
    };

    // MD220-247: ogni fase occupa 4 MD (t_ini, t_fin, vel, sosta)
    const writes = phases.flatMap((p, i) => [
      { index: 220 + i * 4,     value: p.t_ini  },
      { index: 220 + i * 4 + 1, value: p.t_fin  },
      { index: 220 + i * 4 + 2, value: p.vel    },
      { index: 220 + i * 4 + 3, value: p.sosta  },
    ]);

    // Scrivi tutte le MD nel PLC in sequenza
    for (const { index, value } of writes) {
      await fetch(`${PLC_BASE}/api/set/op?op=MD&index=${index}&val=${value}`, {
        headers: HEADERS,
      });
    }

    // Se save_recipe → salva anche nel JSON
    if (action === "save_recipe") {
      const raw      = fs.readFileSync(RECIPES_PATH, "utf-8");
      const recipes  = JSON.parse(raw);
      recipes.custom = { name: "Custom", phases };
      fs.writeFileSync(RECIPES_PATH, JSON.stringify(recipes, null, 2));
    }

    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, error: "Unknown action" }, { status: 400 });
}