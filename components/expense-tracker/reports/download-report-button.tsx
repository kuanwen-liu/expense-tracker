"use client";

import { MaterialIcon } from "../shared/material-icon";

interface ReportData {
  summary: {
    totalSpent: number;
    dailyAverage: number;
    transactionCount: number;
  };
  transactions: Array<{
    date: string;
    name: string;
    category: string;
    amount: string;
  }>;
  period: string;
}

export function DownloadReportButton({ data }: { data: ReportData }) {
  const handleDownload = () => {
    // Create CSV content
    const headers = ["Date", "Description", "Category", "Amount"];
    const rows = data.transactions.map((t) => [
      t.date,
      `"${t.name.replace(/"/g, '""')}"`, // Escape quotes
      t.category,
      t.amount,
    ]);

    // Add summary at the top
    const summaryRows = [
      ["Expense Report"],
      ["Period", data.period],
      [""],
      ["Summary"],
      ["Total Spent", `$${data.summary.totalSpent.toFixed(2)}`],
      ["Daily Average", `$${data.summary.dailyAverage.toFixed(2)}`],
      ["Total Transactions", data.summary.transactionCount.toString()],
      [""],
      headers,
      ...rows,
    ];

    const csvContent = summaryRows.map((row) => row.join(",")).join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    const fileName = `expense-report-${data.period}-${new Date().toISOString().split("T")[0]}.csv`;

    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm"
    >
      <MaterialIcon icon="download" className="text-[20px]" />
      <span>Download Report</span>
    </button>
  );
}
