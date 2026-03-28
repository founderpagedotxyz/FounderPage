import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "pt", label: "PT" },
];

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleChange = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <Select value={i18n.language} onValueChange={handleChange}>
      <SelectTrigger className="w-16 h-8 text-xs px-2">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code} className="text-xs">
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
