import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Users,
  Rocket,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface FounderProfile {
  username: string;
  name: string | null;
  bio: string | null;
  photo_url: string | null;
  startups_count: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
} as const;

const Examples = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [founders, setFounders] = useState<FounderProfile[]>([]);

  useEffect(() => {
    loadFounders();
  }, []);

  const loadFounders = async () => {
    try {
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select(`
          username,
          name,
          bio,
          photo_url,
          startups (
            id
          )
        `)
        .not("username", "is", null)
        .not("photo_url", "is", null);

      if (error) throw error;

      const filtered = (profiles || [])
        .map((profile: any) => ({
          username: profile.username,
          name: profile.name,
          bio: profile.bio,
          photo_url: profile.photo_url,
          startups_count: profile.startups?.length || 0,
        }))
        .filter((p) => p.startups_count > 0)
        .sort((a, b) => b.startups_count - a.startups_count);

      setFounders(filtered);
    } catch (error) {
      console.error("Error loading founders:", error);
    } finally {
      setLoading(false);
    }
  };

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
            <Users className="w-3 h-3 mr-1" />
            Real founders
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Examples
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how founders are using Founder Page to showcase their startups
            and grow their brand.
          </p>
        </motion.div>
      </section>

      {/* Founders Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center gap-4">
                      <Skeleton className="w-20 h-20 rounded-full" />
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : founders.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No founder pages to show yet. Be the first!
              </p>
              <Button
                onClick={() => navigate("/auth")}
                size="lg"
                className="mt-6 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              >
                Create Your Page
              </Button>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {founders.map((founder) => (
                <motion.div key={founder.username} variants={cardVariant}>
                  <Link to={`/${founder.username}`}>
                    <Card className="overflow-hidden border border-border/50 hover:border-accent/50 hover:shadow-lg transition-all duration-300 group cursor-pointer h-full">
                      <CardContent className="p-8 flex flex-col items-center text-center">
                        <Avatar className="w-20 h-20 mb-4 ring-2 ring-border group-hover:ring-accent/50 transition-all">
                          <AvatarImage src={founder.photo_url || ""} />
                          <AvatarFallback className="text-xl font-bold">
                            {(founder.name || founder.username)?.[0]?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="text-lg font-bold mb-1 group-hover:text-accent transition-colors">
                          {founder.name || founder.username}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          @{founder.username}
                        </p>
                        {founder.bio && (
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                            {founder.bio}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-auto">
                          <Badge
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            <Rocket className="w-3 h-3" />
                            {founder.startups_count}{" "}
                            {founder.startups_count === 1
                              ? "startup"
                              : "startups"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 mt-4 text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>View page</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
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
          <h2 className="text-3xl font-bold mb-4">
            Want to be featured here?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Create your founder page, add your startups, and join the community.
          </p>
          <Button
            onClick={() => navigate("/auth")}
            size="lg"
            className="h-14 px-8 text-lg bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
          >
            Create Your Page
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default Examples;
