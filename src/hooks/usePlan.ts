// Plan limits for free vs premium users
export type PlanType = "free" | "yearly" | "lifetime";

export const FREE_LIMITS = {
  statsMaxDays: 7,
  maxThemes: 8, // first 8 themes only
  revenueHistoryDays: 7,
  maxStartups: 3,
} as const;

export const isPremium = (plan: string | null | undefined): boolean => {
  return plan === "yearly" || plan === "lifetime";
};
