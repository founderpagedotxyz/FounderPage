import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { updatePassword } from "@/lib/supabase"; // Importado de tu archivo supabase.ts
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FileText, Loader2 } from "lucide-react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidSession, setIsValidSession] = useState(false);

  useEffect(() => {
    // Escuchamos el evento de autenticación para detectar el link de recuperación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth Event:", event);
      
      // Si el evento es PASSWORD_RECOVERY, el token es válido
      if (event === "PASSWORD_RECOVERY") {
        setIsValidSession(true);
        setVerifying(false);
      } 
      // Si ya hay sesión activa al cargar (el link ya procesó el login), también es válido
      else if (session) {
        setIsValidSession(true);
        setVerifying(false);
      } 
      else {
        // Damos un margen de 2 segundos para que Supabase procese el fragmento de la URL
        const timeout = setTimeout(() => {
          if (!isValidSession) {
            toast.error(t("resetPassword.linkExpired"));
            navigate("/auth");
          }
        }, 2000);
        return () => clearTimeout(timeout);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, isValidSession]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!password || !confirmPassword) {
      toast.error(t("resetPassword.fillFields"));
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      toast.error(t("resetPassword.minChars"));
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error(t("resetPassword.noMatch"));
      setLoading(false);
      return;
    }

    // Usamos tu función de lib/supabase.ts
    const { error } = await updatePassword(password);
    
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t("resetPassword.success"));
      // Pequeño delay para que el usuario vea el mensaje antes de redirigir
      setTimeout(() => navigate("/dashboard"), 1500);
    }
    
    setLoading(false);
  };

  // Estado de carga inicial mientras se verifica el link
  if (verifying) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-accent mb-4" />
        <p className="text-muted-foreground">{t("resetPassword.verifying")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-background">
      <div className="mb-8 flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
        <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
          <FileText className="w-6 h-6 text-accent-foreground" />
        </div>
        <span className="font-bold text-xl">{t("common.founderPage")}</span>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t("resetPassword.newPassword")}</CardTitle>
          <CardDescription>
            {t("resetPassword.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">{t("resetPassword.newPassword")}</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">{t("resetPassword.confirmPassword")}</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90"
              disabled={loading}
            >
              {loading ? t("resetPassword.updating") : t("resetPassword.updateBtn")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;