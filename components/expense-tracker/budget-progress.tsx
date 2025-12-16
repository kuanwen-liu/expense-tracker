import Link from "next/link";

interface BudgetItem {
  name: string;
  current: number;
  limit: number;
  color: string;
  isOverBudget?: boolean;
  percentage?: number;
}

interface BudgetProgressProps {
  items: BudgetItem[];
}

export function BudgetProgress({ items }: BudgetProgressProps) {
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Budget Status</h3>
        <Link href="/protected/budget" className="text-primary text-sm font-semibold hover:underline">
          View All Budgets
        </Link>
      </div>
      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground text-sm">No budgets set yet</p>
          <Link
            href="/protected/budget"
            className="inline-block mt-2 text-primary text-sm font-semibold hover:underline"
          >
            Set your budgets
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => {
            const percentage = item.percentage ?? Math.min((item.current / item.limit) * 100, 100);

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
      )}
    </div>
  );
}
