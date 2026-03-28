import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "@/components/LanguageSelector";

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
            <Button
              variant="ghost"
              onClick={() => navigate("/auth")}
            >
              {t("header.login")}
            </Button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
