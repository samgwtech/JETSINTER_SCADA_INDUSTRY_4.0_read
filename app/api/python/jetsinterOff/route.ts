import { turnOffjetsinter } from "@/lib/pythonRunner";

export async function POST() {
  turnOffjetsinter();
  return Response.json({ success: true });
}
