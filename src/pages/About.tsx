import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Eye, Sparkles, Globe, Heart } from "lucide-react";
import Footer from "@/components/Footer";

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Eye,
      title: "Transparency",
      description:
        "We believe in building in public. Every feature, every metric, every milestone is shared openly with our community.",
    },
    {
      icon: Sparkles,
      title: "Simplicity",
      description:
        "No bloated dashboards or confusing workflows. Founder Page is easy to use so you can focus on what matters — building.",
    },
    {
      icon: Globe,
      title: "Community",
      description:
        "Connecting founders worldwide. Whether you're a solo maker or a small team, you belong here.",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
            <img src="/logo.svg" alt="Founder Page" className="w-40 h-auto" />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 pt-20 pb-12 text-center">
          <Badge variant="secondary" className="mb-4">
            About Us
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            About Founder Page
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Founder Page is the portfolio platform for indie makers and
            entrepreneurs. We believe every founder deserves a beautiful page to
            showcase their startups, verify their revenue, and build in public.
          </p>
        </section>

        {/* Built by section */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <Card>
            <CardContent className="pt-8 pb-8 px-8">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Heart className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">Built by a founder, for founders</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Built by Enmanuel, a solo founder based in Portugal. Founder
                    Page was created to give indie makers a simple, beautiful way
                    to showcase their work and connect with other entrepreneurs.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Values */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-center mb-10">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardContent className="pt-8 pb-8 px-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
                    <value.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to join?</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Create your founder page today and start showcasing your startups to
            the world.
          </p>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 h-12"
            onClick={() => navigate("/auth")}
          >
            Get Started
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
