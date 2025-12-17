"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MaterialIcon } from "./material-icon";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/protected", icon: "dashboard", label: "Dashboard" },
  { href: "/protected/expenses", icon: "receipt_long", label: "Expenses" },
  { href: "/protected/reports", icon: "pie_chart", label: "Reports" },
  { href: "/protected/budget", icon: "savings", label: "Budget" },
  { href: "/protected/settings", icon: "settings", label: "Settings" },
];

interface SidebarProps {
  user?: {
    email?: string;
    user_metadata?: {
      full_name?: string;
      avatar_url?: string;
    };
  } | null;
  displayName?: string | null;
}

export function Sidebar({ user, displayName: preferencesDisplayName }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  // Priority: preferences display name → user metadata full name → email username → "User"
  const displayName = preferencesDisplayName || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const email = user?.email || "";

  return (
    <div className="w-64 h-full bg-card border-r border-border flex flex-col justify-between shrink-0 hidden lg:flex">
      <div className="p-4 flex flex-col gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3 px-2">
          <div className="bg-primary rounded-full size-8 flex items-center justify-center text-primary-foreground">
            <MaterialIcon icon="account_balance_wallet" className="text-xl" />
          </div>
          <h1 className="text-lg font-bold tracking-tight">ExpenseTracker</h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/protected" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent"
                )}
              >
                <MaterialIcon icon={item.icon} filled={isActive} />
                <p className="text-sm font-medium">{item.label}</p>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Profile / Logout */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <MaterialIcon icon="person" className="text-xl" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{displayName}</p>
            <p className="text-xs text-muted-foreground truncate">{email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg h-9 px-4 border border-border hover:bg-accent transition-colors text-sm font-medium"
        >
          <MaterialIcon icon="logout" className="text-[18px]" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
