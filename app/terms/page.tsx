import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service - ExpenseTracker",
  description: "ExpenseTracker's terms of service and user agreement.",
  robots: "index, follow",
};

export default function TermsPage() {
  const lastUpdated = "December 17, 2024";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isAuthenticated={false} />
      <main className="flex-1 py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground text-lg">
              Last updated: <time dateTime={lastUpdated}>{lastUpdated}</time>
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {/* Acceptance of Terms */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By accessing or using ExpenseTracker ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Service.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These Terms constitute a legally binding agreement between you and ExpenseTracker. By creating an account, you represent that you are at least 18 years old or have parental/guardian consent.
              </p>
            </section>

            {/* Description of Service */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                ExpenseTracker provides an online expense tracking and budget management platform that allows users to:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground mb-4">
                <li>Record and categorize financial expenses</li>
                <li>Set and monitor budgets</li>
                <li>Generate spending reports and insights</li>
                <li>Access their data across multiple devices</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time with or without notice. We will not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.
              </p>
            </section>

            {/* User Accounts */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6">3. User Accounts</h2>

              <h3 className="text-xl font-semibold mt-8 mb-4">Account Creation</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To use our Service, you must create an account by providing:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground mb-4">
                <li>A valid email address</li>
                <li>A secure password</li>
                <li>Optional profile information</li>
              </ul>

              <h3 className="text-xl font-semibold mt-8 mb-4">Account Security</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You are responsible for:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground mb-4">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized access</li>
                <li>Ensuring your account information is accurate and up-to-date</li>
              </ul>

              <h3 className="text-xl font-semibold mt-8 mb-4">Account Termination</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We reserve the right to suspend or terminate your account if you:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground mb-4">
                <li>Violate these Terms</li>
                <li>Engage in fraudulent or illegal activities</li>
                <li>Abuse or misuse the Service</li>
                <li>Are inactive for an extended period</li>
              </ul>
            </section>

            {/* User Responsibilities */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6">4. User Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When using ExpenseTracker, you agree to:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground mb-4">
                <li><strong>Accurate Data:</strong> Enter expense information accurately and honestly</li>
                <li><strong>Lawful Use:</strong> Use the Service only for lawful purposes</li>
                <li><strong>No Misuse:</strong> Not attempt to compromise the security or integrity of our systems</li>
                <li><strong>No Automation:</strong> Not use automated tools to access the Service without permission</li>
                <li><strong>Respectful Conduct:</strong> Not harass, abuse, or harm other users</li>
              </ul>

              <h3 className="text-xl font-semibold mt-8 mb-4">Prohibited Activities</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may not:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground mb-4">
                <li>Reverse engineer, decompile, or disassemble the Service</li>
                <li>Remove or modify any copyright or proprietary notices</li>
                <li>Use the Service for unauthorized commercial purposes</li>
                <li>Transmit viruses, malware, or harmful code</li>
                <li>Impersonate any person or entity</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6">5. Intellectual Property</h2>

              <h3 className="text-xl font-semibold mt-8 mb-4">Our Ownership</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Service, including its software, design, content, and trademarks, is owned by ExpenseTracker and protected by copyright, trademark, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">Your Data</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You retain all rights to your expense data and personal information. By using the Service, you grant us a limited license to:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground mb-4">
                <li>Store and process your data to provide the Service</li>
                <li>Create anonymized, aggregated analytics (opt-in)</li>
                <li>Backup your data for disaster recovery</li>
              </ul>
            </section>

            {/* Data & Privacy */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6">6. Data & Privacy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Your privacy is important to us. Our collection and use of personal information is governed by our{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                , which is incorporated into these Terms by reference.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Key points:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground mb-4">
                <li>Your data is stored securely using Supabase infrastructure</li>
                <li>You can export your data at any time</li>
                <li>You can request deletion of your account and data</li>
                <li>We do not sell your personal information</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6">7. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>Service Provided "As Is"</strong>
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                ExpenseTracker is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground mb-4">
                <li>The Service will be uninterrupted or error-free</li>
                <li>Defects will be corrected</li>
                <li>The Service is free of viruses or harmful components</li>
                <li>Results from using the Service will meet your requirements</li>
              </ul>

              <p className="text-muted-foreground leading-relaxed mb-4 mt-6">
                <strong>Limitation of Damages</strong>
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To the maximum extent permitted by law, ExpenseTracker shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground mb-4">
                <li>Loss of profits or revenue</li>
                <li>Loss of data</li>
                <li>Loss of business opportunities</li>
                <li>Cost of substitute services</li>
              </ul>
            </section>

            {/* Disclaimer */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6">8. Disclaimer</h2>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <strong className="text-amber-600 dark:text-amber-400">Important:</strong>
                </p>
                <ul className="ml-6 list-disc space-y-2 text-muted-foreground mb-4">
                  <li><strong>Not Financial Advice:</strong> ExpenseTracker is a tool for tracking expenses. It does not provide financial, investment, tax, or legal advice.</li>
                  <li><strong>Not a Financial Institution:</strong> We are not a bank, financial institution, or licensed financial advisor.</li>
                  <li><strong>Tax Reporting:</strong> You are solely responsible for tax reporting and compliance. Consult a tax professional for tax-related matters.</li>
                  <li><strong>Data Accuracy:</strong> While we strive for accuracy, you are responsible for verifying all calculations and reports.</li>
                </ul>
              </div>
            </section>

            {/* Termination */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6">9. Termination</h2>

              <h3 className="text-xl font-semibold mt-8 mb-4">By You</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may terminate your account at any time by:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground mb-4">
                <li>Deleting your account through account settings</li>
                <li>Contacting support at{" "}
                  <a href="mailto:support@expensetracker.com" className="text-primary hover:underline">
                    support@expensetracker.com
                  </a>
                </li>
              </ul>

              <h3 className="text-xl font-semibold mt-8 mb-4">By Us</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may terminate or suspend your account immediately if:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground mb-4">
                <li>You breach these Terms</li>
                <li>Your account is involved in fraudulent activity</li>
                <li>We are required to do so by law</li>
                <li>We cease operating the Service</li>
              </ul>

              <h3 className="text-xl font-semibold mt-8 mb-4">Effect of Termination</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Upon termination:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground mb-4">
                <li>Your right to access the Service ceases immediately</li>
                <li>Your data may be retained for a limited period as required by law</li>
                <li>You may request a data export before account deletion</li>
                <li>Certain provisions of these Terms survive termination (e.g., liability limitations, disclaimers)</li>
              </ul>
            </section>

            {/* Governing Law */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6">10. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Any disputes arising from these Terms or your use of the Service shall be resolved through:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground mb-4">
                <li>Good faith negotiations between the parties</li>
                <li>Mediation, if negotiations fail</li>
                <li>Binding arbitration or courts of [Your Jurisdiction]</li>
              </ul>
            </section>

            {/* Changes to Terms */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6">11. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We reserve the right to modify these Terms at any time. Changes will be effective:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground mb-4">
                <li>Immediately upon posting for minor changes</li>
                <li>After 30 days notice for material changes</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We will notify you of significant changes via:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground mb-4">
                <li>Email to your registered address</li>
                <li>Notice on our website</li>
                <li>In-app notification</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Continued use of the Service after changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6">12. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have questions about these Terms, please contact us:
              </p>
              <div className="bg-muted/50 rounded-lg p-6 border border-border">
                <p className="text-muted-foreground mb-2">
                  <strong>Email:</strong>{" "}
                  <a href="mailto:legal@expensetracker.com" className="text-primary hover:underline">
                    legal@expensetracker.com
                  </a>
                </p>
                <p className="text-muted-foreground mb-2">
                  <strong>Support:</strong>{" "}
                  <a href="mailto:support@expensetracker.com" className="text-primary hover:underline">
                    support@expensetracker.com
                  </a>
                </p>
              </div>
            </section>

            {/* Disclaimer */}
            <div className="mt-16 p-6 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <p className="text-sm text-amber-600 dark:text-amber-400">
                <strong>Note:</strong> This is a template terms of service document. Please review and customize it with your legal counsel before using in production. Ensure compliance with applicable laws in your jurisdiction. Update [Your Jurisdiction] with your actual legal jurisdiction.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer isAuthenticated={false} />
    </div>
  );
}
