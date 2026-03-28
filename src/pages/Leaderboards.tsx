import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trophy, Eye, MousePointer, Rocket, Medal, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface LeaderboardEntry {
  rank: number;
  username: string;
  name: string | null;
  photo_url: string | null;
  startups_count: number;
  total_revenue: number;
}

export default function Leaderboards() {
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      // Get profiles with their startup counts and total revenue
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select(`
          username,
          name,
          photo_url,
          startups (
            id,
            monthly_income
          )
        `)
        .not("username", "is", null);

      if (error) throw error;

      // Calculate rankings based on startups count and revenue
      const ranked = (profiles || [])
        .map((profile: any) => ({
          username: profile.username,
          name: profile.name,
          photo_url: profile.photo_url,
          startups_count: profile.startups?.length || 0,
          total_revenue: profile.startups?.reduce(
            (sum: number, s: any) => sum + (s.monthly_income || 0),
            0
          ) || 0,
        }))
        .filter((p) => p.startups_count > 0)
        .sort((a, b) => {
          // Sort by revenue first, then by startups count
          if (b.total_revenue !== a.total_revenue) {
            return b.total_revenue - a.total_revenue;
          }
          return b.startups_count - a.startups_count;
        })
        .map((entry, index) => ({
          ...entry,
          rank: index + 1,
        }));

      setLeaderboard(ranked);
    } catch (error) {
      console.error("Error loading leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Medal className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="text-muted-foreground font-medium">#{rank}</span>;
  };

  const formatRevenue = (amount: number) => {
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}k`;
    }
    return `$${amount}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Leaderboards | Founder Page"
        description="See the top makers and entrepreneurs ranked by revenue and startups. Compete for the top spots!"
        url="/leaderboards"
      />

      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link to="/" className="text-xl font-bold">
            Founder Page
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
          <Trophy className="w-4 h-4" />
          <span className="text-sm font-medium">Leaderboards</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Compete for the Top
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          See who's building the most successful startups. Rankings based on verified revenue and startup count.
        </p>
      </section>

      {/* Leaderboard */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="revenue" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="revenue" className="flex items-center gap-2">
                <Rocket className="w-4 h-4" />
                By Revenue
              </TabsTrigger>
              <TabsTrigger value="startups" className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                By Startups
              </TabsTrigger>
            </TabsList>

            <TabsContent value="revenue">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-primary" />
                    Top Earners
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center gap-4">
                          <Skeleton className="w-8 h-8 rounded-full" />
                          <Skeleton className="h-12 flex-1" />
                        </div>
                      ))}
                    </div>
                  ) : leaderboard.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No makers on the leaderboard yet. Be the first!
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {leaderboard.map((entry) => (
                        <Link
                          key={entry.username}
                          to={`/${entry.username}`}
                          className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="w-8 text-center">
                            {getRankBadge(entry.rank)}
                          </div>
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={entry.photo_url || ""} />
                            <AvatarFallback>
                              {entry.name?.[0] || entry.username[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">
                              {entry.name || entry.username}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              @{entry.username}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">
                              {formatRevenue(entry.total_revenue)}/mo
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {entry.startups_count} startup{entry.startups_count !== 1 ? "s" : ""}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="startups">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    Most Startups
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center gap-4">
                          <Skeleton className="w-8 h-8 rounded-full" />
                          <Skeleton className="h-12 flex-1" />
                        </div>
                      ))}
                    </div>
                  ) : leaderboard.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No makers on the leaderboard yet. Be the first!
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {[...leaderboard]
                        .sort((a, b) => b.startups_count - a.startups_count)
                        .map((entry, index) => (
                          <Link
                            key={entry.username}
                            to={`/${entry.username}`}
                            className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="w-8 text-center">
                              {getRankBadge(index + 1)}
                            </div>
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={entry.photo_url || ""} />
                              <AvatarFallback>
                                {entry.name?.[0] || entry.username[0].toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold truncate">
                                {entry.name || entry.username}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                @{entry.username}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">
                                {entry.startups_count} startup{entry.startups_count !== 1 ? "s" : ""}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {formatRevenue(entry.total_revenue)}/mo
                              </p>
                            </div>
                          </Link>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
