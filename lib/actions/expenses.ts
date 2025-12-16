"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { Expense, ExpenseInsert, ExpenseUpdate, Category } from "@/lib/types/database";

export async function getExpenses(options?: {
  startDate?: string;
  endDate?: string;
  category?: Category;
  limit?: number;
}): Promise<{ data: Expense[] | null; error: string | null }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "Not authenticated" };
  }

  let query = supabase
    .from("expenses")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: false });

  if (options?.startDate) {
    query = query.gte("date", options.startDate);
  }
  if (options?.endDate) {
    query = query.lte("date", options.endDate);
  }
  if (options?.category) {
    query = query.eq("category", options.category);
  }
  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as Expense[], error: null };
}

export async function getExpense(id: string): Promise<{ data: Expense | null; error: string | null }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as Expense, error: null };
}

export async function createExpense(
  expense: ExpenseInsert
): Promise<{ data: Expense | null; error: string | null }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("expenses")
    .insert({
      ...expense,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  revalidatePath("/protected");
  revalidatePath("/protected/expenses");
  revalidatePath("/protected/reports");

  return { data: data as Expense, error: null };
}

export async function updateExpense(
  id: string,
  expense: ExpenseUpdate
): Promise<{ data: Expense | null; error: string | null }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("expenses")
    .update(expense)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  revalidatePath("/protected");
  revalidatePath("/protected/expenses");
  revalidatePath("/protected/reports");

  return { data: data as Expense, error: null };
}

export async function deleteExpense(id: string): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("expenses")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/protected");
  revalidatePath("/protected/expenses");
  revalidatePath("/protected/reports");

  return { error: null };
}

export async function getExpenseSummary(options?: {
  startDate?: string;
  endDate?: string;
}): Promise<{
  data: {
    totalSpent: number;
    dailyAverage: number;
    byCategory: { category: Category; amount: number; percentage: number }[];
    transactionCount: number;
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

  let query = supabase
    .from("expenses")
    .select("*")
    .eq("user_id", user.id)
    .gte("date", startDate)
    .lte("date", endDate);

  const { data: expenses, error } = await query;

  if (error) {
    return { data: null, error: error.message };
  }

  if (!expenses || expenses.length === 0) {
    return {
      data: {
        totalSpent: 0,
        dailyAverage: 0,
        byCategory: [],
        transactionCount: 0,
      },
      error: null,
    };
  }

  const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  // Calculate days in range
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const dailyAverage = totalSpent / days;

  // Group by category
  const categoryTotals: Record<string, number> = {};
  expenses.forEach((e) => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + Number(e.amount);
  });

  const byCategory = Object.entries(categoryTotals)
    .map(([category, amount]) => ({
      category: category as Category,
      amount,
      percentage: Math.round((amount / totalSpent) * 100),
    }))
    .sort((a, b) => b.amount - a.amount);

  return {
    data: {
      totalSpent,
      dailyAverage,
      byCategory,
      transactionCount: expenses.length,
    },
    error: null,
  };
}

export async function getTodayExpenses(): Promise<{
  data: { totalSpent: number; expenses: Expense[] } | null;
  error: string | null;
}> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "Not authenticated" };
  }

  const today = new Date().toISOString().split("T")[0];

  const { data: expenses, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("user_id", user.id)
    .eq("date", today)
    .order("created_at", { ascending: false });

  if (error) {
    return { data: null, error: error.message };
  }

  const totalSpent = (expenses || []).reduce((sum, e) => sum + Number(e.amount), 0);

  return {
    data: {
      totalSpent,
      expenses: (expenses || []) as Expense[],
    },
    error: null,
  };
}

export async function getDailySpending(options?: {
  startDate?: string;
  endDate?: string;
}): Promise<{
  data: { date: string; amount: number }[] | null;
  error: string | null;
}> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "Not authenticated" };
  }

  const now = new Date();
  const startDate = options?.startDate || new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
  const endDate = options?.endDate || new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];

  const { data: expenses, error } = await supabase
    .from("expenses")
    .select("date, amount")
    .eq("user_id", user.id)
    .gte("date", startDate)
    .lte("date", endDate)
    .order("date", { ascending: true });

  if (error) {
    return { data: null, error: error.message };
  }

  // Group by date
  const dailyTotals: Record<string, number> = {};
  (expenses || []).forEach((e) => {
    dailyTotals[e.date] = (dailyTotals[e.date] || 0) + Number(e.amount);
  });

  const result = Object.entries(dailyTotals).map(([date, amount]) => ({
    date,
    amount,
  }));

  return { data: result, error: null };
}
