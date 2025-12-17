import { MaterialIcon } from "../shared/material-icon";

interface Transaction {
  id: string;
  name: string;
  icon: string;
  iconBgColor: string;
  iconTextColor: string;
  date: string;
  category: string;
  amount: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
  showViewAll?: boolean;
  onViewAll?: () => void;
}

export function TransactionsTable({ transactions, showViewAll = true, onViewAll }: TransactionsTableProps) {
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h3 className="text-lg font-bold">Recent Transactions</h3>
        {showViewAll && (
          <button
            onClick={onViewAll}
            className="text-sm font-bold text-primary hover:text-primary/80"
          >
            View All
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-accent">
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Transaction
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-accent transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className={`size-8 rounded-full ${transaction.iconBgColor} ${transaction.iconTextColor} flex items-center justify-center`}>
                      <MaterialIcon icon={transaction.icon} className="text-sm" />
                    </div>
                    <p className="text-sm font-medium">{transaction.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {transaction.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-accent text-muted-foreground">
                    {transaction.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold">
                  {transaction.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Sample data for testing
export const sampleTransactions: Transaction[] = [
  {
    id: "1",
    name: "Starbucks Coffee",
    icon: "local_cafe",
    iconBgColor: "bg-orange-100 dark:bg-orange-900/30",
    iconTextColor: "text-orange-600 dark:text-orange-400",
    date: "Oct 24, 2023",
    category: "Food & Drink",
    amount: "-$5.50",
  },
  {
    id: "2",
    name: "Netflix Subscription",
    icon: "movie",
    iconBgColor: "bg-purple-100 dark:bg-purple-900/30",
    iconTextColor: "text-purple-600 dark:text-purple-400",
    date: "Oct 23, 2023",
    category: "Entertainment",
    amount: "-$15.00",
  },
  {
    id: "3",
    name: "Uber Ride",
    icon: "directions_car",
    iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
    iconTextColor: "text-blue-600 dark:text-blue-400",
    date: "Oct 22, 2023",
    category: "Transport",
    amount: "-$24.00",
  },
  {
    id: "4",
    name: "Whole Foods Market",
    icon: "shopping_cart",
    iconBgColor: "bg-green-100 dark:bg-green-900/30",
    iconTextColor: "text-green-600 dark:text-green-400",
    date: "Oct 20, 2023",
    category: "Groceries",
    amount: "-$142.80",
  },
];
