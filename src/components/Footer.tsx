import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.svg" alt="Logo" className="w-56 h-auto"/>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              {t("footer.description")}
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">{t("footer.product")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/features" className="hover:text-foreground transition-colors">{t("footer.features")}</Link></li>
              <li><Link to="/pricing" className="hover:text-foreground transition-colors">{t("footer.pricing")}</Link></li>
              <li><Link to="/examples" className="hover:text-foreground transition-colors">{t("footer.examples")}</Link></li>
              <li><Link to="/changelog" className="hover:text-foreground transition-colors">{t("footer.changelog")}</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">{t("footer.company")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground transition-colors">{t("footer.about")}</Link></li>
              <li><Link to="/blog" className="hover:text-foreground transition-colors">{t("footer.blog")}</Link></li>
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">{t("footer.privacy")}</Link></li>
              <li><Link to="/terms" className="hover:text-foreground transition-colors">{t("footer.terms")}</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {t("footer.copyright", { year: currentYear })}
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/support" className="hover:text-foreground transition-colors">Support</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
