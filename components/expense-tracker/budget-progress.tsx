import Link from "next/link";

interface BudgetItem {
  name: string;
  current: number;
  limit: number;
  color: string;
  isOverBudget?: boolean;
}

interface BudgetProgressProps {
  items?: BudgetItem[];
}

const defaultItems: BudgetItem[] = [
  { name: "Monthly Limit", current: 2450, limit: 3000, color: "bg-primary" },
  { name: "Dining Out", current: 450, limit: 400, color: "bg-orange-500", isOverBudget: true },
];

export function BudgetProgress({ items = defaultItems }: BudgetProgressProps) {
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Budget Status</h3>
        <Link href="/protected/budget" className="text-primary text-sm font-semibold hover:underline">
          View All Budgets
        </Link>
      </div>
      <div className="space-y-4">
        {items.map((item, index) => {
          const percentage = Math.min((item.current / item.limit) * 100, 100);

          return (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{item.name}</span>
                <span className={item.isOverBudget ? "text-orange-500 font-semibold" : "text-muted-foreground"}>
                  ${item.current.toLocaleString()} / ${item.limit.toLocaleString()}
                  {item.isOverBudget && " (Over budget)"}
                </span>
              </div>
              <div className="w-full bg-accent rounded-full h-3">
                <div
                  className={`${item.color} h-3 rounded-full transition-all`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
