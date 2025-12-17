"use client";

import { MaterialIcon } from "../shared/material-icon";

interface SpendingChartProps {
  data?: { date: string; amount: number }[];
}

export function SpendingChart({ data = [] }: SpendingChartProps) {
  // If no data, show empty state
  if (data.length === 0) {
    return (
      <div className="lg:col-span-2 bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold">Spending Trend</h3>
            <p className="text-sm text-muted-foreground">Daily spending over time</p>
          </div>
        </div>
        <div className="flex-1 min-h-[250px] flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <MaterialIcon icon="bar_chart" className="text-5xl mb-2" />
            <p>No spending data yet</p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate max for scaling
  const maxAmount = Math.max(...data.map((d) => d.amount), 1);

  // Format data for display
  const chartData = data.map((d) => ({
    day: new Date(d.date).getDate().toString(),
    amount: d.amount,
    height: Math.max(5, Math.round((d.amount / maxAmount) * 100)), // Min 5% height for visibility
  }));

  return (
    <div className="lg:col-span-2 bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold">Spending Trend</h3>
          <p className="text-sm text-muted-foreground">Daily spending over time</p>
        </div>
      </div>

      {/* Bar Chart Visual */}
      <div className="relative border-b border-border">
        {/* Y-axis lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none" style={{ height: "200px" }}>
          <div className="w-full border-t border-dashed border-border"></div>
          <div className="w-full border-t border-dashed border-border"></div>
          <div className="w-full border-t border-dashed border-border"></div>
          <div className="w-full border-t border-dashed border-border"></div>
        </div>

        {/* Bars container */}
        <div className="flex items-end gap-1 sm:gap-2 justify-between px-2" style={{ height: "200px" }}>
          {chartData.map((item, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col items-center group cursor-pointer z-10 relative h-full justify-end"
            >
              {/* Tooltip on hover */}
              <div className="absolute bottom-full mb-2 bg-foreground text-background text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                ${item.amount.toFixed(2)}
              </div>
              <div
                className="w-full max-w-[40px] bg-primary/80 group-hover:bg-primary rounded-t-sm transition-all"
                style={{ height: `${item.height}%` }}
              ></div>
            </div>
          ))}
        </div>

        {/* X-axis labels */}
        <div className="flex gap-1 sm:gap-2 justify-between px-2 pt-2">
          {chartData.map((item, index) => (
            <div key={index} className="flex-1 text-center">
              <span className="text-[10px] sm:text-xs text-muted-foreground">{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
