import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: "savings",
    title: "Smart Budgeting",
    description: "Set monthly and category-specific budgets to stay on track with your financial goals.",
    color: "text-blue-500",
  },
  {
    icon: "timeline",
    title: "Real-time Tracking",
    description: "Monitor your spending with live dashboards and instant alerts when you approach budget limits.",
    color: "text-green-500",
  },
  {
    icon: "category",
    title: "Category Management",
    description: "8 preset categories for organized expense tracking including food, transport, and more.",
    color: "text-purple-500",
  },
  {
    icon: "pie_chart",
    title: "Insightful Reports",
    description: "Visualize spending patterns with beautiful charts and detailed financial analytics.",
    color: "text-orange-500",
  },
  {
    icon: "lock",
    title: "Secure & Private",
    description: "Your financial data protected with enterprise-grade security powered by Supabase.",
    color: "text-red-500",
  },
  {
    icon: "devices",
    title: "Mobile Responsive",
    description: "Access your finances anywhere, on any device with a beautiful responsive design.",
    color: "text-cyan-500",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Everything You Need to Manage Your Money
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to help you take control of your finances and build better spending habits.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 relative overflow-hidden"
            >
              {/* Decorative gradient background */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color === 'text-blue-500' ? 'from-blue-500 to-cyan-500' :
                feature.color === 'text-green-500' ? 'from-green-500 to-emerald-500' :
                feature.color === 'text-purple-500' ? 'from-purple-500 to-pink-500' :
                feature.color === 'text-orange-500' ? 'from-orange-500 to-red-500' :
                feature.color === 'text-red-500' ? 'from-red-500 to-pink-500' :
                'from-cyan-500 to-blue-500'}`} />

              <CardHeader className="space-y-4">
                {/* Icon with background */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                  feature.color === 'text-blue-500' ? 'bg-blue-500/10' :
                  feature.color === 'text-green-500' ? 'bg-green-500/10' :
                  feature.color === 'text-purple-500' ? 'bg-purple-500/10' :
                  feature.color === 'text-orange-500' ? 'bg-orange-500/10' :
                  feature.color === 'text-red-500' ? 'bg-red-500/10' :
                  'bg-cyan-500/10'
                } transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <span className={`material-symbols-outlined text-5xl ${feature.color}`}>
                    {feature.icon}
                  </span>
                </div>
                <CardTitle className="text-2xl font-bold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-base">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
