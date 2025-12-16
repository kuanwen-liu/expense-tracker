"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { UserPreferences, UserPreferencesUpdate } from "@/lib/types/database";

/**
 * Get user preferences (create default if doesn't exist)
 */
export async function getUserPreferences(): Promise<{
  data: UserPreferences | null;
  error: string | null;
}> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "Not authenticated" };
  }

  // Try to get existing preferences
  const { data: existing, error: selectError } = await supabase
    .from("user_preferences")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (selectError) {
    return { data: null, error: selectError.message };
  }

  // If preferences exist, return them
  if (existing) {
    return { data: existing as UserPreferences, error: null };
  }

  // Create default preferences if they don't exist
  const { data: newPrefs, error: insertError } = await supabase
    .from("user_preferences")
    .insert({
      user_id: user.id,
      display_name: user.user_metadata?.full_name || null,
      default_daily_budget: 150,
      default_monthly_budget: 3500,
      currency: "USD",
    })
    .select()
    .single();

  if (insertError) {
    return { data: null, error: insertError.message };
  }

  return { data: newPrefs as UserPreferences, error: null };
}

/**
 * Update user preferences (upsert)
 */
export async function updateUserPreferences(
  preferences: UserPreferencesUpdate
): Promise<{ data: UserPreferences | null; error: string | null }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("user_preferences")
    .upsert(
      {
        user_id: user.id,
        ...preferences,
      },
      {
        onConflict: "user_id",
      }
    )
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  // Revalidate affected paths
  revalidatePath("/protected");
  revalidatePath("/protected/settings");
  revalidatePath("/protected/budget");
  revalidatePath("/protected/expenses");

  return { data: data as UserPreferences, error: null };
}

/**
 * Update user profile metadata (email, name via Supabase Auth)
 */
export async function updateUserProfile(data: {
  email?: string;
  full_name?: string;
}): Promise<{ error: string | null }> {
  const supabase = await createClient();

  const updateData: { email?: string; data?: { full_name?: string } } = {};

  if (data.email) {
    updateData.email = data.email;
  }

  if (data.full_name !== undefined) {
    updateData.data = { full_name: data.full_name };
  }

  const { error } = await supabase.auth.updateUser(updateData);

  if (error) {
    return { error: error.message };
  }

  // Revalidate affected paths
  revalidatePath("/protected");
  revalidatePath("/protected/settings");

  return { error: null };
}
