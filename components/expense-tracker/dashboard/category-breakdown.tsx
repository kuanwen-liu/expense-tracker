import { MaterialIcon } from "../shared/material-icon";

interface Category {
  name: string;
  icon: string;
  percentage: number;
  color: string;
  iconBgColor: string;
  iconTextColor: string;
}

interface CategoryBreakdownProps {
  categories?: Category[];
}

const defaultCategories: Category[] = [
  {
    name: "Groceries",
    icon: "shopping_cart",
    percentage: 35,
    color: "bg-primary",
    iconBgColor: "bg-primary/10",
    iconTextColor: "text-primary",
  },
  {
    name: "Rent",
    icon: "home",
    percentage: 40,
    color: "bg-indigo-500",
    iconBgColor: "bg-indigo-500/10",
    iconTextColor: "text-indigo-500",
  },
  {
    name: "Entertainment",
    icon: "movie",
    percentage: 15,
    color: "bg-emerald-500",
    iconBgColor: "bg-emerald-500/10",
    iconTextColor: "text-emerald-500",
  },
  {
    name: "Transport",
    icon: "directions_car",
    percentage: 10,
    color: "bg-orange-500",
    iconBgColor: "bg-orange-500/10",
    iconTextColor: "text-orange-500",
  },
];

export function CategoryBreakdown({ categories = defaultCategories }: CategoryBreakdownProps) {
  return (
    <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col">
      <div className="mb-6">
        <h3 className="text-lg font-bold">Expenses by Category</h3>
        <p className="text-sm text-muted-foreground">Distribution this month</p>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-4">
        {categories.map((category) => (
          <div key={category.name} className="flex items-center gap-3">
            <div className={`size-8 rounded-full ${category.iconBgColor} flex items-center justify-center ${category.iconTextColor}`}>
              <MaterialIcon icon={category.icon} className="text-sm" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{category.name}</span>
                <span className="text-sm font-bold">{category.percentage}%</span>
              </div>
              <div className="h-2 w-full bg-accent rounded-full overflow-hidden">
                <div
                  className={`h-full ${category.color} rounded-full`}
                  style={{ width: `${category.percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
