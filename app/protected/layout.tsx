import { Suspense } from "react";
import { Sidebar } from "@/components/expense-tracker/shared/sidebar";
import { MobileHeader } from "@/components/expense-tracker/shared/mobile-header";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { createClient } from "@/lib/supabase/server";
import { getUserPreferences } from "@/lib/actions/settings";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get user preferences for display name
  const preferencesResult = await getUserPreferences();
  const displayName = preferencesResult.data?.display_name || null;

  return (
    <div className="relative flex h-screen w-full overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar user={user} displayName={displayName} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        {/* Mobile Header */}
        <MobileHeader />

        {/* Page Content */}
        <div className="flex-1 p-4 lg:p-8 max-w-[1200px] mx-auto w-full">
          {children}
        </div>

        {/* Footer */}
        <footer className="w-full flex items-center justify-center border-t border-border text-center text-xs gap-4 py-4 px-4">
          <ThemeSwitcher />
        </footer>
      </div>
    </div>
  );
}
