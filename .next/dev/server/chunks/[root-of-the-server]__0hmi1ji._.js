module.exports = [
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/instrumentation.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "register",
    ()=>register
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
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
                const envPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), ".env");
                let env = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(envPath, "utf-8");
                env = env.replace(/JETSINTER_STATUS=.*/, `JETSINTER_STATUS=${status}`);
                __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(envPath, env);
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
async function register() {
    // Only run on the Node.js server (not in the Edge runtime)
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    // Initial sync at startup
    await syncJetsinterStatus();
    // Poll the PLC every 10 seconds to keep status in sync
    setInterval(syncJetsinterStatus, 10_000);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0hmi1ji._.js.map