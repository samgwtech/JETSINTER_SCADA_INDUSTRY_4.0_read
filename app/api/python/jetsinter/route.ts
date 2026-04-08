import { setJetsinter } from "@/lib/pythonRunner";

export async function POST() {
  setJetsinter();
  return Response.json({ success: true });
}
