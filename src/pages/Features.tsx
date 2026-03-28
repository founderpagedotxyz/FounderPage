import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  BarChart3,
  CreditCard,
  Search,
  Palette,
  Trophy,
  Mail,
  MessageCircle,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: BarChart3,
    title: "Verified Analytics",
    description:
      "Track visitors, clicks, and traffic sources in real-time. Know exactly where your audience comes from and how they interact with your page.",
  },
  {
    icon: CreditCard,
    title: "Stripe Revenue Integration",
    description:
      "Connect Stripe to verify and display your MRR automatically. Show the world your traction with real, verified numbers.",
  },
  {
    icon: Search,
    title: "SEO Indexing",
    description:
      "Dynamic meta tags, Open Graph, and sitemap generation for maximum visibility. Get discovered by search engines and shared beautifully on social media.",
  },
  {
    icon: Palette,
    title: "Custom Themes",
    description:
      "30+ themes and 8 fonts to personalize your page. Make your founder profile match your brand identity perfectly.",
  },
  {
    icon: Trophy,
    title: "Leaderboard Access",
    description:
      "Compete with other founders ranked by revenue and startups. Climb the leaderboard and gain visibility in the community.",
  },
  {
    icon: Mail,
    title: "Email Collection",
    description:
      "Collect subscriber emails directly from your profile page. Build your audience and keep them updated on your journey.",
  },
  {
    icon: MessageCircle,
    title: "Priority Support",
    description:
      "Get help fast via our dedicated support channel. We respond within 24 hours so you never feel stuck.",
  },
  {
    icon: RefreshCw,
    title: "Lifetime Updates",
    description:
      "All future features included, no extra cost. We ship new features regularly and you get them all automatically.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
} as const;

const Features = () => {
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

      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="mb-6">
            <Sparkles className="w-3 h-3 mr-1" />
            Everything you need
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Features</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to showcase your startups, verify your revenue,
            and grow your founder brand — all in one page.
          </p>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="px-6 pb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {features.map((feature, idx) => (
            <motion.div key={idx} variants={cardVariant}>
              <Card className="h-full border border-border/50 hover:border-accent/50 hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-8 flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-accent/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                      <feature.icon className="w-7 h-7 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center bg-card rounded-3xl p-12 border border-border/50"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to build your page?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join hundreds of founders already showcasing their work on Founder
            Page.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/auth")}
              size="lg"
              className="h-14 px-8 text-lg bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            >
              Get Started Free
            </Button>
            <Button
              onClick={() => navigate("/pricing")}
              variant="outline"
              size="lg"
              className="h-14 px-8 text-lg font-semibold"
            >
              View Pricing
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Features;
