import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const screenshots = [
  {
    title: "Dashboard Overview",
    description: "Monitor your spending at a glance with KPI cards and charts",
    image: "/images/screenshots/dashboard.png",
  },
  {
    title: "Budget Management",
    description: "Set and track budgets for each spending category",
    image: "/images/screenshots/budget.png",
  },
  {
    title: "Expense Tracking",
    description: "Quickly add expenses with smart category detection",
    image: "/images/screenshots/expenses.png",
  },
  {
    title: "Insightful Reports",
    description: "Visualize your spending patterns with beautiful charts",
    image: "/images/screenshots/reports.png",
  },
];

export function ScreenshotsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            See ExpenseTracker in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete expense tracking solution with everything you need to manage your finances effectively.
          </p>
        </div>

        {/* Screenshots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {screenshots.map((screenshot) => (
            <div key={screenshot.title} className="flex flex-col gap-4">
              {/* Screenshot Card */}
              <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2">
                <CardContent className="p-2">
                  <div className="relative h-80 md:h-96 bg-muted rounded-lg overflow-hidden">
                    <Image
                      src={screenshot.image}
                      alt={screenshot.title}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Title and Description */}
              <div className="text-center space-y-2">
                <h3 className="text-xl md:text-2xl font-bold">{screenshot.title}</h3>
                <p className="text-muted-foreground text-sm md:text-base">{screenshot.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
