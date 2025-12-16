import Link from "next/link";
import { MaterialIcon } from "@/components/expense-tracker/material-icon";
import { StatsCard } from "@/components/expense-tracker/stats-card";
import { SpendingChart } from "@/components/expense-tracker/spending-chart";
import { CategoryBreakdown } from "@/components/expense-tracker/category-breakdown";
import { TransactionsTable } from "@/components/expense-tracker/transactions-table";
import { getExpenses, getExpenseSummary, getDailySpending } from "@/lib/actions/expenses";
import { getBudget } from "@/lib/actions/budgets";
import { getUserPreferences } from "@/lib/actions/settings";
import { CATEGORY_CONFIG, type Category } from "@/lib/types/database";

export default async function DashboardPage() {
  // Get current month date range
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];

  // Fetch data in parallel
  const [summaryResult, expensesResult, dailyResult, budgetResult, preferencesResult] = await Promise.all([
    getExpenseSummary({ startDate, endDate }),
    getExpenses({ startDate, endDate, limit: 10 }),
    getDailySpending({ startDate, endDate }),
    getBudget("total", "monthly"),
    getUserPreferences(),
  ]);

  const summary = summaryResult.data;
  const expenses = expensesResult.data || [];
  const dailySpending = dailyResult.data || [];
  const preferences = preferencesResult.data;

  // Format transactions for table
  const transactions = expenses.map((e) => {
    const config = CATEGORY_CONFIG[e.category as Category];
    return {
      id: e.id,
      name: e.description || config.label,
      icon: config.icon,
      iconBgColor: config.bgColor,
      iconTextColor: config.color,
      date: new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      category: config.label,
      amount: `-$${Number(e.amount).toFixed(2)}`,
    };
  });

  // Format category breakdown
  const categoryData = (summary?.byCategory || []).map((c) => {
    const config = CATEGORY_CONFIG[c.category];
    return {
      name: config.label,
      icon: config.icon,
      percentage: c.percentage,
      color: `bg-${config.color.split("-")[1]}-500`,
      iconBgColor: config.bgColor,
      iconTextColor: config.color,
    };
  });

  // Format date range for display
  const dateRangeText = `${new Date(startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} - ${new Date(endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;

  // Monthly budget (priority: budget settings → user preferences → hardcoded default)
  const monthlyBudget = budgetResult.data?.amount || preferences?.default_monthly_budget || 3500;
  const budgetRemaining = monthlyBudget - (summary?.totalSpent || 0);

  return (
    <div className="flex flex-col gap-6">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
            <MaterialIcon icon="calendar_today" className="text-[18px]" />
            <span>{dateRangeText}</span>
          </div>
        </div>
        <Link
          href="/protected/expenses"
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm"
        >
          <MaterialIcon icon="add" className="text-[20px]" />
          <span>Add Expense</span>
        </Link>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Spent"
          value={`$${(summary?.totalSpent || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icon="payments"
          subtitle={`${summary?.transactionCount || 0} transactions`}
        />
        <StatsCard
          title="Budget Remaining"
          value={`$${budgetRemaining.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icon="account_balance"
          iconColor="text-yellow-500"
          iconBgColor="bg-yellow-500/10"
          subtitle={`of $${monthlyBudget.toLocaleString()} monthly`}
        />
        <StatsCard
          title="Daily Average"
          value={`$${(summary?.dailyAverage || 0).toFixed(2)}`}
          icon="bar_chart"
          iconColor="text-purple-500"
          iconBgColor="bg-purple-500/10"
          subtitle="this month"
        />
        <StatsCard
          title="Top Category"
          value={summary?.byCategory?.[0] ? CATEGORY_CONFIG[summary.byCategory[0].category].label : "N/A"}
          icon="category"
          iconColor="text-cyan-500"
          iconBgColor="bg-cyan-500/10"
          subtitle={summary?.byCategory?.[0] ? `${summary.byCategory[0].percentage}% of spending` : "No data"}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SpendingChart data={dailySpending.length > 0 ? dailySpending : undefined} />
        <CategoryBreakdown categories={categoryData.length > 0 ? categoryData : undefined} />
      </div>

      {/* Recent Transactions */}
      {transactions.length > 0 ? (
        <TransactionsTable transactions={transactions} />
      ) : (
        <div className="bg-card rounded-xl border border-border shadow-sm p-12 text-center">
          <MaterialIcon icon="receipt_long" className="text-6xl text-muted-foreground mb-4" />
          <h3 className="text-lg font-bold mb-2">No transactions yet</h3>
          <p className="text-muted-foreground mb-4">Start tracking your expenses to see them here.</p>
          <Link
            href="/protected/expenses"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-bold transition-colors"
          >
            <MaterialIcon icon="add" className="text-[20px]" />
            Add Your First Expense
          </Link>
        </div>
      )}
    </div>
  );
}
