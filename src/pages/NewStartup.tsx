import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      toast.error("Startup name is required");
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
      toast.error(error.errors[0]?.message || "Invalid startup data");
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
      toast.error("Failed to create startup: " + error.message);
    } else {
      toast.success("Startup created successfully!");
      navigate("/dashboard");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <img src="/logo.svg" className="w-36 h-auto"/>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Add New Startup</CardTitle>
            <CardDescription>
              Share your project with the world and showcase your progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <ImageUpload
                bucket="startup-logos"
                currentImageUrl={logoUrl}
                onUploadComplete={setLogoUrl}
                label="Startup Logo"
              />
              
              <div className="space-y-2">
                <Label htmlFor="name">
                  Startup Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. CodeFast"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What does your startup do?"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">Website URL</Label>
                <Input
                  id="url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://yoursite.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. SaaS, E-commerce, Education"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="income">Monthly Revenue (USD)</Label>
                <Input
                  id="income"
                  type="number"
                  min="0"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">
                  Enter your current monthly recurring revenue
                </p>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="show-income">Show Revenue Publicly</Label>
                  <p className="text-sm text-muted-foreground">
                    Display your monthly revenue on your public profile
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
                  {loading ? "Creating..." : "Create Startup"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                >
                  Cancel
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
