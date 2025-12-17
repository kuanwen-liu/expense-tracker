"use client";

import { useState } from "react";
import { MaterialIcon } from "../shared/material-icon";

interface SpendingHistoryChartProps {
  data?: { date: string; amount: number }[];
}

export function SpendingHistoryChart({ data = [] }: SpendingHistoryChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; amount: number; date: string } | null>(null);
  // If no data, show empty state
  if (data.length === 0) {
    return (
      <div className="lg:col-span-2 bg-card rounded-xl border border-border shadow-sm p-6 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-bold">Spending History</h3>
            <p className="text-sm text-muted-foreground">Daily spending over time</p>
          </div>
        </div>
        <div className="flex-1 min-h-[250px] flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <MaterialIcon icon="show_chart" className="text-5xl mb-2" />
            <p>No spending data yet</p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate chart dimensions
  const width = 800;
  const height = 200;
  const padding = 10;

  // Find max amount for scaling
  const maxAmount = Math.max(...data.map((d) => d.amount), 1);

  // Generate points for the line
  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1 || 1)) * (width - padding * 2);
    const y = height - (d.amount / maxAmount) * (height - padding * 2) - padding;
    return { x, y, amount: d.amount, date: d.date };
  });

  // Generate SVG path for line
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  // Generate SVG path for area (filled)
  const areaPath = `${linePath} L${points[points.length - 1]?.x || 0},${height} L${padding},${height} Z`;

  // Generate x-axis labels (show ~7 labels)
  const labelIndices: number[] = [];
  const step = Math.max(1, Math.floor(data.length / 6));
  for (let i = 0; i < data.length; i += step) {
    labelIndices.push(i);
  }
  if (!labelIndices.includes(data.length - 1) && data.length > 1) {
    labelIndices.push(data.length - 1);
  }

  return (
    <div className="lg:col-span-2 bg-card rounded-xl border border-border shadow-sm p-6 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold">Spending History</h3>
          <p className="text-sm text-muted-foreground">Daily spending over time</p>
        </div>
        <button className="p-2 hover:bg-accent rounded-lg transition-colors">
          <MaterialIcon icon="more_horiz" className="text-muted-foreground" />
        </button>
      </div>

      <div className="flex-1 w-full min-h-[250px] relative" onMouseLeave={() => setHoveredPoint(null)}>
        {/* SVG Line Chart */}
        <svg className="w-full h-full" viewBox={`0 0 ${width} ${height + 20}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid Lines */}
          <line x1="0" y1={height * 0.25} x2={width} y2={height * 0.25} stroke="hsl(var(--border))" strokeDasharray="4 4" strokeWidth="1" />
          <line x1="0" y1={height * 0.5} x2={width} y2={height * 0.5} stroke="hsl(var(--border))" strokeDasharray="4 4" strokeWidth="1" />
          <line x1="0" y1={height * 0.75} x2={width} y2={height * 0.75} stroke="hsl(var(--border))" strokeDasharray="4 4" strokeWidth="1" />

          {/* Area */}
          <path d={areaPath} fill="url(#chartGradient)" />

          {/* Line */}
          <path
            d={linePath}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points with hover */}
          {points.map((p, i) => (
            <g key={i}>
              {/* Invisible larger circle for easier hovering */}
              <circle
                cx={p.x}
                cy={p.y}
                r="12"
                fill="transparent"
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHoveredPoint(p)}
              />
              {/* Visible circle */}
              <circle
                cx={p.x}
                cy={p.y}
                r={hoveredPoint === p ? "6" : "4"}
                fill="hsl(var(--primary))"
                stroke="hsl(var(--card))"
                strokeWidth="2"
                style={{ cursor: "pointer", pointerEvents: "none" }}
              />
            </g>
          ))}
        </svg>

        {/* Tooltip on hover */}
        {hoveredPoint && (
          <div
            className="absolute bg-foreground text-background text-xs py-1.5 px-3 rounded pointer-events-none shadow-lg font-medium"
            style={{
              left: `${(hoveredPoint.x / width) * 100}%`,
              top: `${(hoveredPoint.y / (height + 20)) * 100 - 10}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div>${hoveredPoint.amount.toFixed(2)}</div>
            <div className="text-[10px] opacity-75 mt-0.5">
              {new Date(hoveredPoint.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </div>
          </div>
        )}
      </div>

      {/* X Axis Labels */}
      <div className="flex justify-between mt-4 text-xs text-muted-foreground font-medium px-2">
        {labelIndices.map((i) => (
          <span key={i}>
            {new Date(data[i].date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </span>
        ))}
      </div>
    </div>
  );
}
