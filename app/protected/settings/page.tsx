import { createClient } from "@/lib/supabase/server";
import { UpdateProfileForm } from "@/components/expense-tracker/settings/update-profile-form";
import { BudgetPreferencesForm } from "@/components/expense-tracker/settings/budget-preferences-form";
import { UpdatePasswordForm } from "@/components/update-password-form";
import { getUserPreferences } from "@/lib/actions/settings";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get user preferences
  const preferencesResult = await getUserPreferences();
  const preferences = preferencesResult.data;

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto w-full">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground text-sm">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-8 w-1 bg-primary rounded-full" />
          <h3 className="text-lg font-semibold">Account</h3>
        </div>
        <UpdateProfileForm user={user} preferences={preferences} />
      </div>

      {/* Security Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-8 w-1 bg-primary rounded-full" />
          <h3 className="text-lg font-semibold">Security</h3>
        </div>
        <UpdatePasswordForm />
      </div>

      {/* Budget Preferences Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-8 w-1 bg-primary rounded-full" />
          <h3 className="text-lg font-semibold">Preferences</h3>
        </div>
        <BudgetPreferencesForm preferences={preferences} />
      </div>
    </div>
  );
}
