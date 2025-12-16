interface DonutChartProps {
  centerValue: string;
  centerLabel: string;
  segments?: { percentage: number; color: string; label: string }[];
}

const defaultSegments = [
  { percentage: 35, color: "text-primary", label: "Groceries (35%)" },
  { percentage: 25, color: "text-teal-400", label: "Rent (25%)" },
  { percentage: 20, color: "text-purple-400", label: "Fun (20%)" },
  { percentage: 20, color: "text-orange-300", label: "Other (20%)" },
];

export function DonutChart({
  centerValue,
  centerLabel,
  segments = defaultSegments,
}: DonutChartProps) {
  let cumulativeOffset = 0;

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-6 flex flex-col">
      <h3 className="text-lg font-bold mb-1">Expenses by Category</h3>
      <p className="text-sm text-muted-foreground mb-6">Breakdown for this period</p>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            {/* Background Circle */}
            <path
              className="text-accent"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="4.5"
            />

            {/* Segments */}
            {segments.map((segment, index) => {
              const offset = cumulativeOffset;
              cumulativeOffset += segment.percentage;

              return (
                <path
                  key={index}
                  className={segment.color}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray={`${segment.percentage}, 100`}
                  strokeDashoffset={-offset}
                  strokeWidth="4.5"
                />
              );
            })}
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold">{centerValue}</span>
            <span className="text-xs text-muted-foreground font-medium">{centerLabel}</span>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full mt-6 grid grid-cols-2 gap-y-3 gap-x-2">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${segment.color.replace("text-", "bg-")}`}></div>
              <span className="text-xs font-medium text-muted-foreground">{segment.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
