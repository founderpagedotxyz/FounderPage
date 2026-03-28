import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Mail, Bug, HelpCircle, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

const Support = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !subject.trim() || !message.trim() || !email.trim()) {
      toast.error(t("supportPage.fillAll"));
      return;
    }

    const body = `[${category}]\n\nFrom: ${email}\n\n${message}`;
    const mailtoUrl = `mailto:founderpage.xyz@gmail.com?subject=${encodeURIComponent(`[${category}] ${subject}`)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, "_blank");
    toast.success(t("supportPage.sent"));
  };

  const categories = [
    { value: "bug", label: t("supportPage.catBug"), icon: Bug },
    { value: "help", label: t("supportPage.catHelp"), icon: HelpCircle },
    { value: "feedback", label: t("supportPage.catFeedback"), icon: MessageSquare },
    { value: "other", label: t("supportPage.catOther"), icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t("common.back")}</span>
          </button>
          <div className="cursor-pointer" onClick={() => navigate("/")}>
            <img src="/logo.svg" alt="Founder Page" className="w-56 h-auto" />
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">{t("supportPage.title")}</h1>
          <p className="text-muted-foreground text-lg">{t("supportPage.subtitle")}</p>
        </div>

        {/* Contact info */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="font-semibold">{t("supportPage.emailUs")}</p>
                <a
                  href="mailto:founderpage.xyz@gmail.com"
                  className="text-accent hover:underline"
                >
                  founderpage.xyz@gmail.com
                </a>
                <p className="text-sm text-muted-foreground mt-1">{t("supportPage.responseTime")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact form */}
        <Card>
          <CardHeader>
            <CardTitle>{t("supportPage.formTitle")}</CardTitle>
            <CardDescription>{t("supportPage.formDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label>{t("supportPage.yourEmail")}</Label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>{t("supportPage.category")}</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("supportPage.selectCategory")} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        <span className="flex items-center gap-2">
                          <cat.icon className="w-4 h-4" />
                          {cat.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t("supportPage.subject")}</Label>
                <Input
                  placeholder={t("supportPage.subjectPlaceholder")}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>{t("supportPage.message")}</Label>
                <Textarea
                  placeholder={t("supportPage.messagePlaceholder")}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                />
              </div>

              <Button type="submit" className="w-full h-12 bg-accent hover:bg-accent/90 text-white font-semibold">
                <Send className="w-4 h-4 mr-2" />
                {t("supportPage.sendBtn")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Support;
