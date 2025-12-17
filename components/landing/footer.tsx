import Link from "next/link";

interface FooterProps {
  isAuthenticated?: boolean;
}

export function Footer({ isAuthenticated = false }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t bg-muted/50 overflow-hidden">
      {/* Enhanced background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background -z-10" />
      <div className="absolute inset-0 bg-grid-white/[0.01] -z-10" />

      {/* Decorative blur circles */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 hidden lg:block" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10 hidden lg:block" />

      <div className="container max-w-7xl mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl text-primary">
                  account_balance_wallet
                </span>
              </div>
              <span>ExpenseTracker</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Simple, powerful expense tracking for individuals who want to take control of their finances.
            </p>
          </div>

          {/* Product Section */}
          <div className="space-y-5">
            <h3 className="font-semibold text-base">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#features" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  <span className="relative">
                    Features
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#preview" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  <span className="relative">
                    Preview
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              </li>
              {isAuthenticated ? (
                <li>
                  <Link href="/protected" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group">
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                    <span className="relative">
                      Dashboard
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ) : (
                <li>
                  <Link href="/auth/sign-up" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group">
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                    <span className="relative">
                      Get Started
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Resources Section */}
          <div className="space-y-5">
            <h3 className="font-semibold text-base">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  <span className="relative">
                    Documentation
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  <span className="relative">
                    Support
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  <span className="relative">
                    Blog
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="space-y-5">
            <h3 className="font-semibold text-base">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  <span className="relative">
                    Privacy Policy
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  <span className="relative">
                    Terms of Service
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              </li>
              <li>
                <Link href="mailto:support@expensetracker.com" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  <span className="relative">
                    Contact
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-primary/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {currentYear} ExpenseTracker. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span>Built with</span>
              <span className="text-red-500 text-lg">♥</span>
              <span>using Next.js & Supabase</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
