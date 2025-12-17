import { MaterialIcon } from "../shared/material-icon";

interface DailySummaryProps {
  totalSpent?: string;
  budget?: string;
  percentage?: number;
}

export function DailySummary({
  totalSpent = "$124.50",
  budget = "$190.00",
  percentage = 65,
}: DailySummaryProps) {
  return (
    <div className="bg-primary rounded-2xl p-6 text-primary-foreground shadow-lg relative overflow-hidden group">
      <div className="absolute right-[-20px] top-[-20px] opacity-20 transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
        <MaterialIcon icon="savings" className="text-[140px]" />
      </div>
      <p className="text-primary-foreground/70 text-sm font-medium mb-1">Total spent today</p>
      <h3 className="text-4xl font-bold tracking-tight mb-4">{totalSpent}</h3>
      <div className="w-full bg-primary-foreground/20 rounded-full h-1.5 mb-2 overflow-hidden">
        <div
          className="bg-primary-foreground h-full rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-xs text-primary-foreground/70">
        {percentage}% of daily budget ({budget})
      </p>
    </div>
  );
}
