import { stopProcess } from "@/lib/pythonRunner";

export async function POST() {
  stopProcess();
  return Response.json({ success: true });
}
