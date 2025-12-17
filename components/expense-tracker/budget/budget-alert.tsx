import Link from "next/link";
import { MaterialIcon } from "../shared/material-icon";
import { CATEGORY_CONFIG, type Category } from "@/lib/types/database";

interface BudgetAlert {
  category: Category;
  budgetAmount: number;
  spentAmount: number;
  overAmount: number;
}

interface BudgetAlertProps {
  alerts: BudgetAlert[];
}

export function BudgetAlert({ alerts }: BudgetAlertProps) {
  if (!alerts || alerts.length === 0) {
    return null;
  }

  return (
    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <div className="bg-red-500/20 rounded-lg size-10 flex items-center justify-center shrink-0">
          <MaterialIcon icon="warning" className="text-xl text-red-500" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-red-500 mb-1">Budget Alert</h3>
          <p className="text-sm text-red-500/90 mb-3">
            {alerts.length === 1
              ? "You have exceeded your budget in 1 category"
              : `You have exceeded your budget in ${alerts.length} categories`}
          </p>
          <div className="space-y-2">
            {alerts.map((alert) => {
              const config = CATEGORY_CONFIG[alert.category];
              return (
                <div
                  key={alert.category}
                  className="bg-card rounded-lg p-3 flex items-center justify-between border border-red-500/20"
                >
                  <div className="flex items-center gap-2">
                    <div className={`${config.bgColor} rounded-lg size-8 flex items-center justify-center`}>
                      <MaterialIcon icon={config.icon} className={`text-base ${config.color}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{config.label}</p>
                      <p className="text-xs text-muted-foreground">
                        ${alert.spentAmount.toFixed(2)} / ${alert.budgetAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-red-500">
                      +${alert.overAmount.toFixed(2)}
                    </p>
                    <p className="text-xs text-red-500/80">over budget</p>
                  </div>
                </div>
              );
            })}
          </div>
          <Link
            href="/protected/budget"
            className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors"
          >
            Adjust budgets
            <MaterialIcon icon="arrow_forward" className="text-base" />
          </Link>
        </div>
      </div>
    </div>
  );
}
