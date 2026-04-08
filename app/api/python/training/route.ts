import { startTraining } from "@/lib/pythonRunner";

export async function POST() {
  startTraining();
  return Response.json({ success: true });
}
