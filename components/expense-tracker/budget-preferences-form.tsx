"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateUserPreferences } from "@/lib/actions/settings";
import type { UserPreferences } from "@/lib/types/database";

interface BudgetPreferencesFormProps {
  preferences: UserPreferences | null;
}

export function BudgetPreferencesForm({ preferences }: BudgetPreferencesFormProps) {
  const [dailyBudget, setDailyBudget] = useState(
    preferences?.default_daily_budget?.toString() || "150"
  );
  const [monthlyBudget, setMonthlyBudget] = useState(
    preferences?.default_monthly_budget?.toString() || "3500"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const dailyValue = parseFloat(dailyBudget);
    const monthlyValue = parseFloat(monthlyBudget);

    // Validation
    if (isNaN(dailyValue) || dailyValue <= 0) {
      setError("Daily budget must be a positive number");
      setIsLoading(false);
      return;
    }

    if (isNaN(monthlyValue) || monthlyValue <= 0) {
      setError("Monthly budget must be a positive number");
      setIsLoading(false);
      return;
    }

    const result = await updateUserPreferences({
      default_daily_budget: dailyValue,
      default_monthly_budget: monthlyValue,
    });

    setIsLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Preferences</CardTitle>
        <CardDescription>
          Set your default budget amounts for daily and monthly spending
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            {/* Daily Budget */}
            <div className="grid gap-2">
              <Label htmlFor="daily-budget">Default Daily Budget</Label>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">$</span>
                <Input
                  id="daily-budget"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="150.00"
                  value={dailyBudget}
                  onChange={(e) => setDailyBudget(e.target.value)}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                This is the default daily spending limit shown on the expenses page
              </p>
            </div>

            {/* Monthly Budget */}
            <div className="grid gap-2">
              <Label htmlFor="monthly-budget">Default Monthly Budget</Label>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">$</span>
                <Input
                  id="monthly-budget"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="3500.00"
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(e.target.value)}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                This is the default monthly spending limit shown on the dashboard
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
              <p className="text-sm text-blue-600 dark:text-blue-400">
                💡 These are default values. You can set specific budgets for each category on the Budget page.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                <p className="text-sm text-green-500">Budget preferences updated successfully!</p>
              </div>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Preferences"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
