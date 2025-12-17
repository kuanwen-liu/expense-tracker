import { ExpenseForm } from "@/components/expense-tracker/expenses/expense-form";
import { DailySummary } from "@/components/expense-tracker/expenses/daily-summary";
import { RecentActivity } from "@/components/expense-tracker/expenses/recent-activity";
import { CalendarWidget } from "@/components/expense-tracker/expenses/calendar-widget";
import { getTodayExpenses, getExpenses } from "@/lib/actions/expenses";
import { getBudget } from "@/lib/actions/budgets";
import { getUserPreferences } from "@/lib/actions/settings";
import { CATEGORY_CONFIG, type Category } from "@/lib/types/database";

export default async function ExpensesPage() {
  // Calculate date range for calendar (6 months back and forward)
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1).toISOString().split("T")[0];
  const endDate = new Date(now.getFullYear(), now.getMonth() + 7, 0).toISOString().split("T")[0];

  // Fetch today's expenses, recent activity, and all expenses for calendar
  const [todayResult, recentResult, budgetResult, preferencesResult, allExpensesResult] = await Promise.all([
    getTodayExpenses(),
    getExpenses({ limit: 5 }),
    getBudget("total", "daily"),
    getUserPreferences(),
    getExpenses({ startDate, endDate }),
  ]);

  const todayData = todayResult.data;
  const recentExpenses = recentResult.data || [];
  const preferences = preferencesResult.data;
  const allExpenses = allExpensesResult.data || [];

  // Daily budget (priority: budget settings → user preferences → hardcoded default)
  const dailyBudget = budgetResult.data?.amount || preferences?.default_daily_budget || 150;
  const todaySpent = todayData?.totalSpent || 0;
  const percentage = Math.min(Math.round((todaySpent / dailyBudget) * 100), 100);

  // Format recent activity
  const activityItems = recentExpenses.map((e) => {
    const config = CATEGORY_CONFIG[e.category as Category];
    const expenseDate = new Date(e.date);
    const today = new Date();
    const isToday = expenseDate.toDateString() === today.toDateString();

    return {
      id: e.id,
      name: e.description || config.label,
      icon: config.icon,
      iconBgColor: config.bgColor,
      iconTextColor: config.color,
      category: config.label,
      time: isToday
        ? new Date(e.created_at).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
        : expenseDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      amount: `-$${Number(e.amount).toFixed(2)}`,
    };
  });

  // Extract unique expense dates for calendar
  const expenseDates = [...new Set(allExpenses.map((e) => e.date))];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
      {/* Left Column: Entry Form */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        {/* Heading */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
            Log Expense
          </h1>
          <p className="text-muted-foreground text-base font-normal">
            Enter the details of your new transaction below to keep your budget on track.
          </p>
        </div>

        {/* Main Form Card */}
        <ExpenseForm />
      </div>

      {/* Right Column: Context & Calendar */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        <DailySummary
          totalSpent={`$${todaySpent.toFixed(2)}`}
          budget={`$${dailyBudget.toFixed(2)}`}
          percentage={percentage}
        />
        <RecentActivity items={activityItems.length > 0 ? activityItems : undefined} />
        <CalendarWidget expenseDates={expenseDates} />
      </div>
    </div>
  );
}
