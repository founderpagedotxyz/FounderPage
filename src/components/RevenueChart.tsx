import { useTranslation } from "react-i18next";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface RevenueDataPoint {
  month: string;
  revenue: number;
}

interface RevenueChartProps {
  data: RevenueDataPoint[];
  compact?: boolean;
}

const chartConfig = {
  revenue: {
    label: "revenue.label",
    color: "hsl(39, 100%, 50%)", // Warm orange/yellow
  },
};

const formatYAxis = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(0)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
  return `$${value}`;
};

export const RevenueChart = ({ data, compact = false }: RevenueChartProps) => {
  const { t } = useTranslation();
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
        {t("revenue.noData")}
      </div>
    );
  }

  if (compact) {
    return (
      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id="revenueGradientCompact" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(39, 100%, 60%)" stopOpacity={0.6} />
                <stop offset="100%" stopColor="hsl(39, 100%, 70%)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(39, 100%, 50%)"
              fill="url(#revenueGradientCompact)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ChartContainer config={chartConfig} className="h-[180px] w-full">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(39, 100%, 60%)" stopOpacity={0.5} />
              <stop offset="100%" stopColor="hsl(39, 100%, 70%)" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="month" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatYAxis}
            width={45}
          />
          <ChartTooltip 
            content={
              <ChartTooltipContent 
                formatter={(value) => [`$${Number(value).toLocaleString()}`, t("revenue.label")]}
              />
            } 
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="hsl(39, 100%, 50%)"
            fill="url(#revenueGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};
