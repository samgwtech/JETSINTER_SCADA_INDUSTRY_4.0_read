import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
   const { index, value } = await req.json();

   const envPath = path.join(process.cwd(), ".env");
   let env = fs.readFileSync(envPath, "utf-8");

   env = env.replace(/RECIPE_VALUE=.*/, `RECIPE_VALUE=${value}`);
   env = env.replace(/RECIPE_ADDRESS=.*/, `RECIPE_ADDRESS=${index}`);

   fs.writeFileSync(envPath, env);

   return NextResponse.json({ success: true });
}