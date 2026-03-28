import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signIn, signUp, signInWithGoogle, getCurrentUser, resetPassword } from "@/lib/supabase";
import { toast } from "sonner";
import { FileText } from "lucide-react";
import { z } from "zod";

const Auth = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Strong password validation schema
  const passwordSchema = z.string()
    .min(8, t("auth.passwordMin"))
    .regex(/[A-Z]/, t("auth.passwordUpper"))
    .regex(/[a-z]/, t("auth.passwordLower"))
    .regex(/[0-9]/, t("auth.passwordNumber"));
  const [loading, setLoading] = useState(false);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpName, setSignUpName] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  useEffect(() => {
    // Check if user is already logged in
    getCurrentUser().then((user) => {
      if (user) {
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!signInEmail || !signInPassword) {
      toast.error(t("auth.fillFields"));
      setLoading(false);
      return;
    }

    const { error } = await signIn(signInEmail, signInPassword);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t("auth.welcomeBack"));
      navigate("/dashboard");
    }
    
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!signUpEmail || !signUpPassword) {
      toast.error(t("auth.fillFields"));
      setLoading(false);
      return;
    }

    // Validate password strength
    const passwordValidation = passwordSchema.safeParse(signUpPassword);
    if (!passwordValidation.success) {
      toast.error(passwordValidation.error.errors[0].message);
      setLoading(false);
      return;
    }

    const { error } = await signUp(signUpEmail, signUpPassword, signUpName);
    
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t("auth.accountCreated"));
      navigate("/dashboard");
    }
    
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    const { error } = await signInWithGoogle();
    if (error) {
      toast.error(error.message);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!forgotEmail) {
      toast.error(t("auth.enterEmail"));
      setLoading(false);
      return;
    }

    const { error } = await resetPassword(forgotEmail);
    
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t("auth.resetSent"));
      setShowForgotPassword(false);
      setForgotEmail("");
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-background">
      <div className="mb-8 flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
        <img src="/logo.svg" className="w-56 h-auto"/>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t("auth.welcome")}</CardTitle>
          <CardDescription>
            {t("auth.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">{t("common.signIn")}</TabsTrigger>
              <TabsTrigger value="signup">{t("common.signUp")}</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <Button
                type="button"
                variant="outline"
                className="w-full mb-4 flex items-center gap-3 h-11"
                onClick={handleGoogleSignIn}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                {t("auth.continueGoogle")}
              </Button>
              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">{t("auth.orEmail")}</span></div>
              </div>
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">{t("auth.email")}</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder={t("auth.emailPlaceholder")}
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">{t("auth.password")}</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder={t("auth.passwordPlaceholder")}
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90"
                  disabled={loading}
                >
                  {loading ? t("auth.signingIn") : t("common.signIn")}
                </Button>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("auth.forgotPassword")}
                </button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <Button
                type="button"
                variant="outline"
                className="w-full mb-4 flex items-center gap-3 h-11"
                onClick={handleGoogleSignIn}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                {t("auth.continueGoogle")}
              </Button>
              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">{t("auth.orEmail")}</span></div>
              </div>
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">{t("auth.nameOptional")}</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder={t("auth.namePlaceholder")}
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">{t("auth.email")}</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder={t("auth.emailPlaceholder")}
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">{t("auth.password")}</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder={t("auth.passwordPlaceholder")}
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90"
                  disabled={loading}
                >
                  {loading ? t("auth.creatingAccount") : t("common.signUp")}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>{t("auth.resetTitle")}</CardTitle>
              <CardDescription>
                {t("auth.resetDesc")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forgot-email">{t("auth.email")}</Label>
                  <Input
                    id="forgot-email"
                    type="email"
                    placeholder={t("auth.emailPlaceholder")}
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowForgotPassword(false);
                      setForgotEmail("");
                    }}
                  >
                    {t("common.cancel")}
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-accent hover:bg-accent/90"
                    disabled={loading}
                  >
                    {loading ? t("auth.sending") : t("auth.sendReset")}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Auth;
