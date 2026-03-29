import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { isPremium, FREE_LIMITS } from "@/hooks/usePlan";
import { UpgradePrompt } from "@/components/UpgradePrompt";

// Beautiful balanced color themes
export const THEMES = {
  default: {
    name: "Default",
    primary: "222 47% 11%",
    accent: "142 76% 36%",
    background: "0 0% 100%",
    foreground: "222 47% 11%",
    muted: "210 40% 96%",
    card: "0 0% 100%",
  },
  ocean: {
    name: "Ocean",
    primary: "199 89% 48%",
    accent: "199 89% 48%",
    background: "210 40% 98%",
    foreground: "222 47% 11%",
    muted: "210 40% 96%",
    card: "0 0% 100%",
  },
  sunset: {
    name: "Sunset",
    primary: "24 95% 53%",
    accent: "24 95% 53%",
    background: "30 50% 98%",
    foreground: "20 14% 10%",
    muted: "30 40% 96%",
    card: "0 0% 100%",
  },
  forest: {
    name: "Forest",
    primary: "142 76% 36%",
    accent: "142 76% 36%",
    background: "138 40% 98%",
    foreground: "138 50% 10%",
    muted: "138 40% 96%",
    card: "0 0% 100%",
  },
  lavender: {
    name: "Lavender",
    primary: "262 83% 58%",
    accent: "262 83% 58%",
    background: "260 40% 98%",
    foreground: "262 30% 15%",
    muted: "260 40% 96%",
    card: "0 0% 100%",
  },
  midnight: {
    name: "Midnight",
    primary: "217 91% 60%",
    accent: "217 91% 60%",
    background: "222 47% 11%",
    foreground: "210 40% 98%",
    muted: "217 33% 17%",
    card: "222 47% 15%",
  },
  rose: {
    name: "Rose",
    primary: "346 77% 49%",
    accent: "346 77% 49%",
    background: "350 40% 98%",
    foreground: "346 30% 15%",
    muted: "350 40% 96%",
    card: "0 0% 100%",
  },
  slate: {
    name: "Slate",
    primary: "215 25% 27%",
    accent: "215 25% 40%",
    background: "210 40% 98%",
    foreground: "215 25% 10%",
    muted: "210 40% 96%",
    card: "0 0% 100%",
  },
  cherry: {
    name: "Cherry",
    primary: "350 80% 50%",
    accent: "350 80% 55%",
    background: "350 20% 10%",
    foreground: "350 20% 95%",
    muted: "350 15% 16%",
    card: "350 20% 14%",
  },
  emerald: {
    name: "Emerald",
    primary: "160 84% 39%",
    accent: "160 84% 44%",
    background: "160 20% 10%",
    foreground: "160 20% 95%",
    muted: "160 15% 16%",
    card: "160 20% 14%",
  },
  royal: {
    name: "Royal",
    primary: "230 70% 50%",
    accent: "230 70% 55%",
    background: "230 30% 10%",
    foreground: "230 20% 95%",
    muted: "230 20% 16%",
    card: "230 30% 14%",
  },
  amber: {
    name: "Amber",
    primary: "38 92% 50%",
    accent: "38 92% 50%",
    background: "35 40% 95%",
    foreground: "30 20% 12%",
    muted: "35 30% 90%",
    card: "35 40% 98%",
  },
  coral: {
    name: "Coral",
    primary: "16 80% 60%",
    accent: "16 80% 60%",
    background: "15 40% 98%",
    foreground: "16 30% 12%",
    muted: "15 35% 94%",
    card: "0 0% 100%",
  },
  indigo: {
    name: "Indigo",
    primary: "243 75% 59%",
    accent: "243 75% 59%",
    background: "240 30% 98%",
    foreground: "243 30% 12%",
    muted: "240 30% 94%",
    card: "0 0% 100%",
  },
  teal: {
    name: "Teal",
    primary: "174 72% 40%",
    accent: "174 72% 40%",
    background: "174 30% 97%",
    foreground: "174 30% 10%",
    muted: "174 25% 93%",
    card: "0 0% 100%",
  },
  plum: {
    name: "Plum",
    primary: "292 60% 55%",
    accent: "292 60% 60%",
    background: "290 25% 11%",
    foreground: "290 20% 95%",
    muted: "290 18% 17%",
    card: "290 25% 15%",
  },
  mint: {
    name: "Mint",
    primary: "152 60% 42%",
    accent: "152 60% 42%",
    background: "150 35% 96%",
    foreground: "152 30% 10%",
    muted: "150 30% 91%",
    card: "150 30% 99%",
  },
  peach: {
    name: "Peach",
    primary: "24 80% 58%",
    accent: "24 80% 58%",
    background: "24 50% 96%",
    foreground: "24 30% 12%",
    muted: "24 40% 91%",
    card: "24 45% 99%",
  },
  navy: {
    name: "Navy",
    primary: "45 80% 55%",
    accent: "45 80% 55%",
    background: "220 40% 13%",
    foreground: "45 20% 95%",
    muted: "220 30% 19%",
    card: "220 40% 17%",
  },
  wine: {
    name: "Wine",
    primary: "10 40% 65%",
    accent: "10 40% 65%",
    background: "345 35% 12%",
    foreground: "345 15% 93%",
    muted: "345 25% 18%",
    card: "345 35% 16%",
  },
  sage: {
    name: "Sage",
    primary: "135 30% 42%",
    accent: "135 30% 42%",
    background: "135 20% 95%",
    foreground: "135 25% 12%",
    muted: "135 18% 89%",
    card: "135 18% 99%",
  },
  blush: {
    name: "Blush",
    primary: "340 65% 47%",
    accent: "340 65% 47%",
    background: "340 30% 96%",
    foreground: "340 25% 12%",
    muted: "340 25% 91%",
    card: "340 25% 99%",
  },
  charcoal: {
    name: "Charcoal",
    primary: "185 70% 50%",
    accent: "185 70% 50%",
    background: "220 10% 13%",
    foreground: "185 15% 93%",
    muted: "220 8% 19%",
    card: "220 10% 17%",
  },
  sand: {
    name: "Sand",
    primary: "15 55% 48%",
    accent: "15 55% 48%",
    background: "35 30% 93%",
    foreground: "30 20% 12%",
    muted: "35 25% 87%",
    card: "35 25% 97%",
  },
  arctic: {
    name: "Arctic",
    primary: "200 70% 55%",
    accent: "200 70% 55%",
    background: "200 40% 97%",
    foreground: "200 30% 12%",
    muted: "200 30% 92%",
    card: "200 35% 100%",
  },
  neon: {
    name: "Neon",
    primary: "130 100% 50%",
    accent: "130 100% 50%",
    background: "240 15% 8%",
    foreground: "130 30% 93%",
    muted: "240 10% 14%",
    card: "240 15% 12%",
  },
  copper: {
    name: "Copper",
    primary: "25 65% 52%",
    accent: "25 65% 52%",
    background: "25 15% 11%",
    foreground: "25 20% 93%",
    muted: "25 12% 17%",
    card: "25 15% 15%",
  },
  mauve: {
    name: "Mauve",
    primary: "275 55% 42%",
    accent: "275 55% 42%",
    background: "275 20% 95%",
    foreground: "275 25% 12%",
    muted: "275 18% 90%",
    card: "275 18% 99%",
  },
  olive: {
    name: "Olive",
    primary: "80 40% 40%",
    accent: "80 40% 40%",
    background: "80 18% 94%",
    foreground: "80 25% 12%",
    muted: "80 15% 88%",
    card: "80 15% 98%",
  },
  steel: {
    name: "Steel",
    primary: "210 15% 65%",
    accent: "210 15% 65%",
    background: "215 18% 16%",
    foreground: "210 15% 92%",
    muted: "215 12% 22%",
    card: "215 18% 20%",
  },
} as const;

export const FONTS = {
  "dm-sans": {
    name: "DM Sans",
    family: "'DM Sans', sans-serif",
    import: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap",
  },
  "inter": {
    name: "Inter",
    family: "'Inter', sans-serif",
    import: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
  },
  "poppins": {
    name: "Poppins",
    family: "'Poppins', sans-serif",
    import: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap",
  },
  "space-grotesk": {
    name: "Space Grotesk",
    family: "'Space Grotesk', sans-serif",
    import: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap",
  },
  "crimson-pro": {
    name: "Crimson Pro",
    family: "'Crimson Pro', serif",
    import: "https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;500;600;700&display=swap",
  },
  "playfair": {
    name: "Playfair Display",
    family: "'Playfair Display', serif",
    import: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap",
  },
  "roboto": {
    name: "Roboto",
    family: "'Roboto', sans-serif",
    import: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap",
  },
  "montserrat": {
    name: "Montserrat",
    family: "'Montserrat', sans-serif",
    import: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap",
  },
} as const;

export type ThemeKey = keyof typeof THEMES;
export type FontKey = keyof typeof FONTS;

interface ThemeSelectorProps {
  selectedTheme: ThemeKey;
  selectedFont: FontKey;
  onThemeChange: (theme: ThemeKey) => void;
  onFontChange: (font: FontKey) => void;
  plan?: string | null;
}

export const ThemeSelector = ({
  selectedTheme,
  selectedFont,
  onThemeChange,
  onFontChange,
  plan,
}: ThemeSelectorProps) => {
  const { t } = useTranslation();
  const premium = isPremium(plan);
  const visibleThemes = premium
    ? Object.entries(THEMES)
    : Object.entries(THEMES).slice(0, FREE_LIMITS.maxThemes);
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-base font-medium">{t("theme.label")}</Label>
        <RadioGroup
          value={selectedTheme}
          onValueChange={(value) => onThemeChange(value as ThemeKey)}
          className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-3"
        >
          {visibleThemes.map(([key, theme]) => (
            <div key={key} className="relative">
              <RadioGroupItem
                value={key}
                id={`theme-${key}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`theme-${key}`}
                className="flex flex-col items-center gap-2 p-3 rounded-lg border-2 border-border cursor-pointer transition-all hover:border-accent peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-accent/5"
              >
                <div className="flex gap-1">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: `hsl(${theme.primary})` }}
                  />
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: `hsl(${theme.accent})` }}
                  />
                  <div
                    className="w-4 h-4 rounded-full border border-border"
                    style={{ backgroundColor: `hsl(${theme.background})` }}
                  />
                </div>
                <span className="text-sm font-medium">{theme.name}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
        {!premium && (
          <UpgradePrompt feature={t("upgrade.themesLimited")} compact />
        )}
      </div>

      <div className="space-y-3">
        <Label className="text-base font-medium">{t("theme.fontLabel")}</Label>
        <Select value={selectedFont} onValueChange={(value) => onFontChange(value as FontKey)}>
          <SelectTrigger className="w-full sm:w-64">
            <SelectValue placeholder={t("theme.fontPlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(FONTS).map(([key, font]) => (
              <SelectItem key={key} value={key} style={{ fontFamily: font.family }}>
                {font.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          {t("theme.preview")}: <span style={{ fontFamily: FONTS[selectedFont].family }}>The quick brown fox jumps over the lazy dog.</span>
        </p>
      </div>
    </div>
  );
};

// Helper function to apply theme styles to an element
export const getThemeStyles = (theme: ThemeKey, font: FontKey) => {
  const themeConfig = THEMES[theme] || THEMES.default;
  const fontConfig = FONTS[font] || FONTS["dm-sans"];

  return {
    "--profile-primary": themeConfig.primary,
    "--profile-accent": themeConfig.accent,
    "--profile-background": themeConfig.background,
    "--profile-foreground": themeConfig.foreground,
    "--profile-muted": themeConfig.muted,
    "--profile-card": themeConfig.card,
    "--profile-font": fontConfig.family,
    fontFamily: fontConfig.family,
  } as React.CSSProperties;
};

// Helper function to get font import URL
export const getFontImportUrl = (font: FontKey) => {
  return FONTS[font]?.import || FONTS["dm-sans"].import;
};