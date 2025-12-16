import { MaterialIcon } from "@/components/expense-tracker/material-icon";
import { BudgetCard } from "@/components/expense-tracker/budget-card";
import { BudgetProgress } from "@/components/expense-tracker/budget-progress";
import { BudgetAlert } from "@/components/expense-tracker/budget-alert";
import { getBudgets, getBudgetStatus } from "@/lib/actions/budgets";
import { getExpenseSummary } from "@/lib/actions/expenses";
import { getUserPreferences } from "@/lib/actions/settings";
import { CATEGORY_CONFIG, type Category } from "@/lib/types/database";

const CATEGORIES: Category[] = ["food", "transport", "utilities", "entertainment", "shopping", "health", "rent", "other"];

export default async function BudgetPage() {
  // Get current month date range
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];

  // Fetch data in parallel
  const [budgetsResult, statusResult, summaryResult, preferencesResult] = await Promise.all([
    getBudgets({ period: "monthly" }),
    getBudgetStatus({ startDate, endDate }),
    getExpenseSummary({ startDate, endDate }),
    getUserPreferences(),
  ]);

  const budgets = budgetsResult.data || [];
  const budgetStatus = statusResult.data;
  const summary = summaryResult.data;
  const preferences = preferencesResult.data;

  // Create a map of category budgets for easy lookup
  const budgetMap = new Map(budgets.map(b => [b.category, b]));

  // Calculate spending by category
  const spendingByCategory: Record<string, number> = {};
  (summary?.byCategory || []).forEach(cat => {
    spendingByCategory[cat.category] = cat.amount;
  });

  // Get total budget
  const totalBudget = budgetMap.get("total");
  const totalSpent = summary?.totalSpent || 0;

  // Prepare alerts for over-budget categories
  const alerts = budgets
    .filter(b => {
      if (b.category === "total") return false;
      const spent = spendingByCategory[b.category] || 0;
      return spent > b.amount;
    })
    .map(b => ({
      category: b.category as Category,
      budgetAmount: b.amount,
      spentAmount: spendingByCategory[b.category] || 0,
      overAmount: (spendingByCategory[b.category] || 0) - b.amount,
    }));

  // Prepare budget items for progress component
  const budgetItems = budgets
    .filter(b => b.category !== "total")
    .slice(0, 5) // Show top 5
    .map(b => {
      const spent = spendingByCategory[b.category] || 0;
      const percentage = Math.min((spent / b.amount) * 100, 100);
      const config = CATEGORY_CONFIG[b.category as Category];

      return {
        name: config.label,
        current: spent,
        limit: b.amount,
        color: spent > b.amount ? "bg-red-500" : percentage >= 80 ? "bg-yellow-500" : "bg-green-500",
        isOverBudget: spent > b.amount,
        percentage,
      };
    });

  // Add total budget if exists
  if (totalBudget) {
    budgetItems.unshift({
      name: "Monthly Total",
      current: totalSpent,
      limit: totalBudget.amount,
      color: totalSpent > totalBudget.amount ? "bg-red-500" : (totalSpent / totalBudget.amount) >= 0.8 ? "bg-yellow-500" : "bg-primary",
      isOverBudget: totalSpent > totalBudget.amount,
      percentage: Math.min((totalSpent / totalBudget.amount) * 100, 100),
    });
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold tracking-tight">Budget Management</h2>
          <p className="text-muted-foreground text-sm">
            Set and track your spending limits by category
          </p>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && <BudgetAlert alerts={alerts} />}

      {/* Total Monthly Budget */}
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary/20 rounded-lg size-12 flex items-center justify-center">
            <MaterialIcon icon="account_balance" className="text-2xl text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Total Monthly Budget</h3>
            <p className="text-sm text-muted-foreground">
              Set your overall spending limit for the month
            </p>
          </div>
        </div>
        <BudgetCard
          category="total"
          currentAmount={totalBudget?.amount || preferences?.default_monthly_budget || 0}
          spent={totalSpent}
          period="monthly"
        />
      </div>

      {/* Category Budgets */}
      <div>
        <h3 className="text-xl font-bold mb-4">Category Budgets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {CATEGORIES.map((category) => {
            const budget = budgetMap.get(category);
            const spent = spendingByCategory[category] || 0;

            return (
              <BudgetCard
                key={category}
                category={category}
                currentAmount={budget?.amount || 0}
                spent={spent}
                period="monthly"
              />
            );
          })}
        </div>
      </div>

      {/* Budget Overview */}
      {budgetItems.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4">Budget Overview</h3>
          <BudgetProgress items={budgetItems} />
        </div>
      )}

      {/* Empty State */}
      {budgets.length === 0 && (
        <div className="bg-card rounded-xl border border-border shadow-sm p-12 text-center">
          <MaterialIcon icon="savings" className="text-6xl text-muted-foreground mb-4" />
          <h3 className="text-lg font-bold mb-2">No budgets set yet</h3>
          <p className="text-muted-foreground mb-4">
            Start by setting your total monthly budget and category limits above.
          </p>
        </div>
      )}
    </div>
  );
}
