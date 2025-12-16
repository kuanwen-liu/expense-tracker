import { ExpenseForm } from "@/components/expense-tracker/expense-form";
import { DailySummary } from "@/components/expense-tracker/daily-summary";
import { RecentActivity } from "@/components/expense-tracker/recent-activity";
import { CalendarWidget } from "@/components/expense-tracker/calendar-widget";
import { getTodayExpenses, getExpenses } from "@/lib/actions/expenses";
import { getBudget } from "@/lib/actions/budgets";
import { CATEGORY_CONFIG, type Category } from "@/lib/types/database";

export default async function ExpensesPage() {
  // Fetch today's expenses and recent activity
  const [todayResult, recentResult, budgetResult] = await Promise.all([
    getTodayExpenses(),
    getExpenses({ limit: 5 }),
    getBudget("total", "daily"),
  ]);

  const todayData = todayResult.data;
  const recentExpenses = recentResult.data || [];

  // Daily budget (from user's budget settings, fallback to 150)
  const dailyBudget = budgetResult.data?.amount || 150;
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
        <CalendarWidget />
      </div>
    </div>
  );
}
