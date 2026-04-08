(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/lib/clientLogger.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "logger",
    ()=>logger
]);
const prefix = (tag)=>`[${tag}]`;
const logger = {
    system: (msg)=>console.log(prefix("SYSTEM"), msg),
    mw: (msg)=>console.log(prefix("MW"), msg),
    jetsinter: (msg)=>console.log(prefix("JETSINTER"), msg),
    error: (msg)=>console.error(prefix("ERROR"), msg)
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/components/ui/DashboardLayout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function DashboardLayout({ sidebar, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex bg-background text-text",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "w-37.5 shrink-0 p-1 overflow-auto",
                children: sidebar
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/components/ui/DashboardLayout.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 p-3 overflow-auto",
                children: children
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/components/ui/DashboardLayout.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/components/ui/DashboardLayout.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = DashboardLayout;
var _c;
__turbopack_context__.k.register(_c, "DashboardLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/lib/utils.ts [app-client] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-card text-card-foreground flex flex-col gap-2 rounded-xl border py-3 shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Card;
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-1 px-3", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c1 = CardHeader;
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/components/ui/card.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_c2 = CardTitle;
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/components/ui/card.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_c3 = CardDescription;
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-3", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/components/ui/card.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_c4 = CardContent;
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center px-3", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/components/ui/card.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_c5 = CardFooter;
;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "CardHeader");
__turbopack_context__.k.register(_c2, "CardTitle");
__turbopack_context__.k.register(_c3, "CardDescription");
__turbopack_context__.k.register(_c4, "CardContent");
__turbopack_context__.k.register(_c5, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/components/ui/ChartComponent.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChartComponent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$auto$2f$auto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/chart.js/auto/auto.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/components/ui/card.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/* eslint-disable react-hooks/exhaustive-deps */ "use client";
;
;
;
function ChartComponent({ name_measurement, unit, labels, data, unitOfTime, max_x_axis, onHoverIndex, color, tickStep = 1, graphHeight }) {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChartComponent.useEffect": ()=>{
            const ctx = canvasRef.current?.getContext("2d");
            if (!ctx) return;
            const chart = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$auto$2f$auto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"](ctx, {
                type: "line",
                data: {
                    labels,
                    datasets: [
                        {
                            label: unit,
                            data,
                            borderColor: "text-blue-400",
                            backgroundColor: color,
                            borderWidth: 1.5,
                            tension: 0.3,
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "top"
                        }
                    },
                    scales: {
                        x: {
                            // Category axis by default
                            min: 0,
                            max: labels.length ? labels[labels.length - 1] : 0,
                            title: {
                                display: true,
                                text: `Time (${unitOfTime})`
                            },
                            ticks: {
                                // Show a label only when the index is a multiple of tickStep
                                callback: {
                                    "ChartComponent.useEffect": function(val, index) {
                                        return index % tickStep === 0 ? this.getLabelForValue(Number(val)) : "";
                                    }
                                }["ChartComponent.useEffect"]
                            }
                        },
                        y: {
                            min: 0,
                            max: max_x_axis,
                            title: {
                                display: true,
                                text: name_measurement
                            }
                        }
                    },
                    onHover: {
                        "ChartComponent.useEffect": (_, elements)=>{
                            if (elements?.length && onHoverIndex) {
                                onHoverIndex(elements[0].index);
                            }
                        }
                    }["ChartComponent.useEffect"]
                }
            });
            const leaveHandler = {
                "ChartComponent.useEffect.leaveHandler": ()=>onHoverIndex?.(-1)
            }["ChartComponent.useEffect.leaveHandler"];
            canvasRef.current?.addEventListener("mouseleave", leaveHandler);
            return ({
                "ChartComponent.useEffect": ()=>{
                    chart.destroy();
                    canvasRef.current?.removeEventListener("mouseleave", leaveHandler);
                }
            })["ChartComponent.useEffect"];
        }
    }["ChartComponent.useEffect"], [
        labels,
        data,
        unit,
        name_measurement,
        max_x_axis,
        unitOfTime,
        color,
        onHoverIndex,
        tickStep
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "w-full shadow",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-50 ml-50 p-10 absolute opacity-40",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "w-50 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
                    children: name_measurement.toUpperCase()
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/components/ui/ChartComponent.tsx",
                    lineNumber: 116,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/components/ui/ChartComponent.tsx",
                lineNumber: 115,
                columnNumber: 11
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {}, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/components/ui/ChartComponent.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                    ref: canvasRef,
                    className: "bg-white rounded",
                    height: graphHeight ?? 210
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/components/ui/ChartComponent.tsx",
                    lineNumber: 121,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/components/ui/ChartComponent.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/components/ui/ChartComponent.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
}
_s(ChartComponent, "UJgi7ynoup7eqypjnwyX/s32POg=");
_c = ChartComponent;
var _c;
__turbopack_context__.k.register(_c, "ChartComponent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$lib$2f$clientLogger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/lib/clientLogger.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$components$2f$ui$2f$DashboardLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/components/ui/DashboardLayout.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$components$2f$ui$2f$ChartComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/components/ui/ChartComponent.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Disable TLS cert validation globally (use with caution!)
function toTimeLabel(sec) {
    const s = Math.max(0, Math.floor(sec));
    const mm = Math.floor(s / 60);
    const ss = s % 60;
    return `${mm}:${String(ss).padStart(2, "0")}`;
}
function num(v) {
    const n = typeof v === "string" ? Number(v) : v;
    return Number.isFinite(n) ? n : 0;
}
function getAt(arr, idx, fallback = 0) {
    return idx >= 0 && idx < arr.length ? arr[idx] : fallback;
}
function avg(arr) {
    if (!arr.length) return 0;
    let s = 0;
    for (const v of arr)s += v;
    return s / arr.length;
}
function Home() {
    _s();
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$lib$2f$clientLogger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].system("Dashboard loaded");
    const [isRunning, setIsRunning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [chillerOn, setChillerOn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [chillerLoading, setChillerLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [chillerTurnOff, setChillerTurnOff] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [chillerStartLoading, setChillerStartLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [recipeValue, setRecipeValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(' ');
    const [recipeAddress, setRecipeAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('1');
    const handleSetRecipe = async ()=>{
        await fetch("/api/update-env", {
            method: "POST",
            body: JSON.stringify({
                index: recipeAddress,
                value: recipeValue
            })
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$lib$2f$clientLogger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].mw(`Recipe set to ${recipeValue} at address ${recipeAddress}`);
        console.log(`Recipe set to ${recipeValue} at address ${recipeAddress}`);
        await fetch('/api/recipe', {
            method: 'POST'
        });
        setRecipeValue(' ');
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$lib$2f$clientLogger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].mw(`Recipe value updated`);
        console.log(`Recipe value updated`);
    };
    const handleJetsinterTurnOff = async ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$lib$2f$clientLogger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].jetsinter(`Turning off chiller...`);
        setChillerTurnOff(true);
        try {
            const res = await fetch('/api/python/jetsinterOff', {
                method: 'POST'
            });
            const data = await res.json();
            console.log(data.success ? 'Jetsinter Stopped!' : data.error);
            __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$lib$2f$clientLogger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].jetsinter(`Jetsinter turned off: ${data.success ? 'Success' : 'Failed'}`);
        } catch (e) {
            console.error(e);
        }
        setChillerTurnOff(false);
    };
    const handleJetsinterClick = async ()=>{
        setChillerStartLoading(true);
        try {
            const res = await fetch('/api/python/chiller', {
                method: 'POST'
            });
            const data = await res.json();
            console.log(data.success ? 'Chiller started!' : data.error);
        } catch (e) {
            console.error(e);
        }
        setChillerStartLoading(false);
    };
    const startMeasurement = async ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$lib$2f$clientLogger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].system(`Starting measurement...`);
        try {
            await fetch("/api/python/start", {
                method: "POST"
            });
            setIsRunning(true);
            setMode("real");
        } catch (e) {
            console.error("Failed to start", e);
        }
    };
    const stopMeasurement = async ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$lib$2f$clientLogger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].system(`Stopping measurement...`);
        try {
            await fetch("/api/python/stop", {
                method: "POST"
            });
            setIsRunning(false);
            setMode(null);
        } catch (e) {
            console.error("Failed to stop", e);
        }
    };
    const startTraining = async ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$lib$2f$clientLogger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].system(`Starting training mode...`);
        try {
            await fetch("/api/python/training", {
                method: "POST"
            });
            setIsRunning(true);
            setMode("training");
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$lib$2f$clientLogger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].error(`Failed to start training mode: ${e instanceof Error ? e.message : 'Unknown error'}`);
            console.error("Failed to start training", e);
        }
    };
    const [hoverIndex, setHoverIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(-1);
    const [viewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("grid");
    const [activeChart, setActiveChart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Data
    const [timeLabels, setTimeLabels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [pressureData, setPressureData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Cassetti
    const [temp1Data, setTemp1Data] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [mwPower1Data, setMwPower1Data] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [temp2Data, setTemp2Data] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [mwPower2Data, setMwPower2Data] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [temp3Data, setTemp3Data] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [mwPower3Data, setMwPower3Data] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [temp4Data, setTemp4Data] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [mwPower4Data, setMwPower4Data] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [temp5Data, setTemp5Data] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [mwPower5Data, setMwPower5Data] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [temp6Data, setTemp6Data] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [mwPower6Data, setMwPower6Data] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const fetchCsv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Home.useCallback[fetchCsv]": async ()=>{
            setError(null);
            try {
                const res = await fetch("/api/csv", {
                    cache: "no-store"
                });
                if (!res.ok) throw new Error(`CSV API failed: ${res.status}`);
                const data = await res.json();
                const cols = data.columns;
                const secCol = (cols[0] ?? []).map({
                    "Home.useCallback[fetchCsv].secCol": (v)=>num(v)
                }["Home.useCallback[fetchCsv].secCol"]);
                const pCol = (cols[2] ?? []).map({
                    "Home.useCallback[fetchCsv].pCol": (v)=>num(v)
                }["Home.useCallback[fetchCsv].pCol"]);
                const t1Col = (cols[3] ?? []).map({
                    "Home.useCallback[fetchCsv].t1Col": (v)=>num(v) / 10
                }["Home.useCallback[fetchCsv].t1Col"]);
                const mwPower1Col = (cols[4] ?? []).map({
                    "Home.useCallback[fetchCsv].mwPower1Col": (v)=>num(v)
                }["Home.useCallback[fetchCsv].mwPower1Col"]);
                const t2Col = (cols[5] ?? []).map({
                    "Home.useCallback[fetchCsv].t2Col": (v)=>num(v) / 10
                }["Home.useCallback[fetchCsv].t2Col"]);
                const mwPower2Col = (cols[6] ?? []).map({
                    "Home.useCallback[fetchCsv].mwPower2Col": (v)=>num(v)
                }["Home.useCallback[fetchCsv].mwPower2Col"]);
                const t3Col = (cols[7] ?? []).map({
                    "Home.useCallback[fetchCsv].t3Col": (v)=>num(v) / 10
                }["Home.useCallback[fetchCsv].t3Col"]);
                const mwPower3Col = (cols[8] ?? []).map({
                    "Home.useCallback[fetchCsv].mwPower3Col": (v)=>num(v)
                }["Home.useCallback[fetchCsv].mwPower3Col"]);
                const t4Col = (cols[9] ?? []).map({
                    "Home.useCallback[fetchCsv].t4Col": (v)=>num(v) / 10
                }["Home.useCallback[fetchCsv].t4Col"]);
                const mwPower4Col = (cols[10] ?? []).map({
                    "Home.useCallback[fetchCsv].mwPower4Col": (v)=>num(v)
                }["Home.useCallback[fetchCsv].mwPower4Col"]);
                const t5Col = (cols[11] ?? []).map({
                    "Home.useCallback[fetchCsv].t5Col": (v)=>num(v) / 10
                }["Home.useCallback[fetchCsv].t5Col"]);
                const mwPower5Col = (cols[12] ?? []).map({
                    "Home.useCallback[fetchCsv].mwPower5Col": (v)=>num(v)
                }["Home.useCallback[fetchCsv].mwPower5Col"]);
                const t6Col = (cols[13] ?? []).map({
                    "Home.useCallback[fetchCsv].t6Col": (v)=>num(v) / 10
                }["Home.useCallback[fetchCsv].t6Col"]);
                const mwPower6Col = (cols[14] ?? []).map({
                    "Home.useCallback[fetchCsv].mwPower6Col": (v)=>num(v)
                }["Home.useCallback[fetchCsv].mwPower6Col"]);
                __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$lib$2f$clientLogger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].system(`CSV data fetched successfully with ${secCol.length} entries`);
                __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$lib$2f$clientLogger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].system(`Sample data - Time: ${getAt(secCol, 0)}s, Pressure: ${getAt(pCol, 0)}mbar, Temp1: ${getAt(t1Col, 0)}°C, MW Power1: ${getAt(mwPower1Col, 0)}%`);
                __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$lib$2f$clientLogger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].system(`CSV columns - Time: ${secCol.length} entries, Pressure: ${pCol.length} entries, Temp1: ${t1Col.length} entries, MW Power1: ${mwPower1Col.length} entries`);
                setTimeLabels(secCol.map(toTimeLabel));
                setPressureData(pCol);
                setTemp1Data(t1Col);
                setMwPower1Data(mwPower1Col);
                setTemp2Data(t2Col);
                setMwPower2Data(mwPower2Col);
                setTemp3Data(t3Col);
                setMwPower3Data(mwPower3Col);
                setTemp4Data(t4Col);
                setMwPower4Data(mwPower4Col);
                setTemp5Data(t5Col);
                setMwPower5Data(mwPower5Col);
                setTemp6Data(t6Col);
                setMwPower6Data(mwPower6Col);
            } catch (e) {
                __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$lib$2f$clientLogger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].error(`Error fetching CSV data: ${e instanceof Error ? e.message : 'Unknown error'}`);
                const msg = e instanceof Error ? e.message : "Unknown fetch error";
                setError(msg);
                __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$lib$2f$clientLogger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].error(`Failed to fetch CSV data: ${msg}`);
                console.error("Data fetch error 🤕", e);
            } finally{
                setLoading(false);
            }
        }
    }["Home.useCallback[fetchCsv]"], []);
    // Fetch once on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$lib$2f$clientLogger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].system(`Fetching initial CSV data...`);
            fetchCsv();
        }
    }["Home.useEffect"], [
        fetchCsv
    ]);
    // Polling for CSV updates
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const id = setInterval(fetchCsv, 2500);
            return ({
                "Home.useEffect": ()=>clearInterval(id)
            })["Home.useEffect"];
        }
    }["Home.useEffect"], [
        fetchCsv
    ]);
    const charts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[charts]": ()=>[
                {
                    name: "",
                    max: 100,
                    unit: "Temp Cassetto 1 (°C)",
                    data: temp1Data,
                    color: "rgba(150, 70, 54, 0.5)"
                },
                {
                    name: "",
                    max: 4095,
                    unit: "MW Power Cassetto 1 (%)",
                    data: mwPower1Data,
                    color: "rgba(98,131,149,0.5)"
                }
            ]
    }["Home.useMemo[charts]"], [
        temp1Data,
        mwPower1Data,
        temp2Data,
        mwPower2Data,
        temp3Data,
        mwPower3Data,
        temp4Data,
        mwPower4Data,
        temp5Data,
        mwPower5Data,
        temp6Data,
        mwPower6Data
    ]);
    // Keyboard + wheel nav in SINGLE view
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            if (viewMode !== "single") return;
            const onKeyDown = {
                "Home.useEffect.onKeyDown": (e)=>{
                    if (e.key === "ArrowLeft") {
                        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$lib$2f$clientLogger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].system(`Left arrow pressed - switching to previous chart`);
                        setActiveChart({
                            "Home.useEffect.onKeyDown": (p)=>p === 0 ? charts.length - 1 : p - 1
                        }["Home.useEffect.onKeyDown"]);
                    }
                    if (e.key === "ArrowRight") {
                        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$lib$2f$clientLogger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].system(`Right arrow pressed - switching to next chart`);
                        setActiveChart({
                            "Home.useEffect.onKeyDown": (p)=>(p + 1) % charts.length
                        }["Home.useEffect.onKeyDown"]);
                    }
                }
            }["Home.useEffect.onKeyDown"];
            const onWheel = {
                "Home.useEffect.onWheel": (e)=>{
                    if (e.deltaY < 0) setActiveChart({
                        "Home.useEffect.onWheel": (p)=>(p + 1) % charts.length
                    }["Home.useEffect.onWheel"]);
                    else setActiveChart({
                        "Home.useEffect.onWheel": (p)=>p === 0 ? charts.length - 1 : p - 1
                    }["Home.useEffect.onWheel"]);
                }
            }["Home.useEffect.onWheel"];
            window.addEventListener("keydown", onKeyDown);
            window.addEventListener("wheel", onWheel, {
                passive: true
            });
            return ({
                "Home.useEffect": ()=>{
                    window.removeEventListener("keydown", onKeyDown);
                    window.removeEventListener("wheel", onWheel);
                }
            })["Home.useEffect"];
        }
    }["Home.useEffect"], [
        viewMode,
        charts.length
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$components$2f$ui$2f$DashboardLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        sidebar: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2 text-sm text-gray-400 pl-4 pt-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pt-4 space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleJetsinterClick,
                            disabled: chillerStartLoading,
                            className: "bg-green-600 px-3 py-1 rounded text-white disabled:opacity-50",
                            children: chillerStartLoading ? "Starting..." : "Accendi Jetsinter"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/app/page.tsx",
                            lineNumber: 274,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleJetsinterTurnOff,
                            disabled: chillerTurnOff,
                            className: "bg-green-600 px-3 py-1 rounded text-white disabled:opacity-50",
                            children: chillerStartLoading ? "Starting..." : "Spegni Jetsinter"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/app/page.tsx",
                            lineNumber: 280,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: startMeasurement,
                            className: "bg-green-600 px-3 py-1 rounded text-white",
                            children: "Start Measurement"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/app/page.tsx",
                            lineNumber: 286,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: stopMeasurement,
                            className: "bg-red-600 px-3 py-1 rounded text-white",
                            children: "Stop Measurement"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/app/page.tsx",
                            lineNumber: 290,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/app/page.tsx",
                    lineNumber: 273,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: startTraining,
                    className: "bg-blue-600 px-3 py-1 rounded text-white",
                    children: "Training Mode"
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/app/page.tsx",
                    lineNumber: 295,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "number",
                            placeholder: "MW Address (246)",
                            value: recipeAddress,
                            onChange: (e)=>setRecipeAddress(e.target.value),
                            className: "border p-2 mr-2"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/app/page.tsx",
                            lineNumber: 303,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "number",
                            placeholder: "Insert value",
                            value: recipeValue,
                            onChange: (e)=>setRecipeValue(e.target.value),
                            onKeyPress: (e)=>e.key === 'Enter' && handleSetRecipe(),
                            className: "border p-2 mr-2"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/app/page.tsx",
                            lineNumber: 310,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSetRecipe,
                            className: "bg-blue-500 text-white px-4 py-2",
                            children: "Set"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/app/page.tsx",
                            lineNumber: 318,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/app/page.tsx",
                    lineNumber: 302,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/app/page.tsx",
            lineNumber: 272,
            columnNumber: 9
        }, this),
        children: viewMode === "grid" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 gap-2",
            children: charts.map((ch, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$components$2f$ui$2f$ChartComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    name_measurement: ch.name,
                    max_x_axis: ch.max,
                    unit: ch.unit,
                    unitOfTime: "",
                    labels: timeLabels,
                    data: ch.data,
                    onHoverIndex: setHoverIndex,
                    color: ch.color,
                    graphHeight: 170
                }, i, false, {
                    fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/app/page.tsx",
                    lineNumber: 327,
                    columnNumber: 13
                }, this))
        }, void 0, false, {
            fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/app/page.tsx",
            lineNumber: 325,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "m-auto min-h-[156.25] flex justify-center items-center max-h-[187.5]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$JETSINTER__$2d$__INDUSTRY__4$2e$0__READY$2f$components$2f$ui$2f$ChartComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                name_measurement: charts[activeChart]?.name ?? "",
                max_x_axis: charts[activeChart]?.max ?? 100,
                unit: charts[activeChart]?.unit ?? "",
                unitOfTime: "sec",
                labels: timeLabels,
                data: charts[activeChart]?.data ?? [],
                onHoverIndex: setHoverIndex,
                color: charts[activeChart]?.color ?? "rgba(181, 114, 44, 0.25)",
                graphHeight: 200
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/app/page.tsx",
                lineNumber: 343,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/app/page.tsx",
            lineNumber: 342,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/OneDrive/Desktop/JETSINTER - INDUSTRY 4.0 READY/app/page.tsx",
        lineNumber: 270,
        columnNumber: 5
    }, this);
}
_s(Home, "UN5h///boFwJVHXG2okAR8k+yr0=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=OneDrive_Desktop_JETSINTER%20-%20INDUSTRY%204_0%20READY_0rixjaa._.js.map