import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { ScreenshotsSection } from "@/components/landing/screenshots-section";
import { Footer } from "@/components/landing/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ExpenseTracker - Take Control of Your Finances",
  description:
    "Simple, powerful expense tracking with smart budgets, real-time insights, and beautiful reports. Start tracking in minutes, no credit card required.",
  keywords: ["expense tracker", "budget management", "personal finance", "spending tracker", "money management"],
  openGraph: {
    title: "ExpenseTracker - Take Control of Your Finances",
    description: "Track expenses, manage budgets, and gain financial insights with ExpenseTracker.",
    type: "website",
  },
};

export default async function Home() {
  // Check if user is already authenticated
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isAuthenticated = !!user;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isAuthenticated={isAuthenticated} />
      <main className="flex-1">
        <HeroSection isAuthenticated={isAuthenticated} />
        <div id="features">
          <FeaturesSection />
        </div>
        <div id="screenshots">
          <ScreenshotsSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
