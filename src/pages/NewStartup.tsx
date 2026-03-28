import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { getCurrentUser } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ArrowLeft, FileText } from "lucide-react";
import { ImageUpload } from "@/components/ImageUpload";
import { startupSchema } from "@/lib/validation";

const NewStartup = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [showIncome, setShowIncome] = useState(true);
  const [logoUrl, setLogoUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const user = await getCurrentUser();
    if (!user) {
      navigate("/auth");
      return;
    }

    if (!name.trim()) {
      toast.error(t("newStartup.nameRequired"));
      setLoading(false);
      return;
    }

    // Validate startup data
    try {
      startupSchema.parse({
        name: name.trim(),
        description: description.trim() || undefined,
        url: url.trim() || undefined,
        category: category.trim() || undefined,
        monthly_income: monthlyIncome ? parseInt(monthlyIncome) : 0,
        logo_url: logoUrl || undefined,
      });
    } catch (error: any) {
      toast.error(error.errors[0]?.message || t("newStartup.invalidData"));
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("startups").insert({
      user_id: user.id,
      name: name.trim(),
      description: description.trim() || null,
      url: url.trim() || null,
      category: category.trim() || null,
      monthly_income: monthlyIncome ? parseInt(monthlyIncome) : 0,
      show_income: showIncome,
      income_verified: false,
      logo_url: logoUrl || null,
    });

    if (error) {
      toast.error(t("newStartup.createFailed", { error: error.message }));
    } else {
      toast.success(t("newStartup.createSuccess"));
      navigate("/dashboard");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <img src="/logo.svg" className="w-56 h-auto"/>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t("newStartup.backToDashboard")}
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>{t("newStartup.title")}</CardTitle>
            <CardDescription>
              {t("newStartup.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <ImageUpload
                bucket="startup-logos"
                currentImageUrl={logoUrl}
                onUploadComplete={setLogoUrl}
                label={t("newStartup.logo")}
              />
              
              <div className="space-y-2">
                <Label htmlFor="name">
                  {t("newStartup.name")} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("newStartup.namePlaceholder")}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">{t("newStartup.descLabel")}</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t("newStartup.descPlaceholder")}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">{t("newStartup.url")}</Label>
                <Input
                  id="url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={t("newStartup.urlPlaceholder")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">{t("newStartup.category")}</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder={t("newStartup.categoryPlaceholder")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="income">{t("newStartup.revenue")}</Label>
                <Input
                  id="income"
                  type="number"
                  min="0"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  placeholder={t("newStartup.revenuePlaceholder")}
                />
                <p className="text-xs text-muted-foreground">
                  {t("newStartup.revenueHelp")}
                </p>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="show-income">{t("newStartup.showRevenue")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("newStartup.showRevenueHelp")}
                  </p>
                </div>
                <Switch
                  id="show-income"
                  checked={showIncome}
                  onCheckedChange={setShowIncome}
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1 bg-accent hover:bg-accent/90"
                  disabled={loading}
                >
                  {loading ? t("newStartup.creating") : t("newStartup.createBtn")}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                >
                  {t("common.cancel")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default NewStartup;
