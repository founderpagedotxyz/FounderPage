import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, MousePointerClick, Users, Globe } from "lucide-react";
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { isPremium } from "@/hooks/usePlan";
import { UpgradePrompt } from "@/components/UpgradePrompt";

interface StatsPanelProps {
  profileId: string;
  plan?: string | null;
}

type TimeRange = "7" | "30" | "90";

interface DailyData {
  date: string;
  views: number;
  unique: number;
  clicks: number;
}

interface SourceData {
  source: string;
  count: number;
}

export const StatsPanel = ({ profileId, plan }: StatsPanelProps) => {
  const { t } = useTranslation();
  const [range, setRange] = useState<TimeRange>("7");
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [sources, setSources] = useState<SourceData[]>([]);
  const [totals, setTotals] = useState({ views: 0, unique: 0, clicks: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, [profileId, range]);

  const loadStats = async () => {
    setLoading(true);
    const days = parseInt(range);
    const since = new Date();
    since.setDate(since.getDate() - days);
    const sinceISO = since.toISOString();

    // Fetch page views
    const { data: views } = await supabase
      .from("page_views" as any)
      .select("created_at, visitor_hash, referrer")
      .eq("profile_id", profileId)
      .gte("created_at", sinceISO)
      .order("created_at", { ascending: true });

    // Fetch link clicks
    const { data: clicks } = await supabase
      .from("link_clicks" as any)
      .select("created_at")
      .eq("profile_id", profileId)
      .gte("created_at", sinceISO);

    const viewsArr = (views as any[]) || [];
    const clicksArr = (clicks as any[]) || [];

    // Build daily data
    const dayMap: Record<string, { views: number; uniqueSet: Set<string>; clicks: number }> = {};
    for (let i = 0; i < days; i++) {
      const d = new Date();
      d.setDate(d.getDate() - (days - 1 - i));
      const key = d.toISOString().slice(0, 10);
      dayMap[key] = { views: 0, uniqueSet: new Set(), clicks: 0 };
    }

    for (const v of viewsArr) {
      const key = v.created_at.slice(0, 10);
      if (dayMap[key]) {
        dayMap[key].views++;
        dayMap[key].uniqueSet.add(v.visitor_hash);
      }
    }

    for (const c of clicksArr) {
      const key = c.created_at.slice(0, 10);
      if (dayMap[key]) {
        dayMap[key].clicks++;
      }
    }

    const daily: DailyData[] = Object.entries(dayMap).map(([date, data]) => ({
      date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      views: data.views,
      unique: data.uniqueSet.size,
      clicks: data.clicks,
    }));

    setDailyData(daily);

    // Totals
    const uniqueAll = new Set(viewsArr.map((v: any) => v.visitor_hash));
    setTotals({
      views: viewsArr.length,
      unique: uniqueAll.size,
      clicks: clicksArr.length,
    });

    // Sources
    const sourceMap: Record<string, number> = {};
    for (const v of viewsArr) {
      let src = "Direct";
      if (v.referrer) {
        try {
          src = new URL(v.referrer).hostname;
        } catch {
          src = v.referrer;
        }
      }
      sourceMap[src] = (sourceMap[src] || 0) + 1;
    }
    const sortedSources = Object.entries(sourceMap)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    setSources(sortedSources);

    setLoading(false);
  };

  const statCards = [
    { label: t("stats.uniqueVisitors"), value: totals.unique, icon: Users, color: "#8b5cf6" },
    { label: t("stats.totalViews"), value: totals.views, icon: Eye, color: "#3b82f6" },
    { label: t("stats.clicks"), value: totals.clicks, icon: MousePointerClick, color: "#f43f5e" },
  ];

  return (
    <div className="space-y-6">
      {/* Time range selector */}
      <div className="flex justify-end">
        <Select value={range} onValueChange={(v) => setRange(v as TimeRange)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">{t("stats.days7")}</SelectItem>
            <SelectItem value="30" disabled={!isPremium(plan)}>{t("stats.days30")}</SelectItem>
            <SelectItem value="90" disabled={!isPremium(plan)}>{t("stats.days90")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <p className="text-3xl font-bold">{loading ? "..." : stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {!isPremium(plan) && (
        <UpgradePrompt feature={t("upgrade.statsLimited")} />
      )}

      {/* Visitors chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("stats.visitorsOverTime")}</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              {t("common.loading")}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={dailyData}>
                <defs>
                  <linearGradient id="statsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="clicksGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#f43f5e" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis fontSize={11} tickLine={false} axisLine={false} width={30} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="unique" stroke="#8b5cf6" fill="url(#statsGradient)" strokeWidth={2} name={t("stats.uniqueVisitors")} />
                <Area type="monotone" dataKey="clicks" stroke="#f43f5e" fill="url(#clicksGradient)" strokeWidth={2} name={t("stats.clicks")} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Sources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Globe className="w-5 h-5" />
            {t("stats.source")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-20 flex items-center justify-center text-muted-foreground">
              {t("common.loading")}
            </div>
          ) : sources.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-4">{t("stats.noData")}</p>
          ) : (
            <div className="space-y-3">
              {sources.map((s) => (
                <div key={s.source} className="flex items-center justify-between">
                  <span className="text-sm truncate max-w-[200px]">{s.source}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full"
                        style={{ width: `${Math.min(100, (s.count / (sources[0]?.count || 1)) * 100)}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8 text-right">{s.count}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
