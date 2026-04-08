import { NextResponse } from "next/server";
import { setRecipe } from "@/lib/pythonRunner";

export async function POST() {
   try {
    await setRecipe();
   return NextResponse.json({ success: true });
   } catch (error) {
   return NextResponse.json({ error: String(error) }, { status: 500 });
   }
}