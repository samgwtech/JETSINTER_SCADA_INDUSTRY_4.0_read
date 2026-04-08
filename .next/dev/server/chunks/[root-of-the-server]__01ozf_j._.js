module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/lib/pythonRunner.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setJetsinter",
    ()=>setJetsinter,
    "setRecipe",
    ()=>setRecipe,
    "start",
    ()=>start,
    "startTraining",
    ()=>startTraining,
    "stopProcess",
    ()=>stopProcess,
    "turnOffjetsinter",
    ()=>turnOffjetsinter
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$child_process__$5b$external$5d$__$28$child_process$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/child_process [external] (child_process, cjs)");
;
let processRef = null;
function setRecipe() {
    if (processRef) return;
    processRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$child_process__$5b$external$5d$__$28$child_process$2c$__cjs$29$__["spawn"])("python", [
        "recipe/setRecipe.py "
    ]);
    processRef.stdout.on("data", (d)=>{
        console.log("[SetRecipe]", d.toString());
    });
    processRef.stderr.on("data", (d)=>{
        console.error("[SetRecipe ERROR]", d.toString());
    });
    processRef.on("close", ()=>{
        processRef = null;
    });
}
function turnOffjetsinter() {
    if (processRef) return;
    processRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$child_process__$5b$external$5d$__$28$child_process$2c$__cjs$29$__["spawn"])("python", [
        "jetsinter/turnOffJetsinter.py"
    ]);
    processRef.stdout.on("data", (d)=>{
        console.log("[SetJetsinter]", d.toString());
    });
    processRef.stderr.on("data", (d)=>{
        console.error("[SetJetsinter ERROR]", d.toString());
    });
    processRef.on("close", ()=>{
        processRef = null;
    });
}
function setJetsinter() {
    if (processRef) return;
    processRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$child_process__$5b$external$5d$__$28$child_process$2c$__cjs$29$__["spawn"])("python", [
        "jetsinter/setJetsinter.py"
    ]);
    processRef.stdout.on("data", (d)=>{
        console.log("[Setjetsinter]", d.toString());
    });
    processRef.stderr.on("data", (d)=>{
        console.error("[Setjetsinter ERROR]", d.toString());
    });
    processRef.on("close", ()=>{
        processRef = null;
    });
}
function start() {
    if (processRef) return;
    processRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$child_process__$5b$external$5d$__$28$child_process$2c$__cjs$29$__["spawn"])("python", [
        "chart.py"
    ]);
    processRef.stdout.on("data", (d)=>{
        console.log("[REAL]", d.toString());
    });
    processRef.stderr.on("data", (d)=>{
        console.error("[REAL ERROR]", d.toString());
    });
    processRef.on("close", ()=>{
        processRef = null;
    });
}
function startTraining() {
    if (processRef) return;
    processRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$child_process__$5b$external$5d$__$28$child_process$2c$__cjs$29$__["spawn"])("python", [
        "training_chart.py",
        "--source",
        "csv/source.csv",
        "--interval",
        "10",
        "--loop"
    ]);
    processRef.stdout.on("data", (d)=>{
        console.log("[TRAINING]", d.toString());
    });
    processRef.stderr.on("data", (d)=>{
        console.error("[TRAINING ERROR]", d.toString());
    });
    processRef.on("close", ()=>{
        processRef = null;
    });
}
function stopProcess() {
    if (processRef) {
        processRef.kill();
        processRef = null;
    }
}
}),
"[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/app/api/python/jetsinterOff/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$lib$2f$pythonRunner$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/lib/pythonRunner.ts [app-route] (ecmascript)");
;
async function POST() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$lib$2f$pythonRunner$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["turnOffjetsinter"])();
    return Response.json({
        success: true
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__01ozf_j._.js.map