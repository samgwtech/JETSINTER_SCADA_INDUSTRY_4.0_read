(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push(["chunks/_0vea.3c._.js",
"[project]/ [instrumentation-edge] (unsupported edge import 'fs', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`fs`));
}),
"[project]/ [instrumentation-edge] (unsupported edge import 'path', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`path`));
}),
"[project]/instrumentation.ts [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "register",
    ()=>register
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$instrumentation$2d$edge$5d$__$28$unsupported__edge__import__$27$fs$272c$__ecmascript$29$__ = __turbopack_context__.i("[project]/ [instrumentation-edge] (unsupported edge import 'fs', ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$instrumentation$2d$edge$5d$__$28$unsupported__edge__import__$27$path$272c$__ecmascript$29$__ = __turbopack_context__.i("[project]/ [instrumentation-edge] (unsupported edge import 'path', ecmascript)");
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
                const envPath = __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$instrumentation$2d$edge$5d$__$28$unsupported__edge__import__$27$path$272c$__ecmascript$29$__["default"].join(process.cwd(), ".env");
                let env = __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$instrumentation$2d$edge$5d$__$28$unsupported__edge__import__$27$fs$272c$__ecmascript$29$__["default"].readFileSync(envPath, "utf-8");
                env = env.replace(/JETSINTER_STATUS=.*/, `JETSINTER_STATUS=${status}`);
                __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$instrumentation$2d$edge$5d$__$28$unsupported__edge__import__$27$fs$272c$__ecmascript$29$__["default"].writeFileSync(envPath, env);
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
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
}),
"[project]/node_modules/next/dist/esm/build/templates/edge-wrapper.js { MODULE => \"[project]/instrumentation.ts [instrumentation-edge] (ecmascript)\" } [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

// The wrapped module could be an async module, we handle that with the proxy
// here. The comma expression makes sure we don't call the function with the
// module as the "this" arg.
// Turn exports into functions that are also a thenable. This way you can await the whole object
// or  exports (e.g. for Components) or call them directly as though they are async functions
// (e.g. edge functions/middleware, this is what the Edge Runtime does).
// Catch promise to prevent UnhandledPromiseRejectionWarning, this will be propagated through
// the awaited export(s) anyway.
self._ENTRIES ||= {};
const modProm = Promise.resolve().then(()=>__turbopack_context__.i("[project]/instrumentation.ts [instrumentation-edge] (ecmascript)"));
modProm.catch(()=>{});
self._ENTRIES["middleware_instrumentation"] = new Proxy(modProm, {
    get (innerModProm, name) {
        if (name === 'then') {
            return (res, rej)=>innerModProm.then(res, rej);
        }
        let result = (...args)=>innerModProm.then((mod)=>(0, mod[name])(...args));
        result.then = (res, rej)=>innerModProm.then((mod)=>mod[name]).then(res, rej);
        return result;
    }
});
}),
]);

//# sourceMappingURL=_0vea.3c._.js.map