import { MaterialIcon } from "./material-icon";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  icon: string;
  iconColor?: string;
  iconBgColor?: string;
  trend?: {
    value: string;
    isPositive: boolean;
    label?: string;
  };
  subtitle?: string;
}

export function StatsCard({
  title,
  value,
  icon,
  iconColor = "text-primary",
  iconBgColor = "bg-primary/10",
  trend,
  subtitle,
}: StatsCardProps) {
  return (
    <div className="bg-card p-5 rounded-xl border border-border shadow-sm flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm font-medium">{title}</p>
        <span className={cn("p-1.5 rounded-md text-[20px]", iconColor, iconBgColor)}>
          <MaterialIcon icon={icon} />
        </span>
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        {trend && (
          <p
            className={cn(
              "text-xs font-medium mt-1 flex items-center gap-0.5",
              trend.isPositive ? "text-green-600" : "text-destructive"
            )}
          >
            <MaterialIcon
              icon={trend.isPositive ? "trending_up" : "trending_down"}
              className="text-[14px]"
            />
            {trend.value}
            {trend.label && (
              <span className="text-muted-foreground font-normal ml-1">{trend.label}</span>
            )}
          </p>
        )}
        {subtitle && (
          <p className="text-muted-foreground text-xs font-medium mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
