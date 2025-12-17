import { MaterialIcon } from "@/components/expense-tracker/shared/material-icon";
import { StatsCard } from "@/components/expense-tracker/shared/stats-card";
import { SpendingHistoryChart } from "@/components/expense-tracker/reports/spending-history-chart";
import { DonutChart } from "@/components/expense-tracker/reports/donut-chart";
import { BudgetProgress } from "@/components/expense-tracker/dashboard/budget-progress";
import { TransactionsTable } from "@/components/expense-tracker/dashboard/transactions-table";
import { ReportFilters } from "@/components/expense-tracker/reports/report-filters";
import { DownloadReportButton } from "@/components/expense-tracker/reports/download-report-button";
import { getExpenses, getExpenseSummary, getDailySpending } from "@/lib/actions/expenses";
import { getBudgetStatus } from "@/lib/actions/budgets";
import { getUserPreferences } from "@/lib/actions/settings";
import { CATEGORY_CONFIG, type Category } from "@/lib/types/database";

function getDateRange(period: string) {
  const now = new Date();
  let startDate: string;
  let endDate: string;

  switch (period) {
    case "last-month":
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().split("T")[0];
      endDate = new Date(now.getFullYear(), now.getMonth(), 0).toISOString().split("T")[0];
      break;
    case "last-3-months":
      startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1).toISOString().split("T")[0];
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];
      break;
    case "last-6-months":
      startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1).toISOString().split("T")[0];
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];
      break;
    case "this-year":
      startDate = new Date(now.getFullYear(), 0, 1).toISOString().split("T")[0];
      endDate = new Date(now.getFullYear(), 11, 31).toISOString().split("T")[0];
      break;
    case "last-year":
      startDate = new Date(now.getFullYear() - 1, 0, 1).toISOString().split("T")[0];
      endDate = new Date(now.getFullYear() - 1, 11, 31).toISOString().split("T")[0];
      break;
    case "this-month":
    default:
      startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];
      break;
  }

  return { startDate, endDate };
}

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  // Get date range based on selected period
  const params = await searchParams;
  const period = params.period || "this-month";
  const { startDate, endDate } = getDateRange(period);

  // Fetch data in parallel
  const [summaryResult, expensesResult, dailyResult, budgetStatusResult, preferencesResult] = await Promise.all([
    getExpenseSummary({ startDate, endDate }),
    getExpenses({ startDate, endDate, limit: 10 }),
    getDailySpending({ startDate, endDate }),
    getBudgetStatus({ startDate, endDate }),
    getUserPreferences(),
  ]);

  const dailySpending = dailyResult.data || [];
  const budgetStatus = budgetStatusResult.data;
  const preferences = preferencesResult.data;

  const summary = summaryResult.data;
  const expenses = expensesResult.data || [];
  const currency = preferences?.currency || "USD";

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

  // Budget items from real budget data
  const budgetItems = budgetStatus?.budgets
    .filter(b => b.category !== "total")
    .slice(0, 5) // Show top 5 category budgets
    .map(b => {
      const config = CATEGORY_CONFIG[b.category as Category];
      return {
        name: config.label,
        current: b.spent,
        limit: b.amount,
        color: b.isOverBudget ? "bg-red-500" : b.percentage >= 80 ? "bg-yellow-500" : "bg-green-500",
        isOverBudget: b.isOverBudget,
        percentage: b.percentage,
      };
    }) || [];

  // Add total monthly budget at the beginning if exists
  const totalBudget = budgetStatus?.budgets.find(b => b.category === "total");
  if (totalBudget) {
    budgetItems.unshift({
      name: "Monthly Total",
      current: totalBudget.spent,
      limit: totalBudget.amount,
      color: totalBudget.isOverBudget ? "bg-red-500" : totalBudget.percentage >= 80 ? "bg-yellow-500" : "bg-primary",
      isOverBudget: totalBudget.isOverBudget,
      percentage: totalBudget.percentage,
    });
  }

  // Prepare data for download report
  const periodLabels: Record<string, string> = {
    "this-month": "This Month",
    "last-month": "Last Month",
    "last-3-months": "Last 3 Months",
    "last-6-months": "Last 6 Months",
    "this-year": "This Year",
    "last-year": "Last Year",
  };

  const reportData = {
    summary: {
      totalSpent: summary?.totalSpent || 0,
      dailyAverage: summary?.dailyAverage || 0,
      transactionCount: summary?.transactionCount || 0,
    },
    transactions: transactions,
    period: periodLabels[period] || "This Month",
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl font-black tracking-tight">Financial Insights</h2>
        <DownloadReportButton data={reportData} />
      </div>

      {/* Filters */}
      <ReportFilters currency={currency} />

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
