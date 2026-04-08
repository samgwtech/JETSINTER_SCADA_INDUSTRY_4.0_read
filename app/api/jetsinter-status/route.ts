import { NextResponse } from "next/server";

export async function GET() {
  const status = process.env.JETSINTER_STATUS;
  return NextResponse.json({ on: status === "1" });
}
