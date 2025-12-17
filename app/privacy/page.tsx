import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - ExpenseTracker",
  description: "ExpenseTracker's privacy policy and data handling practices.",
  robots: "index, follow",
};

export default function PrivacyPage() {
  const lastUpdated = "December 17, 2024";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isAuthenticated={false} />
      <main className="flex-1 py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground text-lg">
              Last updated: <time dateTime={lastUpdated}>{lastUpdated}</time>
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Welcome to ExpenseTracker. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions or concerns about our policy or our practices with regards to your personal information, please contact us at{" "}
                <a href="mailto:privacy@expensetracker.com" className="text-primary hover:underline">
                  privacy@expensetracker.com
                </a>
                .
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6">Information We Collect</h2>

              <h3 className="text-xl font-semibold mt-8 mb-4">Account Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When you create an account, we collect:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground mb-4">
                <li>Email address</li>
                <li>Display name (optional)</li>
                <li>Password (encrypted)</li>
                <li>Account preferences (currency, budget settings)</li>
              </ul>

              <h3 className="text-xl font-semibold mt-8 mb-4">Financial Data</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To provide our expense tracking services, we collect:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground mb-4">
                <li>Expense transactions (amount, category, date, description)</li>
                <li>Budget information</li>
                <li>Category preferences</li>
                <li>Spending patterns and analytics data</li>
              </ul>

              <h3 className="text-xl font-semibold mt-8 mb-4">Technical Data</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We automatically collect certain technical information:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground mb-4">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Usage data and analytics</li>
                <li>Cookies and similar technologies</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6">How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use your information to:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground mb-4">
                <li><strong>Provide Services:</strong> Enable you to track expenses, manage budgets, and view financial insights</li>
                <li><strong>Improve Experience:</strong> Analyze usage patterns to enhance our features and user interface</li>
                <li><strong>Communication:</strong> Send you service updates, notifications, and important account information</li>
                <li><strong>Security:</strong> Protect against fraud, unauthorized access, and other security risks</li>
                <li><strong>Legal Compliance:</strong> Comply with legal obligations and enforce our terms</li>
              </ul>
            </section>

            {/* Data Storage & Security */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6">Data Storage & Security</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Your data is securely stored using <strong>Supabase</strong>, a trusted cloud infrastructure provider. We implement industry-standard security measures:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground mb-4">
                <li><strong>Encryption:</strong> All data is encrypted in transit (TLS/SSL) and at rest</li>
                <li><strong>Authentication:</strong> Secure authentication system with password hashing</li>
                <li><strong>Access Control:</strong> Row-level security ensures users can only access their own data</li>
                <li><strong>Regular Backups:</strong> Automated backups to prevent data loss</li>
                <li><strong>Monitoring:</strong> Continuous monitoring for security threats</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We retain your data for as long as your account is active or as needed to provide services. You can request deletion of your account and data at any time.
              </p>
            </section>

            {/* Third-Party Services */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6">Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the following third-party services to operate our platform:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground mb-4">
                <li><strong>Supabase:</strong> Database and authentication services</li>
                <li><strong>Vercel/Hosting Provider:</strong> Application hosting and deployment</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These service providers have their own privacy policies and are responsible for their own data practices.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6">Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have the following rights regarding your personal data:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground mb-4">
                <li><strong>Access:</strong> View and download all your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and all associated data</li>
                <li><strong>Export:</strong> Download your data in a portable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Object:</strong> Object to processing of your data for certain purposes</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To exercise these rights, please contact us at{" "}
                <a href="mailto:privacy@expensetracker.com" className="text-primary hover:underline">
                  privacy@expensetracker.com
                </a>
                .
              </p>
            </section>

            {/* Cookies & Tracking */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6">Cookies & Tracking</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground mb-4">
                <li><strong>Essential Cookies:</strong> Required for authentication and core functionality</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                <li><strong>Analytics Cookies:</strong> Understand how you use our service (if applicable)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You can control cookies through your browser settings. Note that disabling certain cookies may affect functionality.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6">Changes to Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground mb-4">
                <li>Updating the "Last updated" date at the top of this policy</li>
                <li>Sending an email notification for significant changes</li>
                <li>Displaying a notice on our website</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Your continued use of ExpenseTracker after changes constitute acceptance of the updated policy.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6">Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-muted/50 rounded-lg p-6 border border-border">
                <p className="text-muted-foreground mb-2">
                  <strong>Email:</strong>{" "}
                  <a href="mailto:privacy@expensetracker.com" className="text-primary hover:underline">
                    privacy@expensetracker.com
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
                <strong>Note:</strong> This is a template privacy policy. Please review and customize it with your legal counsel before using in production. Ensure compliance with applicable laws in your jurisdiction (GDPR, CCPA, etc.).
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer isAuthenticated={false} />
    </div>
  );
}
