"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MaterialIcon } from "./material-icon";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/protected", icon: "dashboard", label: "Dashboard" },
  { href: "/protected/expenses", icon: "receipt_long", label: "Expenses" },
  { href: "/protected/reports", icon: "pie_chart", label: "Reports" },
  { href: "/protected/budget", icon: "savings", label: "Budget" },
  { href: "/protected/settings", icon: "settings", label: "Settings" },
];

export function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <>
      <div className="lg:hidden flex items-center justify-between p-4 bg-card border-b border-border">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-full size-8 flex items-center justify-center text-primary-foreground">
            <MaterialIcon icon="account_balance_wallet" className="text-lg" />
          </div>
          <h1 className="font-bold">ExpenseTracker</h1>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-muted-foreground hover:text-foreground"
        >
          <MaterialIcon icon={isMenuOpen ? "close" : "menu"} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-64 bg-card border-r border-border shadow-lg">
            <div className="p-4 flex flex-col gap-6 h-full">
              {/* Brand */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 px-2">
                  <div className="bg-primary rounded-full size-8 flex items-center justify-center text-primary-foreground">
                    <MaterialIcon icon="account_balance_wallet" className="text-xl" />
                  </div>
                  <h1 className="text-lg font-bold tracking-tight">ExpenseTracker</h1>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-muted-foreground hover:text-foreground"
                >
                  <MaterialIcon icon="close" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-1 flex-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href ||
                    (item.href !== "/protected" && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
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

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg h-9 px-4 border border-border hover:bg-accent transition-colors text-sm font-medium"
              >
                <MaterialIcon icon="logout" className="text-[18px]" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
