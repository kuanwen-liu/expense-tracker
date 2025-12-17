"use client";

import { useState } from "react";
import { MaterialIcon } from "../shared/material-icon";

const days = ["S", "M", "T", "W", "T", "F", "S"];
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

interface CalendarWidgetProps {
  expenseDates?: string[]; // Array of dates in YYYY-MM-DD format
}

export function CalendarWidget({ expenseDates = [] }: CalendarWidgetProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // Navigate to previous month
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Navigate to next month
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Get first day of month (0 = Sunday, 6 = Saturday)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Get number of days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Get number of days in previous month
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  // Calculate previous month days to show
  const prevMonthDays = Array.from(
    { length: firstDayOfMonth },
    (_, i) => daysInPrevMonth - firstDayOfMonth + i + 1
  );

  // Current month days
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Convert expense dates to a Set of day numbers for the current month
  const expenseDaysSet = new Set(
    expenseDates
      .filter((dateStr) => {
        const date = new Date(dateStr);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
      })
      .map((dateStr) => new Date(dateStr).getDate())
  );

  // Check if a day is today
  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 px-2">
        <button
          onClick={handlePrevMonth}
          className="p-1 hover:bg-accent rounded-full transition-colors"
          aria-label="Previous month"
        >
          <MaterialIcon icon="chevron_left" className="text-[20px]" />
        </button>
        <p className="text-sm font-bold">
          {monthNames[currentMonth]} {currentYear}
        </p>
        <button
          onClick={handleNextMonth}
          className="p-1 hover:bg-accent rounded-full transition-colors"
          aria-label="Next month"
        >
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
          <div
            key={`prev-${day}`}
            className="h-8 text-xs text-muted-foreground/40 font-medium rounded-full flex items-center justify-center"
          >
            {day}
          </div>
        ))}

        {/* Current month days */}
        {currentMonthDays.map((day) => {
          const isTodayDate = isToday(day);
          const hasExpense = expenseDaysSet.has(day);

          return (
            <div
              key={day}
              className={`h-8 text-xs font-medium rounded-full relative transition-colors flex items-center justify-center ${
                isTodayDate
                  ? "bg-primary text-primary-foreground font-bold shadow-md shadow-primary/30"
                  : ""
              }`}
            >
              {day}
              {hasExpense && !isTodayDate && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 size-1 bg-destructive rounded-full"></span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
