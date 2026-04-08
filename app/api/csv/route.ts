import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export async function GET() {
  try {
    const latestPath = join(process.cwd(), "csv", "LATEST.txt");
    const latestFile = readFileSync(latestPath, "utf-8").trim();
    const filePath = join(process.cwd(), latestFile);
    const text = readFileSync(filePath, "utf-8");

    const rows = text
      .split("\n")
      .slice(1) // skip header row
      .filter((line) => line.trim() !== "")
      .map((line) => line.split(","));

    if (rows.length === 0) {
      return NextResponse.json({ columns: [] });
    }

    const numCols = Math.max(...rows.map((r) => r.length));
    const columns: (string | number)[][] = Array.from({ length: numCols }, () => []);

    for (const row of rows) {
      for (let c = 0; c < numCols; c++) {
        const raw = row[c]?.trim() ?? "";
        const n = Number(raw);
        columns[c].push(raw === "" || !Number.isFinite(n) ? raw : n);
      }
    }

    return NextResponse.json({ columns });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
