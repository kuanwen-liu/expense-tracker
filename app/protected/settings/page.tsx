import { createClient } from "@/lib/supabase/server";
import { UpdateProfileForm } from "@/components/expense-tracker/update-profile-form";
import { BudgetPreferencesForm } from "@/components/expense-tracker/budget-preferences-form";
import { UpdatePasswordForm } from "@/components/update-password-form";
import { getUserPreferences } from "@/lib/actions/settings";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get user preferences
  const preferencesResult = await getUserPreferences();
  const preferences = preferencesResult.data;

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground text-sm">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Section */}
      <UpdateProfileForm user={user} preferences={preferences} />

      {/* Security Section */}
      <div className="relative">
        <UpdatePasswordForm />
      </div>

      {/* Budget Preferences Section */}
      <BudgetPreferencesForm preferences={preferences} />
    </div>
  );
}
