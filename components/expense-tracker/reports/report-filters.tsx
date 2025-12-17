"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MaterialIcon } from "../shared/material-icon";

const TIME_PERIODS = [
  { value: "this-month", label: "This Month" },
  { value: "last-month", label: "Last Month" },
  { value: "last-3-months", label: "Last 3 Months" },
  { value: "last-6-months", label: "Last 6 Months" },
  { value: "this-year", label: "This Year" },
  { value: "last-year", label: "Last Year" },
];

interface ReportFiltersProps {
  currency?: string;
}

export function ReportFilters({ currency = "USD" }: ReportFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentPeriod = searchParams.get("period") || "this-month";
  const selectedPeriod = TIME_PERIODS.find((p) => p.value === currentPeriod) || TIME_PERIODS[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePeriodChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("period", value);
    router.push(`/protected/reports?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Time Period Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border hover:border-primary/50 text-sm font-medium transition-colors shadow-sm"
        >
          <span>{selectedPeriod.label}</span>
          <MaterialIcon
            icon="keyboard_arrow_down"
            className={`text-[18px] transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-10 py-1">
            {TIME_PERIODS.map((period) => (
              <button
                key={period.value}
                onClick={() => handlePeriodChange(period.value)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors ${
                  period.value === currentPeriod
                    ? "bg-primary/10 text-primary font-medium"
                    : ""
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="h-6 w-px bg-border mx-1 hidden sm:block"></div>

      {/* Currency Display */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border text-sm font-medium opacity-60">
        <MaterialIcon icon="attach_money" className="text-[18px] text-muted-foreground" />
        <span>{currency}</span>
      </div>
    </div>
  );
}
