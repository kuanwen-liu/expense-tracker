# Expense Tracker

A modern expense tracking application built with Next.js and Supabase. Track your daily spending, categorize expenses, visualize spending trends, and manage your budget all in one place.

## Features

- **User Authentication**: Secure authentication with Supabase Auth using email and password
- **Protected Routes**: All pages require login to access
- **Expense Management**:
  - Add expenses with categories, amounts, dates, and descriptions
  - View all expenses with sorting and filtering
  - Automatic categorization of spending
  - Calendar widget for date selection
- **Financial Insights**:
  - Dashboard with KPI metrics (Total Spent, Budget Remaining, Daily Average, Top Category)
  - Daily spending trend charts
  - Category breakdown visualization
  - Monthly budget tracking and spending analysis
  - Detailed reports with filtering and export functionality
- **Budget Management**:
  - Set category-specific budget limits
  - Real-time budget alerts and notifications
  - Track budget performance by category
- **Settings & Customization**:
  - Currency preferences (multiple currency support)
  - Budget preferences and limits
  - User profile management
- **Modern UI**:
  - Landing page with hero section and feature showcase
  - Dark mode support with next-themes
  - Material Symbols icons via Google Fonts
  - Responsive design with Tailwind CSS
  - Smooth animations and transitions
- **Tech Stack**:
  - [Next.js 15](https://nextjs.org) with App Router
  - [Supabase](https://supabase.com) for backend and database
  - [Tailwind CSS](https://tailwindcss.com) for styling
  - [shadcn/ui](https://ui.shadcn.com/) components
  - TypeScript for type safety

## Getting Started

### Prerequisites

- Node.js 18.18 or higher
- A Supabase project (create one at [supabase.com](https://supabase.com))

### Setup

1. Clone the repository and navigate to the project directory:

   ```bash
   cd expense-tracker
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file and add your Supabase credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=[YOUR_SUPABASE_URL]
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=[YOUR_SUPABASE_PUBLISHABLE_KEY]
   ```

   Find these values in your [Supabase project settings](https://supabase.com/dashboard/project/_?showConnect=true).

4. Run the SQL migration in Supabase to set up the database schema:

   - Go to your Supabase Dashboard
   - Navigate to SQL Editor
   - Copy and run the migration from `supabase/migrations/001_create_expenses.sql`

5. Start the development server:

   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  page.tsx                      # Landing page
  privacy/
    page.tsx                    # Privacy policy
  terms/
    page.tsx                    # Terms of service
  auth/                         # Authentication pages
    login/
    sign-up/
    forgot-password/
  protected/                    # Protected routes (require authentication)
    layout.tsx                  # Shared layout with sidebar
    page.tsx                    # Dashboard page
    expenses/
      page.tsx                  # Expense entry page
    reports/
      page.tsx                  # Financial insights & reports page
    budget/
      page.tsx                  # Budget management page
    settings/
      page.tsx                  # User settings page

components/
  landing/                      # Landing page components
    navbar.tsx
    hero-section.tsx
    features-section.tsx
    screenshots-section.tsx
    footer.tsx
  expense-tracker/
    shared/                     # Shared components
      sidebar.tsx
      mobile-header.tsx
      stats-card.tsx
      material-icon.tsx
    dashboard/                  # Dashboard components
      spending-chart.tsx
      category-breakdown.tsx
      transactions-table.tsx
      budget-progress.tsx
    expenses/                   # Expense page components
      expense-form.tsx
      daily-summary.tsx
      recent-activity.tsx
      calendar-widget.tsx
    reports/                    # Reports page components
      spending-history-chart.tsx
      donut-chart.tsx
      report-filters.tsx
      download-report-button.tsx
    budget/                     # Budget page components
      budget-card.tsx
      budget-alert.tsx
    settings/                   # Settings page components
      currency-preferences-form.tsx
      budget-preferences-form.tsx
      update-profile-form.tsx

lib/
  supabase/
    server.ts                   # Supabase client for server components
    client.ts                   # Supabase client for client components
  actions/
    expenses.ts                 # Server actions for expense CRUD
  types/
    database.ts                 # TypeScript types for database entities
```

## Usage

### Add an Expense

1. Click the "Add Expense" button on the Dashboard or navigate to the Expenses page
2. Enter the expense amount, select a category, and add optional notes
3. Click "Save" to record the expense

### View Financial Insights

- **Dashboard**: Get an overview of your spending with KPIs and trend charts
- **Reports**: See detailed financial insights with category breakdowns and budget analysis

### Supported Categories

- Food & Dining
- Transportation
- Entertainment
- Shopping
- Utilities
- Health & Wellness
- Rent/Housing
- Other

## Authentication

This app uses Supabase Auth with Row Level Security (RLS) policies to ensure:

- Users can only access their own expense data
- Expenses are automatically associated with the logged-in user
- All data is encrypted and secure

## Database Schema

### Expenses Table

- `id`: UUID primary key
- `user_id`: References authenticated user
- `amount`: Decimal amount spent
- `category`: Category of expense
- `date`: Date of expense
- `description`: Optional notes
- `created_at`: Timestamp

### Budgets Table

- `id`: UUID primary key
- `user_id`: References authenticated user
- `category`: Budget category
- `limit`: Monthly budget limit
- `created_at`: Timestamp

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL          # Your Supabase project URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY  # Your Supabase public key
```

## Development

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

This project is open source and available under the MIT License.
