# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server on localhost:3000
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

This is an **ExpenseTracker** application built with Next.js 15 App Router, Supabase authentication, and a custom UI design system.

### Application Pages

- `/` - Redirects to `/protected` (dashboard)
- `/protected` - Dashboard with KPI stats, spending charts, category breakdown, recent transactions
- `/protected/expenses` - Expense entry form with daily summary and calendar
- `/protected/reports` - Financial insights with spending history, donut chart, budget status

### Expense Tracker Components

Located in `components/expense-tracker/`:
- `sidebar.tsx` - Desktop sidebar navigation with user profile
- `mobile-header.tsx` - Mobile responsive header with hamburger menu
- `stats-card.tsx` - Reusable KPI metric cards
- `material-icon.tsx` - Material Symbols icon wrapper
- `spending-chart.tsx` - Bar chart for daily spending trends
- `spending-history-chart.tsx` - Line chart for reports page
- `category-breakdown.tsx` - Progress bars for category distribution
- `donut-chart.tsx` - SVG donut chart with legend
- `transactions-table.tsx` - Transaction list with icons and categories
- `expense-form.tsx` - Expense entry form with amount, category, date
- `daily-summary.tsx` - Blue card showing daily budget progress
- `recent-activity.tsx` - Recent transaction activity list
- `calendar-widget.tsx` - Calendar component for date selection
- `budget-progress.tsx` - Budget status progress bars

### Supabase Client Setup

Two Supabase clients exist for different contexts:
- `lib/supabase/server.ts` - Server-side client using cookies
- `lib/supabase/client.ts` - Browser client for Client Components

### Authentication Flow

- `proxy.ts` - Runs on every request, handles session refresh
- `app/auth/` - Auth pages: login, sign-up, forgot-password, update-password
- `app/protected/` - Protected routes (require authentication)

### Styling

- Tailwind CSS with custom color scheme (primary: #197fe6)
- Material Symbols icons via Google Fonts
- Dark mode support via `next-themes` and CSS variables
- shadcn/ui components available (`npx shadcn@latest add <component>`)

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-project-url>
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<your-supabase-anon-key>
```
