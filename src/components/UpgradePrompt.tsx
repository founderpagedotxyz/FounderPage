import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Lock } from "lucide-react";

interface UpgradePromptProps {
  feature: string;
  compact?: boolean;
}

export const UpgradePrompt = ({ feature, compact = false }: UpgradePromptProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
        <Lock className="w-3 h-3" />
        <span>{feature}</span>
        <button
          onClick={() => navigate("/pricing")}
          className="text-accent font-semibold hover:underline"
        >
          {t("upgrade.unlock")}
        </button>
      </div>
    );
  }

  return (
    <div className="border border-accent/20 bg-accent/5 rounded-xl p-4 flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
        <Sparkles className="w-5 h-5 text-accent" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{feature}</p>
        <p className="text-xs text-muted-foreground">{t("upgrade.description")}</p>
      </div>
      <Button
        size="sm"
        className="bg-accent hover:bg-accent/90 text-white shrink-0"
        onClick={() => navigate("/pricing")}
      >
        {t("upgrade.btn")}
      </Button>
    </div>
  );
};
