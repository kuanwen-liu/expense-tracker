"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MaterialIcon } from "../shared/material-icon";
import { upsertBudget } from "@/lib/actions/budgets";
import { CATEGORY_CONFIG, type Category } from "@/lib/types/database";

interface BudgetCardProps {
  category: Category | "total";
  currentAmount?: number;
  spent: number;
  period: "daily" | "monthly" | "yearly";
  onSave?: () => void;
}

export function BudgetCard({
  category,
  currentAmount = 0,
  spent,
  period,
  onSave,
}: BudgetCardProps) {
  const router = useRouter();
  const [amount, setAmount] = useState(currentAmount.toString());
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const config = category === "total"
    ? { label: "Total Budget", icon: "account_balance", color: "text-primary", bgColor: "bg-primary/10" }
    : CATEGORY_CONFIG[category];
  const budgetValue = parseFloat(amount) || 0;
  const percentage = budgetValue > 0 ? Math.min((spent / budgetValue) * 100, 100) : 0;
  const isOverBudget = spent > budgetValue;

  // Determine progress bar color
  const getProgressColor = () => {
    if (isOverBudget) return "bg-red-500";
    if (percentage >= 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleSave = async () => {
    const budgetAmount = parseFloat(amount);

    if (!budgetAmount || budgetAmount <= 0) {
      setError("Please enter a valid amount greater than 0");
      return;
    }

    setIsLoading(true);
    setError(null);

    const result = await upsertBudget({
      category,
      amount: budgetAmount,
      period,
    });

    setIsLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      setIsEditing(false);
      router.refresh(); // Refresh the page to show updated data
      if (onSave) onSave();
    }
  };

  const handleCancel = () => {
    setAmount(currentAmount.toString());
    setIsEditing(false);
    setError(null);
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-4 hover:border-primary/50 transition-colors">
      {/* Header: Icon + Category Name */}
      <div className="flex items-center gap-3 mb-3">
        <div className={`${config.bgColor} rounded-lg size-10 flex items-center justify-center`}>
          <MaterialIcon icon={config.icon} className={`text-xl ${config.color}`} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm">{config.label}</h3>
          <p className="text-xs text-muted-foreground">
            ${spent.toFixed(2)} spent
          </p>
        </div>
        {isOverBudget && (
          <div className="bg-red-500/10 text-red-500 px-2 py-1 rounded text-xs font-semibold">
            Over
          </div>
        )}
      </div>

      {/* Budget Amount */}
      <div className="mb-3">
        {isEditing ? (
          <div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="flex-1 bg-accent hover:bg-accent/80 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">
                ${budgetValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-muted-foreground">
                {period} budget
              </p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <MaterialIcon icon="edit" className="text-lg" />
            </button>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{Math.round(percentage)}%</span>
          <span>
            ${(budgetValue - spent).toFixed(2)} remaining
          </span>
        </div>
        <div className="w-full bg-accent rounded-full h-2">
          <div
            className={`${getProgressColor()} h-2 rounded-full transition-all`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
