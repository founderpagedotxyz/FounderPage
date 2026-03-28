import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ExternalLink, FileText } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import { RevenueChart } from "@/components/RevenueChart";
import { RESERVED_USERNAMES } from "@/lib/validation";
import { getThemeStyles, getFontImportUrl, type ThemeKey, type FontKey } from "@/components/ThemeSelector";

// Public profile type (excludes email for privacy)
type PublicProfile = {
  id: string;
  username: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  photo_url: string | null;
  favicon_url: string | null;
  links: any;
  theme: string | null;
  font_family: string | null;
  created_at: string | null;
  updated_at: string | null;
};
type Startup = Database["public"]["Tables"]["startups"]["Row"];

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [startups, setStartups] = useState<Startup[]>([]);
  const [revenueData, setRevenueData] = useState<Record<string, any[]>>({});

  useEffect(() => {
    loadProfile();
  }, [username]);

  const loadProfile = async () => {
    if (!username) return;

    // Normalize username (remove @ if present)
    const cleanUsername = username.startsWith("@") ? username.slice(1) : username.toLowerCase();

    // Check if it's a reserved route/username
    if (RESERVED_USERNAMES.includes(cleanUsername)) {
      setLoading(false);
      return;
    }

    // Use secure RPC function that excludes email from public access
    const { data: profileData } = await supabase
      .rpc("get_public_profile", { profile_username: cleanUsername })
      .maybeSingle();

    if (profileData) {
      setProfile(profileData);

      const { data: startupsData } = await supabase
        .from("startups")
        .select("*")
        .eq("user_id", profileData.id)
        .order("created_at", { ascending: false });

      if (startupsData) {
        setStartups(startupsData);
        
        // Load revenue history for each startup
        const revenueDataMap: Record<string, any[]> = {};
        for (const startup of startupsData) {
          const { data: revenueHistory } = await supabase
            .from("revenue_history")
            .select("*")
            .eq("startup_id", startup.id)
            .order("month", { ascending: true });

          if (revenueHistory && revenueHistory.length > 0) {
            revenueDataMap[startup.id] = revenueHistory.map(item => ({
              month: new Date(item.month).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
              revenue: item.revenue
            }));
          }
        }
        setRevenueData(revenueDataMap);
      }
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p>Loading...</p>
      </div>
    );
  }

  const profileTheme = (profile?.theme || "default") as ThemeKey;
  const profileFont = (profile?.font_family || "dm-sans") as FontKey;
  const themeStyles = getThemeStyles(profileTheme, profileFont);
  const fontImportUrl = getFontImportUrl(profileFont);

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">{t("profile.notFound")}</p>
        <Button onClick={() => navigate("/")}>{t("profile.goHome")}</Button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        ...themeStyles,
        backgroundColor: `hsl(${themeStyles["--profile-background"]})`,
        color: `hsl(${themeStyles["--profile-foreground"]})`,
      }}
    >
      <Helmet>
        <link rel="stylesheet" href={fontImportUrl} />
        <title>{profile.name || profile.username || "User"} - {t("common.founderPage")}</title>
        <meta
          name="description"
          content={profile?.bio || t("profile.metaDesc", { name: profile?.name || profile?.username })}
        />
        <meta property="og:title" content={`${profile?.name || profile?.username} - ${t("common.founderPage")}`} />
        <meta
          property="og:description"
          content={profile?.bio || t("profile.metaDesc", { name: profile?.name || profile?.username })}
        />
        {profile?.photo_url && <meta property="og:image" content={profile.photo_url} />}
        <meta property="og:url" content={`https://founderpage.xyz/${profile?.username}`} />
        <meta property="og:type" content="profile" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${profile?.name || profile?.username} - ${t("common.founderPage")}`} />
        <meta
          name="twitter:description"
          content={profile?.bio || t("profile.metaDesc", { name: profile?.name || profile?.username })}
        />
        {profile?.photo_url && <meta name="twitter:image" content={profile.photo_url} />}
        <link rel="canonical" href={`https://founderpage.xyz/${profile?.username}`} />
        {profile.favicon_url && <link rel="icon" href={profile.favicon_url} />}
      </Helmet>
      <header style={{ borderBottom: `1px solid hsl(${themeStyles["--profile-muted"]})` }}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <span className="font-bold text-lg">{t("common.founderPage")}</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="flex-shrink-0">
            <div
              className="w-32 h-32 rounded-full overflow-hidden"
              style={{ backgroundColor: `hsl(${themeStyles["--profile-accent"]} / 0.2)` }}
            >
              {profile.photo_url ? (
                <img src={profile.photo_url} alt={profile.name || ""} className="w-full h-full object-cover" />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-4xl font-bold"
                  style={{ color: `hsl(${themeStyles["--profile-accent"]})` }}
                >
                  {(profile.name || profile.username)?.[0]?.toUpperCase()}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{profile.name || profile.username}</h1>
            {profile.location && (
              <p className="flex items-center gap-2 mb-4" style={{ color: `hsl(${themeStyles["--profile-foreground"]} / 0.6)` }}>
                <MapPin className="w-4 h-4" />
                {profile.location}
              </p>
            )}
            {profile.bio && (
              <p className="text-lg mb-6">{profile.bio}</p>
            )}
          </div>
        </div>

        {/* Startups Grid */}
        <div className="grid grid-cols-1 gap-6">
          {startups.map((startup) => (
            <Card
              key={startup.id}
              className="overflow-hidden hover:shadow-lg transition-shadow rounded-2xl"
              style={{
                backgroundColor: `hsl(${themeStyles["--profile-card"]})`,
                borderColor: `hsl(${themeStyles["--profile-muted"]})`,
              }}
            >
              <CardContent className="p-6">
                {/* Header with logo, name, description, and MRR badge */}
                <div className="flex items-start gap-4 mb-4">
                  {startup.logo_url ? (
                    <img
                      src={startup.logo_url}
                      alt={`${startup.name} logo`}
                      className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                      style={{ borderColor: `hsl(${themeStyles["--profile-muted"]})`, borderWidth: 1 }}
                    />
                  ) : (
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `hsl(${themeStyles["--profile-accent"]} / 0.1)` }}
                    >
                      <span className="text-xl font-bold" style={{ color: `hsl(${themeStyles["--profile-accent"]})` }}>{startup.name?.[0]?.toUpperCase()}</span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-lg font-bold truncate">{startup.name}</h3>
                      {startup.show_income && startup.monthly_income !== null && startup.monthly_income > 0 && (
                        <div
                          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap"
                          style={{ backgroundColor: `hsl(${themeStyles["--profile-accent"]} / 0.1)` }}
                        >
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: `hsl(${themeStyles["--profile-accent"]})` }} />
                          ${startup.monthly_income >= 1000 
                            ? `${(startup.monthly_income / 1000).toFixed(0)}k` 
                            : startup.monthly_income}/mo
                          {startup.income_verified && (
                            <span className="text-xs ml-1" style={{ color: `hsl(${themeStyles["--profile-accent"]})` }}>✓</span>
                          )}
                        </div>
                      )}
                    </div>
                    <p className="text-sm mt-1 line-clamp-2" style={{ color: `hsl(${themeStyles["--profile-foreground"]} / 0.6)` }}>
                      {startup.description}
                    </p>
                  </div>
                </div>

                {/* Revenue Chart - IndiePage Style */}
                {startup.show_income && revenueData[startup.id] && revenueData[startup.id].length > 0 && (
                  <div className="mt-4 pt-4" style={{ borderTop: `1px solid hsl(${themeStyles["--profile-muted"]})` }}>
                    <RevenueChart data={revenueData[startup.id]} />
                  </div>
                )}

                {/* Website Link */}
                {startup.url && (
                  <div className="mt-4 pt-4" style={{ borderTop: `1px solid hsl(${themeStyles["--profile-muted"]})` }}>
                    <a
                      href={startup.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm transition-colors"
                      style={{ color: `hsl(${themeStyles["--profile-foreground"]} / 0.6)` }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      {startup.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {startups.length === 0 && (
          <div className="text-center py-12">
            <p style={{ color: `hsl(${themeStyles["--profile-foreground"]} / 0.6)` }}>
              {t("profile.noStartups")}
            </p>
          </div>
        )}

        {/* Build Your Page CTA */}
        <div className="mt-16 text-center">
          <Button
            size="lg"
            style={{
              backgroundColor: `hsl(${themeStyles["--profile-accent"]})`,
              color: `hsl(${themeStyles["--profile-background"]})`,
            }}
            onClick={() => navigate("/auth")}
          >
            {t("profile.buildPage")}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Profile;
