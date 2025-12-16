"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { Budget, BudgetInsert, Category } from "@/lib/types/database";

/**
 * Get all budgets for the current user
 */
export async function getBudgets(options?: {
  period?: "daily" | "monthly" | "yearly";
}): Promise<{ data: Budget[] | null; error: string | null }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "Not authenticated" };
  }

  let query = supabase
    .from("budgets")
    .select("*")
    .eq("user_id", user.id)
    .order("category", { ascending: true });

  if (options?.period) {
    query = query.eq("period", options.period);
  }

  const { data, error } = await query;

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as Budget[], error: null };
}

/**
 * Get a specific budget by category and period
 */
export async function getBudget(
  category: Category | "total",
  period: "daily" | "monthly" | "yearly"
): Promise<{ data: Budget | null; error: string | null }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("budgets")
    .select("*")
    .eq("user_id", user.id)
    .eq("category", category)
    .eq("period", period)
    .maybeSingle();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as Budget | null, error: null };
}

/**
 * Create or update a budget (upsert)
 */
export async function upsertBudget(
  budget: BudgetInsert
): Promise<{ data: Budget | null; error: string | null }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("budgets")
    .upsert(
      {
        user_id: user.id,
        category: budget.category,
        amount: budget.amount,
        period: budget.period,
      },
      {
        onConflict: "user_id,category,period",
      }
    )
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  // Revalidate all affected paths
  revalidatePath("/protected");
  revalidatePath("/protected/budget");
  revalidatePath("/protected/expenses");
  revalidatePath("/protected/reports");

  return { data: data as Budget, error: null };
}

/**
 * Delete a budget
 */
export async function deleteBudget(
  category: Category | "total",
  period: "daily" | "monthly" | "yearly"
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("budgets")
    .delete()
    .eq("user_id", user.id)
    .eq("category", category)
    .eq("period", period);

  if (error) {
    return { error: error.message };
  }

  // Revalidate all affected paths
  revalidatePath("/protected");
  revalidatePath("/protected/budget");
  revalidatePath("/protected/expenses");
  revalidatePath("/protected/reports");

  return { error: null };
}

/**
 * Get budget status with spending comparison
 */
export async function getBudgetStatus(options?: {
  startDate?: string;
  endDate?: string;
}): Promise<{
  data: {
    budgets: (Budget & {
      spent: number;
      percentage: number;
      isOverBudget: boolean;
    })[];
    totalBudget: number;
    totalSpent: number;
  } | null;
  error: string | null;
}> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "Not authenticated" };
  }

  // Default to current month if no dates provided
  const now = new Date();
  const startDate = options?.startDate || new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
  const endDate = options?.endDate || new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];

  // Get monthly budgets
  const { data: budgets, error: budgetsError } = await supabase
    .from("budgets")
    .select("*")
    .eq("user_id", user.id)
    .eq("period", "monthly");

  if (budgetsError) {
    return { data: null, error: budgetsError.message };
  }

  if (!budgets || budgets.length === 0) {
    return {
      data: {
        budgets: [],
        totalBudget: 0,
        totalSpent: 0,
      },
      error: null,
    };
  }

  // Get expenses for the period
  const { data: expenses, error: expensesError } = await supabase
    .from("expenses")
    .select("category, amount")
    .eq("user_id", user.id)
    .gte("date", startDate)
    .lte("date", endDate);

  if (expensesError) {
    return { data: null, error: expensesError.message };
  }

  // Calculate spending by category
  const spendingByCategory: Record<string, number> = {};
  let totalSpent = 0;

  (expenses || []).forEach((expense) => {
    spendingByCategory[expense.category] = (spendingByCategory[expense.category] || 0) + Number(expense.amount);
    totalSpent += Number(expense.amount);
  });

  // Map budgets with spending data
  const budgetsWithSpending = (budgets as Budget[]).map((budget) => {
    const spent = budget.category === "total"
      ? totalSpent
      : (spendingByCategory[budget.category] || 0);
    const percentage = budget.amount > 0 ? Math.round((spent / budget.amount) * 100) : 0;
    const isOverBudget = spent > budget.amount;

    return {
      ...budget,
      spent,
      percentage,
      isOverBudget,
    };
  });

  // Calculate total budget (use 'total' category if exists, otherwise sum all categories)
  const totalBudgetEntry = budgetsWithSpending.find(b => b.category === "total");
  const totalBudget = totalBudgetEntry
    ? totalBudgetEntry.amount
    : budgetsWithSpending.reduce((sum, b) => sum + b.amount, 0);

  return {
    data: {
      budgets: budgetsWithSpending,
      totalBudget,
      totalSpent,
    },
    error: null,
  };
}
