import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="font-bold text-lg">
                <img src="/logo.svg" alt="Logo" className="w-56 h-auto"/>
              </div>
            </div>
            <p className="text-muted-foreground text-sm max-w-md">
              {t("footer.description")}
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">{t("footer.product")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {t("footer.features")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {t("footer.pricing")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {t("footer.examples")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {t("footer.changelog")}
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">{t("footer.company")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {t("footer.about")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {t("footer.blog")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {t("footer.privacy")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {t("footer.terms")}
                </a>
              </li>
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
              <a href="#" className="hover:text-foreground transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                GitHub
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
