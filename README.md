# Expense Tracker

A modern expense tracking application built with Next.js and Supabase. Track your daily spending, categorize expenses, visualize spending trends, and manage your budget all in one place.

## Features

- **User Authentication**: Secure authentication with Supabase Auth using email and password
- **Protected Routes**: All pages require login to access
- **Expense Management**:
  - Add expenses with categories, amounts, dates, and descriptions
  - View all expenses with sorting and filtering
  - Automatic categorization of spending
- **Financial Insights**:
  - Dashboard with KPI metrics (Total Spent, Budget Remaining, Daily Average, Top Category)
  - Daily spending trend charts
  - Category breakdown visualization
  - Monthly budget tracking and spending analysis
- **Modern UI**:
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
   cd with-supabase-app
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
  protected/                    # Protected routes (require authentication)
    layout.tsx                  # Shared layout with sidebar
    page.tsx                    # Dashboard page
    expenses/
      page.tsx                  # Expense entry page
    reports/
      page.tsx                  # Financial insights & reports page

components/
  expense-tracker/              # Reusable expense tracker components
    sidebar.tsx                 # Sidebar navigation
    spending-chart.tsx          # Bar chart for daily spending
    spending-history-chart.tsx  # Line chart for spending trends
    donut-chart.tsx             # Category breakdown donut chart
    stats-card.tsx              # KPI metric cards
    expense-form.tsx            # Add expense form
    transactions-table.tsx      # Transactions list
    budget-progress.tsx         # Budget status bars

lib/
  supabase/
    server.ts                   # Supabase client for server components
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
