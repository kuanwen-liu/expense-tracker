export type Category =
  | "food"
  | "transport"
  | "utilities"
  | "entertainment"
  | "shopping"
  | "health"
  | "rent"
  | "other";

export interface Expense {
  id: string;
  user_id: string;
  amount: number;
  category: Category;
  description: string | null;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface ExpenseInsert {
  amount: number;
  category: Category;
  description?: string | null;
  date: string;
}

export interface ExpenseUpdate {
  amount?: number;
  category?: Category;
  description?: string | null;
  date?: string;
}

export interface Budget {
  id: string;
  user_id: string;
  category: Category | "total";
  amount: number;
  period: "daily" | "monthly" | "yearly";
  created_at: string;
  updated_at: string;
}

export interface ExpenseSummary {
  totalSpent: number;
  budgetRemaining: number;
  dailyAverage: number;
  savingsRate: number;
  byCategory: { category: Category; amount: number; percentage: number }[];
  recentTransactions: Expense[];
}

export const CATEGORY_CONFIG: Record<
  Category,
  { label: string; icon: string; color: string; bgColor: string }
> = {
  food: {
    label: "Food & Dining",
    icon: "restaurant",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
  },
  transport: {
    label: "Transportation",
    icon: "directions_car",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  utilities: {
    label: "Utilities",
    icon: "water_drop",
    color: "text-cyan-600 dark:text-cyan-400",
    bgColor: "bg-cyan-100 dark:bg-cyan-900/30",
  },
  entertainment: {
    label: "Entertainment",
    icon: "movie",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
  },
  shopping: {
    label: "Shopping",
    icon: "shopping_bag",
    color: "text-pink-600 dark:text-pink-400",
    bgColor: "bg-pink-100 dark:bg-pink-900/30",
  },
  health: {
    label: "Health",
    icon: "local_hospital",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-900/30",
  },
  rent: {
    label: "Rent & Housing",
    icon: "home",
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-100 dark:bg-indigo-900/30",
  },
  other: {
    label: "Other",
    icon: "more_horiz",
    color: "text-gray-600 dark:text-gray-400",
    bgColor: "bg-gray-100 dark:bg-gray-900/30",
  },
};
