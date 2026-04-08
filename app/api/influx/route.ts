import { NextRequest, NextResponse } from "next/server";

const INFLUXDB_URL = process.env.INFLUXDB_URL ?? "http://localhost:8086";
const INFLUXDB_TOKEN = process.env.INFLUXDB_TOKEN ?? "";
const INFLUXDB_ORG = process.env.INFLUXDB_ORG ?? "jetsinter";
const INFLUXDB_BUCKET = process.env.INFLUXDB_BUCKET ?? "measurements";

/**
 * GET /api/influx?machine_id=machine_01&range=-1h
 *
 * Query params:
 *   machine_id  — which machine to query (default: all machines)
 *   range       — InfluxDB relative range like -1h, -24h, -7d (default: -1h)
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const machineId = searchParams.get("machine_id");
  const range = searchParams.get("range") ?? "-1h";

  const machineFilter = machineId
    ? `|> filter(fn: (r) => r["machine_id"] == "${machineId}")`
    : "";

  const fluxQuery = `
from(bucket: "${INFLUXDB_BUCKET}")
  |> range(start: ${range})
  |> filter(fn: (r) => r["_measurement"] == "machine_measurement")
  ${machineFilter}
  |> filter(fn: (r) =>
      r["_field"] == "temperature" or
      r["_field"] == "mw_power" or
      r["_field"] == "elapsed_seconds" or
      r["_field"] == "machine_state"
  )
  |> pivot(rowKey: ["_time", "machine_id"], columnKey: ["_field"], valueColumn: "_value")
  |> sort(columns: ["_time"])
`;

  try {
    const response = await fetch(
      `${INFLUXDB_URL}/api/v2/query?org=${encodeURIComponent(INFLUXDB_ORG)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${INFLUXDB_TOKEN}`,
          "Content-Type": "application/vnd.flux",
          Accept: "application/csv",
        },
        body: fluxQuery,
      }
    );

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json(
        { error: `InfluxDB query failed: ${err}` },
        { status: response.status }
      );
    }

    const csv = await response.text();
    const rows = parseInfluxCSV(csv);
    return NextResponse.json({ rows });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

function parseInfluxCSV(csv: string): Record<string, unknown>[] {
  const lines = csv.split("\n").filter((l) => l.trim() && !l.startsWith("#"));
  if (lines.length < 2) return [];

  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const row: Record<string, unknown> = {};
    headers.forEach((h, i) => {
      const key = h.trim();
      const val = values[i]?.trim() ?? "";
      const num = Number(val);
      row[key] = val !== "" && Number.isFinite(num) ? num : val;
    });
    return row;
  });
}
