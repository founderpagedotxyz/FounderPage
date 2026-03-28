import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Rocket, KeyRound, BarChart3, Plug } from "lucide-react";
import Footer from "@/components/Footer";

const Changelog = () => {
  const navigate = useNavigate();

  const entries = [
    {
      date: "March 2026",
      title: "Launch",
      icon: Rocket,
      description:
        "Founder Page launches with profile pages, startup showcase, Stripe integration, 30+ themes, analytics dashboard, and multi-language support (EN/ES/PT).",
      isComing: false,
    },
    {
      date: "March 2026",
      title: "Google OAuth",
      icon: KeyRound,
      description:
        "Added Sign in with Google for faster onboarding.",
      isComing: false,
    },
    {
      date: "March 2026",
      title: "Analytics & Stats",
      icon: BarChart3,
      description:
        "Real-time visitor tracking, click analytics, and traffic source monitoring.",
      isComing: false,
    },
    {
      date: "Coming Soon",
      title: "More Integrations",
      icon: Plug,
      description:
        "We're working on more payment providers and social integrations.",
      isComing: true,
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
            <img src="/logo.svg" alt="Founder Page" className="w-56 h-auto" />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Title */}
        <section className="max-w-3xl mx-auto px-6 pt-20 pb-12 text-center">
          <Badge variant="secondary" className="mb-4">
            Changelog
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Changelog
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Follow our journey as we build Founder Page
          </p>
        </section>

        {/* Timeline */}
        <section className="max-w-3xl mx-auto px-6 pb-20">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border" />

            <div className="space-y-10">
              {entries.map((entry, index) => (
                <div key={index} className="relative flex gap-6">
                  {/* Dot and icon */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        entry.isComing
                          ? "bg-muted border-2 border-dashed border-border"
                          : "bg-accent/10 border-2 border-accent/20"
                      }`}
                    >
                      <entry.icon
                        className={`w-4 h-4 ${
                          entry.isComing ? "text-muted-foreground" : "text-accent"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2 pt-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <Badge
                        variant={entry.isComing ? "outline" : "secondary"}
                        className="text-xs"
                      >
                        {entry.date}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{entry.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {entry.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Changelog;
