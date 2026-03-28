import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "@/components/LanguageSelector";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [user, setUser] = useState<any>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        loadUserAvatar(session.user);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        loadUserAvatar(session.user);
      } else {
        setUser(null);
        setAvatarUrl(null);
        setUserName(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserAvatar = async (authUser: any) => {
    // 1. Try profile photo from database
    const { data: profile } = await supabase
      .from("profiles")
      .select("photo_url, name, username")
      .eq("id", authUser.id)
      .maybeSingle();

    if (profile?.photo_url) {
      setAvatarUrl(profile.photo_url);
      setUserName(profile.name || profile.username);
      return;
    }

    // 2. Try Google avatar from user metadata
    const googleAvatar = authUser.user_metadata?.avatar_url || authUser.user_metadata?.picture;
    if (googleAvatar) {
      setAvatarUrl(googleAvatar);
      setUserName(authUser.user_metadata?.full_name || authUser.user_metadata?.name || null);
      return;
    }

    // 3. Fallback: no avatar
    setAvatarUrl(null);
    setUserName(profile?.name || profile?.username || authUser.email?.split("@")[0] || null);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="relative flex items-center h-16">

          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src="/logo.svg"
              alt="Logo"
              className="w-56 h-auto"
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
            <a
              href="/leaderboards"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              {t("header.leaderboards")}
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              {t("header.pricing")}
            </a>
          </nav>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-4">
            <LanguageSelector />
            {user ? (
              <div
                className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => navigate("/dashboard")}
              >
                <span className="text-sm font-medium hidden sm:block">{userName}</span>
                <Avatar className="w-9 h-9 ring-2 ring-accent/20">
                  <AvatarImage src={avatarUrl || undefined} />
                  <AvatarFallback className="bg-accent/10">
                    <User className="w-4 h-4 text-accent" />
                  </AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/auth")}
                >
                  {t("header.login")}
                </Button>
                <Button
                  onClick={() => navigate("/auth")}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                >
                  {t("header.signup")}
                </Button>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
