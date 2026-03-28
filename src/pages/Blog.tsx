import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, ArrowRight, Clock } from "lucide-react";
import Footer from "@/components/Footer";

const Blog = () => {
  const navigate = useNavigate();

  const posts = [
    {
      title: "Introducing Founder Page",
      date: "March 2026",
      description:
        "The story behind why we built Founder Page and what's next.",
      badge: "Read More",
      badgeVariant: "default" as const,
    },
    {
      title: "How to Build in Public",
      date: "March 2026",
      description:
        "A guide to sharing your startup journey and growing your audience.",
      badge: "Read More",
      badgeVariant: "default" as const,
    },
    {
      title: "Revenue Verification with Stripe",
      date: "Coming Soon",
      description:
        "How connecting Stripe helps you build trust with your audience.",
      badge: "Coming Soon",
      badgeVariant: "secondary" as const,
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
        <section className="max-w-4xl mx-auto px-6 pt-20 pb-12 text-center">
          <Badge variant="secondary" className="mb-4">
            Blog
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Updates, tips, and stories from the Founder Page community
          </p>
        </section>

        {/* Posts Grid */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card
                key={post.title}
                className="group hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {post.date === "Coming Soon" ? (
                        <Clock className="w-3.5 h-3.5" />
                      ) : (
                        <Calendar className="w-3.5 h-3.5" />
                      )}
                      <span>{post.date}</span>
                    </div>
                    <Badge variant={post.badgeVariant} className="text-xs">
                      {post.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-snug">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    {post.description}
                  </CardDescription>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
                    {post.badge === "Coming Soon" ? "Stay tuned" : "Read more"}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
