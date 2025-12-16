"use client";

import { MaterialIcon } from "./material-icon";

const days = ["S", "M", "T", "W", "T", "F", "S"];

interface CalendarWidgetProps {
  month?: string;
  year?: string;
  selectedDay?: number;
}

export function CalendarWidget({
  month = "October",
  year = "2023",
  selectedDay = 5,
}: CalendarWidgetProps) {
  // Generate calendar days (simplified - October 2023)
  const prevMonthDays = [28, 29, 30];
  const currentMonthDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const expenseDays = [6, 9]; // Days with expenses marked

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 px-2">
        <button className="p-1 hover:bg-accent rounded-full transition-colors">
          <MaterialIcon icon="chevron_left" className="text-[20px]" />
        </button>
        <p className="text-sm font-bold">
          {month} {year}
        </p>
        <button className="p-1 hover:bg-accent rounded-full transition-colors">
          <MaterialIcon icon="chevron_right" className="text-[20px]" />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 text-center mb-2">
        {days.map((day, i) => (
          <div key={i} className="text-[10px] font-bold text-muted-foreground py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Previous month days */}
        {prevMonthDays.map((day) => (
          <button
            key={`prev-${day}`}
            className="h-8 text-xs text-muted-foreground/40 font-medium rounded-full hover:bg-accent"
          >
            {day}
          </button>
        ))}

        {/* Current month days */}
        {currentMonthDays.map((day) => {
          const isSelected = day === selectedDay;
          const hasExpense = expenseDays.includes(day);

          return (
            <button
              key={day}
              className={`h-8 text-xs font-medium rounded-full relative transition-colors ${
                isSelected
                  ? "bg-primary text-primary-foreground font-bold shadow-md shadow-primary/30"
                  : "hover:bg-accent"
              }`}
            >
              {day}
              {hasExpense && !isSelected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 size-1 bg-destructive rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
