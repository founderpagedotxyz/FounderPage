import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Link2, CheckCircle, RefreshCw } from "lucide-react";

interface StripeConnectProps {
  startupId: string;
  isConnected: boolean;
  onConnected?: () => void;
}

export const StripeConnect = ({ startupId, isConnected, onConnected }: StripeConnectProps) => {
  const { t } = useTranslation();
  const [connecting, setConnecting] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const handleConnect = async () => {
    setConnecting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error(t("stripe.loginRequired"));
        return;
      }

      const { data, error } = await supabase.functions.invoke("stripe-connect", {
        body: { startupId },
      });

      if (error) throw error;

      if (data?.url) {
        // Open Stripe Connect onboarding in new tab
        window.open(data.url, "_blank");
        toast.success(t("stripe.onboarding"));
      }
    } catch (error: any) {
      console.error("Error connecting Stripe:", error);
      toast.error(error.message || t("stripe.connectFailed"));
    } finally {
      setConnecting(false);
    }
  };

  const handleSyncRevenue = async () => {
    setSyncing(true);
    try {
      const { data, error } = await supabase.functions.invoke("sync-revenue", {
        body: { startupId },
      });

      if (error) throw error;

      toast.success(t("stripe.synced", { amount: data.currentMRR }));
      onConnected?.();
    } catch (error: any) {
      console.error("Error syncing revenue:", error);
      toast.error(error.message || t("stripe.syncFailed"));
    } finally {
      setSyncing(false);
    }
  };

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-accent flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          {t("stripe.connected")}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSyncRevenue}
          disabled={syncing}
          className="h-7 px-2 text-xs"
        >
          {syncing ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <RefreshCw className="w-3 h-3" />
          )}
          <span className="ml-1">{t("stripe.sync")}</span>
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleConnect}
      disabled={connecting}
      className="text-xs"
    >
      {connecting ? (
        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
      ) : (
        <Link2 className="w-3 h-3 mr-1" />
      )}
      {t("stripe.connect")}
    </Button>
  );
};
