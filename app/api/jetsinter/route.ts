export async function POST(request: Request) {
  try {
    const { newValue } = await request.json();
    console.log("🔒 Jetsinter value:", newValue);
    // Disable cert validation for this request
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';

    const APIKEY = process.env.API_SECRET_KEY || "your_api_key_here";

    const res = await fetch(`http://192.168.151.100/api/set/op?op=MW&index=1&val=69`, {
      method: "POST",
      headers: {"Authorization": `Bearer ${APIKEY}`}
    });

    const text = await res.text();
    console.log("✅ Status:", res.status, "Response:", text);
    return Response.json({ status: res.status, body: text });
  } catch (e) {
    console.error("❌ Error:", e);
    return Response.json({ error: String(e) }, { status: 500 });
  }
}