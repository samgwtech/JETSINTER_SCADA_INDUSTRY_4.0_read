module.exports = [
"[project]/instrumentation.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "register",
    ()=>register
]);
async function register() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const fs = (await __turbopack_context__.A("[externals]/fs [external] (fs, cjs, async loader)")).default;
    const path = (await __turbopack_context__.A("[externals]/path [external] (path, cjs, async loader)")).default;
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    async function syncJetsinterStatus() {
        const ip = process.env.IP_ADDRESS || "192.168.151.100";
        const apiKey = process.env.API_SECRET_KEY || "";
        const url = `https://${ip}/api/get/data?elm=M(2)`;
        try {
            const res = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${apiKey}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                const mMeasurements = data?.OPERANDS?.MSINGLE ?? [];
                const startBit = mMeasurements.find((m)=>m.INDEX === 2);
                const status = startBit?.V === 1 ? "1" : "0";
                if (process.env.JETSINTER_STATUS !== status) {
                    const envPath = path.join(process.cwd(), ".env");
                    let env = fs.readFileSync(envPath, "utf-8");
                    env = env.replace(/JETSINTER_STATUS=.*/, `JETSINTER_STATUS=${status}`);
                    fs.writeFileSync(envPath, env);
                    process.env.JETSINTER_STATUS = status;
                    console.log(`[plc-poll] Jetsinter status updated: ${status === "1" ? "ON" : "OFF"}`);
                }
            } else {
                console.warn(`[plc-poll] PLC status check failed: HTTP ${res.status}`);
            }
        } catch (e) {
            console.warn("[plc-poll] Could not reach PLC to check Jetsinter status:", e);
        }
    }
    await syncJetsinterStatus();
    setInterval(syncJetsinterStatus, 10_000);
}
}),
];

//# sourceMappingURL=instrumentation_ts_0zq9-xz._.js.map