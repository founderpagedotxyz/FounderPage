import { useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Check } from "lucide-react";
import { toast } from "sonner";

interface EmailSubscribeProps {
  profileId: string;
  themeStyles: Record<string, string>;
}

export const EmailSubscribe = ({ profileId, themeStyles }: EmailSubscribeProps) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);

    const { error } = await supabase
      .from("subscribers" as any)
      .insert({ profile_id: profileId, email: email.trim().toLowerCase() });

    if (error) {
      if (error.code === "23505") {
        toast.info(t("subscribe.alreadySubscribed"));
      } else {
        toast.error(t("subscribe.error"));
      }
    } else {
      setSubmitted(true);
      toast.success(t("subscribe.success"));
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm"
        style={{ backgroundColor: `hsl(${themeStyles["--profile-accent"]} / 0.1)`, color: `hsl(${themeStyles["--profile-accent"]})` }}>
        <Check className="w-4 h-4" />
        {t("subscribe.thanks")}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: `hsl(${themeStyles["--profile-foreground"]} / 0.4)` }} />
        <Input
          type="email"
          placeholder={t("subscribe.placeholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="pl-10 h-10 text-sm border"
          style={{
            backgroundColor: `hsl(${themeStyles["--profile-card"]})`,
            borderColor: `hsl(${themeStyles["--profile-muted"]})`,
            color: `hsl(${themeStyles["--profile-foreground"]})`,
          }}
        />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="h-10 px-5 text-sm font-medium shrink-0"
        style={{
          backgroundColor: `hsl(${themeStyles["--profile-accent"]})`,
          color: `hsl(${themeStyles["--profile-background"]})`,
        }}
      >
        {t("subscribe.btn")}
      </Button>
    </form>
  );
};
