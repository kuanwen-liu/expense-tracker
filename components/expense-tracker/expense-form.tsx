"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MaterialIcon } from "./material-icon";
import { createExpense } from "@/lib/actions/expenses";
import type { Category } from "@/lib/types/database";

const categories = [
  { value: "food", label: "Food & Dining" },
  { value: "transport", label: "Transportation" },
  { value: "utilities", label: "Utilities" },
  { value: "entertainment", label: "Entertainment" },
  { value: "shopping", label: "Shopping" },
  { value: "health", label: "Health" },
  { value: "rent", label: "Rent & Housing" },
  { value: "other", label: "Other" },
];

const quickChips = ["food", "transport", "entertainment"];

export function ExpenseForm() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent, addAnother = false) => {
    e.preventDefault();
    setError(null);

    if (!amount || !category || !date) {
      setError("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createExpense({
        amount: parseFloat(amount),
        category: category as Category,
        description: description || null,
        date,
      });

      if (result.error) {
        setError(result.error);
        return;
      }

      if (addAnother) {
        setAmount("");
        setDescription("");
      } else {
        router.push("/protected");
      }
    } catch {
      setError("Failed to save expense");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setAmount("");
    setCategory("");
    setDate(new Date().toISOString().split("T")[0]);
    setDescription("");
    setError(null);
  };

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border p-6 md:p-8">
      {/* Amount Input Section */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Total Amount
        </label>
        <div className="relative flex items-center">
          <span className="absolute left-0 top-1/2 -translate-y-1/2 text-4xl font-bold text-muted-foreground pl-4">
            $
          </span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            autoFocus
            className="block w-full border-2 border-border rounded-xl py-6 pl-12 pr-4 text-5xl font-black bg-transparent focus:border-primary focus:ring-0 placeholder:text-muted-foreground/30 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Category Select */}
        <div className="flex flex-col gap-2">
          <label className="text-base font-medium">Category</label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border-border bg-accent h-14 pl-4 pr-10 focus:border-primary focus:ring-primary/20 appearance-none text-base transition-shadow"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
              <MaterialIcon icon="expand_more" />
            </div>
          </div>
          {/* Quick Chips */}
          <div className="flex gap-2 flex-wrap mt-1">
            {quickChips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setCategory(chip.toLowerCase())}
                className="text-xs font-medium px-3 py-1.5 rounded-full bg-accent text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Date Picker */}
        <div className="flex flex-col gap-2">
          <label className="text-base font-medium">Date</label>
          <div className="relative">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border-border bg-accent h-14 pl-12 pr-4 focus:border-primary focus:ring-primary/20 text-base transition-shadow"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 text-muted-foreground">
              <MaterialIcon icon="calendar_today" />
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2 mb-8">
        <label className="text-base font-medium">
          Description <span className="text-muted-foreground font-normal text-sm ml-1">(Optional)</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What was this expense for?"
          className="w-full rounded-xl border-border bg-accent min-h-[120px] p-4 focus:border-primary focus:ring-primary/20 text-base resize-none transition-shadow"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-destructive/10 text-destructive text-sm font-medium flex items-center gap-2">
          <MaterialIcon icon="error" className="text-[20px]" />
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4 border-t border-border">
        <button
          onClick={(e) => handleSubmit(e)}
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 rounded-xl font-bold text-base shadow-lg shadow-primary/30 transition-all transform active:scale-95 flex-1 md:flex-none flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <MaterialIcon icon="progress_activity" className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <MaterialIcon icon="check" />
              Save Expense
            </>
          )}
        </button>
        <button
          onClick={(e) => handleSubmit(e, true)}
          disabled={isSubmitting}
          className="bg-accent hover:bg-accent/80 h-12 px-8 rounded-xl font-medium text-base transition-colors flex-1 md:flex-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save & Add Another
        </button>
        <div className="flex-1"></div>
        <button
          onClick={handleClear}
          type="button"
          disabled={isSubmitting}
          className="text-muted-foreground hover:text-destructive font-medium text-sm transition-colors hidden md:block disabled:opacity-50"
        >
          Clear Form
        </button>
      </div>
    </div>
  );
}
