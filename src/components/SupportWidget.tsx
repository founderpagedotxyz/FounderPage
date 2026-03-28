import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, X, Send } from "lucide-react";
import { toast } from "sonner";

export const SupportWidget = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    setSending(true);

    // Send via mailto as a simple solution
    const mailtoUrl = `mailto:founderpage.xyz@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.open(mailtoUrl, "_blank");

    toast.success(t("support.sent"));
    setSubject("");
    setMessage("");
    setOpen(false);
    setSending(false);
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent text-white shadow-lg hover:bg-accent/90 transition-all hover:scale-110 flex items-center justify-center"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Support panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-80 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-accent text-white">
            <span className="font-semibold text-sm">{t("support.title")}</span>
            <button onClick={() => setOpen(false)} className="hover:opacity-70"><X className="w-4 h-4" /></button>
          </div>
          <form onSubmit={handleSend} className="p-4 space-y-3">
            <p className="text-xs text-muted-foreground">{t("support.description")}</p>
            <Input
              placeholder={t("support.subjectPlaceholder")}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="text-sm h-9"
            />
            <Textarea
              placeholder={t("support.messagePlaceholder")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={3}
              className="text-sm resize-none"
            />
            <Button type="submit" disabled={sending} className="w-full bg-accent hover:bg-accent/90 text-white h-9 text-sm">
              <Send className="w-3 h-3 mr-2" />
              {t("support.sendBtn")}
            </Button>
          </form>
        </div>
      )}
    </>
  );
};
