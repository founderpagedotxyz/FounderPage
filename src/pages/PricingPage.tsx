import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  Check,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

const STRIPE_LINKS = {
  YEARLY: "https://buy.stripe.com/bJeeV67ExdbieRQ0WGafS00",
  LIFETIME: "https://buy.stripe.com/6oUfZa2kdc7e398dJsafS01",
};

const allFeatures = [
  "Verified Analytics",
  "Stripe Revenue Integration",
  "SEO Indexing",
  "Custom Themes",
  "Leaderboard Access",
  "Email Collection",
  "Priority Support",
  "Lifetime Updates",
];

const faqs = [
  {
    question: "What happens after I pay?",
    answer:
      "You get instant access to all premium features. Simply log in or create an account and your plan will be activated automatically. No setup required.",
  },
  {
    question: "Can I upgrade from yearly to lifetime?",
    answer:
      "Yes! You can upgrade at any time. When you purchase the lifetime deal, it replaces your yearly plan and you'll never be charged again.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes, you can create a free account and set up your founder page with basic features. The paid plans unlock premium themes, verified analytics, Stripe integration, and more.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards through Stripe, including Visa, Mastercard, and American Express. All payments are processed securely.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes, we offer a 7-day money-back guarantee. If you're not satisfied, contact us at founderpage.xyz@gmail.com and we'll process your refund.",
  },
];

const handleBuy = (url: string) => {
  window.location.href = url;
};

const PricingPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <div className="cursor-pointer" onClick={() => navigate("/")}>
            <img src="/logo.svg" alt="Founder Page" className="w-56 h-auto" />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="mb-6">
            <Zap className="w-3 h-3 mr-1" />
            Simple pricing
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Simple Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            No hidden fees. No surprises. Pick a plan and start building your
            founder page today.
          </p>
        </motion.div>
      </section>

      {/* Included in both plans */}
      <section className="px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-white rounded-3xl p-8 border border-border/50 shadow-sm"
        >
          <div className="text-center mb-8">
            <span className="bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide">
              Included in both plans
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allFeatures.map((feat, i) => (
              <div
                key={i}
                className="flex items-center gap-3 justify-center md:justify-start"
              >
                <div className="bg-accent p-1 rounded-full">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-muted-foreground">
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Plan Cards */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* 1-Year Pass */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8 }}
            className="bg-card rounded-[2rem] p-10 border border-border shadow-sm flex flex-col items-center text-center transition-all duration-300"
          >
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-foreground">
                1-Year Pass
              </h3>
              <p className="text-muted-foreground">
                Perfect for trying things out
              </p>
            </div>
            <div className="my-6">
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg text-muted-foreground line-through">
                  €35
                </span>
                <span className="text-6xl font-black text-foreground tracking-tight">
                  €25
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">per year</p>
            </div>
            <div className="w-full mb-6 space-y-2 text-left">
              {allFeatures.map((feat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="bg-accent p-0.5 rounded-full">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-muted-foreground">{feat}</span>
                </div>
              ))}
            </div>
            <Button
              onClick={() => handleBuy(STRIPE_LINKS.YEARLY)}
              variant="outline"
              size="lg"
              className="w-full h-16 text-lg font-bold border-2 rounded-xl mt-auto hover:bg-accent hover:text-white hover:border-accent transition-all"
            >
              Get 1-Year Pass
            </Button>
          </motion.div>

          {/* Lifetime Deal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -8 }}
            className="bg-card rounded-[2rem] p-10 border-2 border-accent shadow-2xl shadow-accent/10 flex flex-col items-center text-center relative transition-all duration-300"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-6 py-2 rounded-full font-bold text-sm tracking-wide shadow-lg flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> BEST VALUE
            </div>
            <div className="mb-4 mt-2">
              <h3 className="text-2xl font-bold text-foreground">
                Lifetime Deal
              </h3>
              <p className="text-muted-foreground">
                Pay once, own it forever
              </p>
            </div>
            <div className="my-6">
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg text-muted-foreground line-through">
                  €50
                </span>
                <span className="text-6xl font-black text-accent tracking-tight">
                  €30
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                one-time payment
              </p>
            </div>
            <div className="w-full mb-6 space-y-2 text-left">
              {allFeatures.map((feat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="bg-accent p-0.5 rounded-full">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-muted-foreground">{feat}</span>
                </div>
              ))}
            </div>
            <Button
              onClick={() => handleBuy(STRIPE_LINKS.LIFETIME)}
              size="lg"
              className="w-full h-16 text-lg font-bold rounded-xl mt-auto bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/25 transition-all"
            >
              Get Lifetime Access
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Secure Payment Note */}
      <section className="px-6 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            Secure payment powered by Stripe. Cancel anytime.
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <Card className="border border-border/50">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, idx) => (
                    <AccordionItem key={idx} value={`faq-${idx}`}>
                      <AccordionTrigger className="text-left font-semibold">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
