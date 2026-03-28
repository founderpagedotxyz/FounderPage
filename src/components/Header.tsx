import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="relative flex items-center h-16">

          {/* Logo - Izquierda */}
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

          {/* Navigation - Centro real */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
            <a
              href="/leaderboards"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Leaderboards
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Pricing
            </a>
          </nav>

          {/* Actions - Derecha */}
          <div className="ml-auto flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/auth")}
            >
              LOG IN
            </Button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
