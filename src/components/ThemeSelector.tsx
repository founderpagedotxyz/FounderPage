import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
}

export const ThemeSelector = ({
  selectedTheme,
  selectedFont,
  onThemeChange,
  onFontChange,
}: ThemeSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-base font-medium">Theme</Label>
        <RadioGroup
          value={selectedTheme}
          onValueChange={(value) => onThemeChange(value as ThemeKey)}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {Object.entries(THEMES).map(([key, theme]) => (
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
      </div>

      <div className="space-y-3">
        <Label className="text-base font-medium">Font Family</Label>
        <Select value={selectedFont} onValueChange={(value) => onFontChange(value as FontKey)}>
          <SelectTrigger className="w-full sm:w-64">
            <SelectValue placeholder="Select a font" />
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
          Preview: <span style={{ fontFamily: FONTS[selectedFont].family }}>The quick brown fox jumps over the lazy dog.</span>
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