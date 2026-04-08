// app/api/python/start/route.ts
import { start } from "@/lib/pythonRunner";

export async function POST() {

   console.log("Starting Data Collection...");
   start();

   return Response.json({ running: true });
}