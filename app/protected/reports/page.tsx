import { MaterialIcon } from "@/components/expense-tracker/material-icon";
import { StatsCard } from "@/components/expense-tracker/stats-card";
import { SpendingHistoryChart } from "@/components/expense-tracker/spending-history-chart";
import { DonutChart } from "@/components/expense-tracker/donut-chart";
import { BudgetProgress } from "@/components/expense-tracker/budget-progress";
import { TransactionsTable } from "@/components/expense-tracker/transactions-table";
import { getExpenses, getExpenseSummary, getDailySpending } from "@/lib/actions/expenses";
import { CATEGORY_CONFIG, type Category } from "@/lib/types/database";

export default async function ReportsPage() {
  // Get current month date range
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];

  // Fetch data in parallel
  const [summaryResult, expensesResult, dailyResult] = await Promise.all([
    getExpenseSummary({ startDate, endDate }),
    getExpenses({ startDate, endDate, limit: 10 }),
    getDailySpending({ startDate, endDate }),
  ]);

  const dailySpending = dailyResult.data || [];

  const summary = summaryResult.data;
  const expenses = expensesResult.data || [];

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

  // Format donut chart segments
  const donutSegments = (summary?.byCategory || []).slice(0, 4).map((c) => {
    const colorMap: Record<string, string> = {
      food: "text-primary",
      transport: "text-blue-400",
      entertainment: "text-purple-400",
      shopping: "text-pink-400",
      utilities: "text-cyan-400",
      health: "text-red-400",
      rent: "text-indigo-400",
      other: "text-orange-300",
    };
    return {
      percentage: c.percentage,
      color: colorMap[c.category] || "text-gray-400",
      label: `${CATEGORY_CONFIG[c.category].label} (${c.percentage}%)`,
    };
  });

  // Monthly budget (hardcoded for now)
  const monthlyBudget = 3500;
  const budgetItems = [
    {
      name: "Monthly Limit",
      current: summary?.totalSpent || 0,
      limit: monthlyBudget,
      color: "bg-primary",
      isOverBudget: (summary?.totalSpent || 0) > monthlyBudget,
    },
  ];

  // Add top category as a budget item if exists
  if (summary?.byCategory?.[0]) {
    const topCategory = summary.byCategory[0];
    const categoryBudget = monthlyBudget * 0.3; // Assume 30% budget for top category
    budgetItems.push({
      name: CATEGORY_CONFIG[topCategory.category].label,
      current: topCategory.amount,
      limit: categoryBudget,
      color: "bg-orange-500",
      isOverBudget: topCategory.amount > categoryBudget,
    });
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl font-black tracking-tight">Financial Insights</h2>
        <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm">
          <MaterialIcon icon="download" className="text-[20px]" />
          <span>Download Report</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border hover:border-primary/50 text-sm font-medium transition-colors shadow-sm">
          <span>This Month</span>
          <MaterialIcon icon="keyboard_arrow_down" className="text-[18px]" />
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border hover:border-primary/50 text-sm font-medium transition-colors shadow-sm opacity-60 hover:opacity-100">
          <span>This Year</span>
          <MaterialIcon icon="keyboard_arrow_down" className="text-[18px]" />
        </button>
        <div className="h-6 w-px bg-border mx-1 hidden sm:block"></div>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border hover:border-primary/50 text-sm font-medium transition-colors shadow-sm">
          <MaterialIcon icon="attach_money" className="text-[18px] text-muted-foreground" />
          <span>USD</span>
          <MaterialIcon icon="keyboard_arrow_down" className="text-[18px]" />
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard
          title="Total Spend"
          value={`$${(summary?.totalSpent || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icon="account_balance_wallet"
          subtitle={`${summary?.transactionCount || 0} transactions`}
        />
        <StatsCard
          title="Avg. Daily Spend"
          value={`$${(summary?.dailyAverage || 0).toFixed(2)}`}
          icon="calendar_today"
          iconColor="text-orange-500"
          iconBgColor="bg-orange-500/10"
          subtitle="this month"
        />
        <StatsCard
          title="Top Category"
          value={summary?.byCategory?.[0] ? CATEGORY_CONFIG[summary.byCategory[0].category].label : "N/A"}
          icon="shopping_cart"
          iconColor="text-purple-500"
          iconBgColor="bg-purple-500/10"
          subtitle={summary?.byCategory?.[0] ? `$${summary.byCategory[0].amount.toFixed(2)} spent (${summary.byCategory[0].percentage}%)` : "No data"}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SpendingHistoryChart data={dailySpending} />
        <DonutChart
          centerValue={String(summary?.transactionCount || 0)}
          centerLabel="Transactions"
          segments={donutSegments.length > 0 ? donutSegments : undefined}
        />
      </div>

      {/* Budget Status */}
      <BudgetProgress items={budgetItems} />

      {/* Transactions Table */}
      {transactions.length > 0 ? (
        <TransactionsTable transactions={transactions} />
      ) : (
        <div className="bg-card rounded-xl border border-border shadow-sm p-12 text-center">
          <MaterialIcon icon="receipt_long" className="text-6xl text-muted-foreground mb-4" />
          <h3 className="text-lg font-bold mb-2">No transactions yet</h3>
          <p className="text-muted-foreground">Start tracking your expenses to see insights here.</p>
        </div>
      )}
    </div>
  );
}
