/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Card, CardContent } from "./card";

interface ChartProps {
  name_measurement: string;
  unit: string;
  labels: string[];
  data: number[];
  unitOfTime: string;
  max_x_axis: number;
  onHoverIndex?: (index: number) => void;
  color: string;
  tickStep?: number;
}

export default function ChartComponent({
  name_measurement,
  unit,
  labels,
  data,
  unitOfTime,
  max_x_axis,
  onHoverIndex,
  color,
  tickStep = 1,
}: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels,              // each item is a category label
        datasets: [
          {
            label: unit,
            data,             // Y-values
            borderColor: "text-blue-400",
            backgroundColor: color,
            borderWidth: 1.5,
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "#e2e8f0",
              font: { size: 12 },
            },
          },
        },
        scales: {
          x: {
            min: 0,
            max: labels.length ? labels[labels.length - 1] : 0,
            grid: { color: "rgba(255,255,255,0.07)" },
            title: {
              display: true,
              text: `Time (${unitOfTime})`,
              color: "#94a3b8",
              font: { size: 11 },
            },
            ticks: {
              color: "#cbd5e1",
              font: { size: 11 },
              callback: function (val, index) {
                return index % tickStep === 0 ? this.getLabelForValue(Number(val)) : "";
              },
            },
          },
          y: {
            min: 0,
            max: max_x_axis,
            grid: { color: "rgba(255,255,255,0.07)" },
            title: {
              display: true,
              text: name_measurement,
              color: "#94a3b8",
              font: { size: 11 },
            },
            ticks: {
              color: "#cbd5e1",
              font: { size: 11 },
            },
          },
        },
        onHover: (_, elements) => {
          if (elements?.length && onHoverIndex) {
            onHoverIndex(elements[0].index);
          }
        },
      },
    });

    const leaveHandler = () => onHoverIndex?.(-1);
    canvasRef.current?.addEventListener("mouseleave", leaveHandler);

    return () => {
      chart.destroy();
      canvasRef.current?.removeEventListener("mouseleave", leaveHandler);
    };
  }, [
    labels,
    data,
    unit,
    name_measurement,
    max_x_axis,
    unitOfTime,
    color,
    onHoverIndex,
    tickStep,
  ]);

  const latestTemp = data[data.length - 1];
  const latestTime = labels[labels.length - 1];
  const hasData = data.length > 0 && latestTemp !== undefined;

  return (
    <Card className="w-full shadow">
      <CardContent>
        <div className="relative">
          <canvas ref={canvasRef} className="rounded-lg" />
          {hasData && (
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ paddingBottom: "30px", paddingLeft: "50px" }}
            >
              <div
                style={{
                  background: "rgba(10, 12, 20, 0.75)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px",
                  padding: "8px 20px",
                  textAlign: "center",
                  lineHeight: 1.4,
                }}
              >
                <div style={{ color: "rgba(150, 70, 54, 1)", fontSize: "24px", fontWeight: "bold" }}>
                  TEMPERATURA: {latestTemp.toFixed(1)} °C
                </div>
                <div style={{ color: "#94a3b8", fontSize: "14px" }}>
                  TEMPO TRASCORSO: {latestTime}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
