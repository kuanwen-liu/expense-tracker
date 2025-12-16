import Link from "next/link";
import { MaterialIcon } from "./material-icon";

interface ActivityItem {
  id: string;
  name: string;
  icon: string;
  iconBgColor: string;
  iconTextColor: string;
  category: string;
  time: string;
  amount: string;
}

interface RecentActivityProps {
  items?: ActivityItem[];
}

const defaultItems: ActivityItem[] = [
  {
    id: "1",
    name: "Business Lunch",
    icon: "lunch_dining",
    iconBgColor: "bg-orange-100 dark:bg-orange-900/30",
    iconTextColor: "text-orange-600 dark:text-orange-400",
    category: "Food & Dining",
    time: "2:30 PM",
    amount: "-$45.20",
  },
  {
    id: "2",
    name: "Uber Ride",
    icon: "directions_car",
    iconBgColor: "bg-purple-100 dark:bg-purple-900/30",
    iconTextColor: "text-purple-600 dark:text-purple-400",
    category: "Transport",
    time: "9:00 AM",
    amount: "-$18.50",
  },
  {
    id: "3",
    name: "Morning Coffee",
    icon: "local_cafe",
    iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
    iconTextColor: "text-blue-600 dark:text-blue-400",
    category: "Food",
    time: "7:45 AM",
    amount: "-$5.40",
  },
];

export function RecentActivity({ items = defaultItems }: RecentActivityProps) {
  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border p-6 flex-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Recent Activity</h3>
        <Link href="/protected" className="text-sm text-primary font-medium hover:underline">
          View All
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-accent transition-colors cursor-pointer group"
          >
            <div className={`size-10 rounded-full ${item.iconBgColor} ${item.iconTextColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <MaterialIcon icon={item.icon} className="text-[20px]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{item.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {item.category} • {item.time}
              </p>
            </div>
            <p className="text-sm font-bold">{item.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
