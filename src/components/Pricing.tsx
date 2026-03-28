import { Check, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

const plans = [
  {
    name: "Free",
    price: "0€",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "Public profile page",
      "Up to 3 startups",
      "Basic analytics",
      "Standard themes",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Lifetime Deal",
    price: "35€",
    period: "one-time",
    description: "Best value for serious makers",
    features: [
      "Unlimited startups",
      "All 5 premium themes",
      "All 9 custom fonts",
      "Leaderboard access",
      "Priority support",
      "Custom domain (soon)",
      "Revenue verification badge",
      "Advanced analytics",
    ],
    cta: "Get Lifetime Access",
    popular: true,
  },
  {
    name: "Annual",
    price: "20€",
    period: "per year",
    description: "Flexible annual option",
    features: [
      "Unlimited startups",
      "All 5 premium themes",
      "All 9 custom fonts",
      "Leaderboard access",
      "Revenue verification badge",
      "Standard analytics",
    ],
    cta: "Start Annual Plan",
    popular: false,
  },
];

export const Pricing = () => {
  const { t } = useTranslation();
  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Zap className="w-3 h-3 mr-1" />
            {t("pricing.badge")}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("pricing.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("pricing.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${
                plan.popular
                  ? "border-primary shadow-lg scale-105"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">
                    {plan.period}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          {t("pricing.securePayment")}
        </p>
      </div>
    </section>
  );
};
