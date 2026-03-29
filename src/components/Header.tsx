import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "@/components/LanguageSelector";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Menu, X } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [user, setUser] = useState<any>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        loadUserAvatar(session.user);
      }
    });

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

    const googleAvatar = authUser.user_metadata?.avatar_url || authUser.user_metadata?.picture;
    if (googleAvatar) {
      setAvatarUrl(googleAvatar);
      setUserName(authUser.user_metadata?.full_name || authUser.user_metadata?.name || null);
      return;
    }

    setAvatarUrl(null);
    setUserName(profile?.name || profile?.username || authUser.email?.split("@")[0] || null);
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">

          {/* Logo */}
          <div className="flex items-center cursor-pointer shrink-0" onClick={() => navigate("/")}>
            <img src="/logo.svg" alt="Logo" className="w-40 md:w-56 h-auto" />
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="/leaderboards" className="text-sm font-medium hover:text-accent transition-colors">{t("header.leaderboards")}</a>
            <a href="#pricing" className="text-sm font-medium hover:text-accent transition-colors">{t("header.pricing")}</a>
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSelector />
            {user ? (
              <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate("/dashboard")}>
                <span className="text-sm font-medium">{userName}</span>
                <Avatar className="w-9 h-9 ring-2 ring-accent/20">
                  <AvatarImage src={avatarUrl || undefined} />
                  <AvatarFallback className="bg-accent/10"><User className="w-4 h-4 text-accent" /></AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>{t("header.login")}</Button>
                <Button size="sm" onClick={() => navigate("/auth")} className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">{t("header.signup")}</Button>
              </>
            )}
          </div>

          {/* Mobile: avatar/lang + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSelector />
            {user && (
              <Avatar className="w-8 h-8 ring-2 ring-accent/20 cursor-pointer" onClick={() => navigate("/dashboard")}>
                <AvatarImage src={avatarUrl || undefined} />
                <AvatarFallback className="bg-accent/10"><User className="w-3 h-3 text-accent" /></AvatarFallback>
              </Avatar>
            )}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <a href="/leaderboards" onClick={closeMobile} className="block text-sm font-medium py-2 hover:text-accent">{t("header.leaderboards")}</a>
            <a href="#pricing" onClick={closeMobile} className="block text-sm font-medium py-2 hover:text-accent">{t("header.pricing")}</a>
            {!user && (
              <div className="flex gap-2 pt-2 border-t border-border">
                <Button variant="outline" className="flex-1" onClick={() => { navigate("/auth"); closeMobile(); }}>{t("header.login")}</Button>
                <Button className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold" onClick={() => { navigate("/auth"); closeMobile(); }}>{t("header.signup")}</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
