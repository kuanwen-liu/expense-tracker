import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  isAuthenticated?: boolean;
}

export function HeroSection({ isAuthenticated = false }: HeroSectionProps) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Enhanced background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background -z-10" />
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />

      {/* Decorative blur circles */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />

      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Icon decoration with background */}
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
            <div className="relative bg-primary/10 p-6 rounded-2xl border border-primary/20">
              <span className="material-symbols-outlined text-6xl md:text-7xl text-primary">
                account_balance_wallet
              </span>
            </div>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Take Control of Your Finances
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
            ExpenseTracker helps you manage your money with smart budgets, real-time insights,
            and beautiful reports. Start tracking in minutes, no credit card required.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            {isAuthenticated ? (
              <Button asChild size="lg" className="text-lg px-10 py-6 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                <Link href="/protected">
                  <span className="material-symbols-outlined mr-2 text-xl">dashboard</span>
                  Go to Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="text-lg px-10 py-6 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                  <Link href="/auth/sign-up">
                    <span className="material-symbols-outlined mr-2 text-xl">rocket_launch</span>
                    Get Started Free
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-10 py-6 border-2 hover:bg-primary/5 transition-all">
                  <Link href="/auth/login">
                    <span className="material-symbols-outlined mr-2 text-xl">login</span>
                    Sign In
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Trust indicators - Enhanced */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="material-symbols-outlined text-2xl text-green-500">lock</span>
              <span className="font-medium">Secure & Private</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
              <span className="material-symbols-outlined text-2xl text-blue-500">cloud_done</span>
              <span className="font-medium">Cloud Synced</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
              <span className="material-symbols-outlined text-2xl text-purple-500">devices</span>
              <span className="font-medium">All Devices</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}