import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Rocket, TrendingUp, Verified, Check, Zap, Shield, Trophy, Search, Sparkles } from "lucide-react";
import { WavyBackground } from "@/components/ui/wavy-background";
import { motion } from "framer-motion";
import { FeaturedFounders } from "@/components/FeaturedFounders";

// --- PEGA TUS ENLACES DE STRIPE AQUÍ ---
const STRIPE_LINKS = {
  YEARLY: "https://buy.stripe.com/bJeeV67ExdbieRQ0WGafS00", // Reemplaza con tu enlace real del plan anual
  LIFETIME: "https://buy.stripe.com/6oUfZa2kdc7e398dJsafS01" // Reemplaza con tu enlace real del plan lifetime
};

const Hero = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleClaim = () => {
    if (username.trim()) {
      localStorage.setItem("claimedUsername", username.trim().toLowerCase());
    }
    navigate("/auth");
  };

  // Función para redirigir a Stripe Checkout
  const handleBuy = (url: string) => {
    window.location.href = url;
  };

  // --- CONFIGURACIÓN DE ANIMACIONES ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: { 
      opacity: 1, y: 0, filter: "blur(0px)", 
      transition: { duration: 0.6, ease: "easeOut" }
    },
  } as const;

  const howItWorksContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
  };

  const howItWorksCard = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, y: 0, scale: 1,
      transition: { type: "spring", bounce: 0.4, duration: 0.8 } 
    }
  } as const;

  // Animación para "Everything you need"
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const featureCardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, y: 0,
      transition: { duration: 0.5 }
    }
  } as const;

  return (
    <div className="min-h-screen bg-background">
      {/* --- HERO SECTION --- */}
      <WavyBackground
        backgroundFill="white"
        colors={["#f471b7", "#feebe7"]}
        waveWidth={30}
        waveOpacity={0.6}
        blur={20}
        speed="fast"
        containerClassName="flex flex-col items-center justify-center px-4 py-20"
        className="max-w-6xl w-full"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-muted bg-card/50 backdrop-blur-sm">
              <span className="text-sm font-medium text-muted-foreground">{t("hero.badge")}</span>
            </div>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-3xl sm:text-5xl md:text-7xl font-bold text-center mb-4 sm:mb-6 leading-tight" dangerouslySetInnerHTML={{ __html: t("hero.title") }} />

          <motion.p variants={itemVariants} className="text-base sm:text-xl text-gray-600-foreground text-center mb-8 sm:mb-12 max-w-3xl mx-auto px-2">
            {t("hero.subtitle")}
          </motion.p>

          <motion.div variants={itemVariants} className="max-w-2xl w-full mx-auto mb-10 sm:mb-16 px-2">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
              <div className="relative w-full">
                <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm sm:text-lg pointer-events-none select-none">
                  founderpage.xyz/
                </span>
                <Input
                  type="text"
                  placeholder={t("hero.placeholder")}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 sm:h-14 text-base sm:text-lg pl-[145px] sm:pl-[180px] bg-card border-2 placeholder:text-base sm:placeholder:text-lg"
                />
              </div>
              <Button onClick={handleClaim} size="lg" className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg bg-accent hover:bg-accent/90 text-accent-foreground font-semibold whitespace-nowrap transition-all w-full sm:w-auto">
                {t("hero.claimBtn")}
              </Button>
            </div>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4"><Rocket className="w-6 h-6 text-accent" /></div>
              <h3 className="text-lg font-semibold mb-2">{t("hero.featureFast")}</h3>
              <p className="text-sm text-muted-foreground">{t("hero.featureFastDesc")}</p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4"><Verified className="w-6 h-6 text-accent" /></div>
              <h3 className="text-lg font-semibold mb-2">{t("hero.featureVerify")}</h3>
              <p className="text-sm text-muted-foreground">{t("hero.featureVerifyDesc")}</p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4"><TrendingUp className="w-6 h-6 text-accent" /></div>
              <h3 className="text-lg font-semibold mb-2">{t("hero.featureTrack")}</h3>
              <p className="text-sm text-muted-foreground">{t("hero.featureTrackDesc")}</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </WavyBackground>

      {/* --- FEATURED FOUNDERS --- */}
      <FeaturedFounders />

      {/* --- HOW IT WORKS --- */}
      <section className="px-4 py-16 sm:py-32 bg-card/50 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-20"
          >
            {t("hero.howItWorks")}
          </motion.h2>
          
          <motion.div 
            variants={howItWorksContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          >
            {[
              { id: "1", title: t("hero.step1Title"), desc: t("hero.step1Desc") },
              { id: "2", title: t("hero.step2Title"), desc: t("hero.step2Desc") },
              { id: "3", title: t("hero.step3Title"), desc: t("hero.step3Desc") }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                variants={howItWorksCard}
                whileHover={{ y: -15, scale: 1.03, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex flex-col items-center text-center p-8 rounded-3xl bg-background border border-border/50 relative group transition-colors hover:border-accent/50"
              >
                <div className="w-20 h-20 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center text-3xl font-bold mb-8 shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform duration-300">
                  {item.id}
                </div>
                <h3 className="text-2xl font-semibold mb-4 whitespace-nowrap">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- FEATURES DETAIL --- */}
      <section className="px-4 py-16 sm:py-32 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-24"
          >
            {t("hero.featuresTitle")}
          </motion.h2>

          <motion.div 
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
          >
            {[
              { icon: Zap, title: t("hero.featureLightning"), desc: t("hero.featureLightningDesc") },
              { icon: Shield, title: t("hero.featureVerified"), desc: t("hero.featureVerifiedDesc") },
              { icon: Trophy, title: t("hero.featureLeaderboard"), desc: t("hero.featureLeaderboardDesc") },
              { icon: Search, title: t("hero.featureSEO"), desc: t("hero.featureSEODesc") }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                variants={featureCardVariant}
                whileHover={{ y: -5, backgroundColor: "rgba(0,0,0,0.02)" }}
                className="flex gap-6 p-8 rounded-3xl border border-transparent hover:border-border/50 transition-all duration-300 group"
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-accent/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                    <feature.icon className="w-7 h-7 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">{feature.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section id="pricing" className="px-4 py-16 sm:py-32 bg-gradient-to-b from-background to-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" dangerouslySetInnerHTML={{ __html: t("hero.pricingTitle") }} />
            <p className="text-xl text-muted-foreground">
              {t("hero.pricingSubtitle")}
            </p>
            <p className="text-sm text-muted-foreground mt-3">{t("hero.freeForever")}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* FREE PLAN */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-card rounded-[2rem] p-8 border border-border shadow-sm flex flex-col transition-all duration-300"
            >
              <div className="mb-4 text-center">
                <h3 className="text-2xl font-bold text-foreground">{t("hero.freePlan")}</h3>
                <p className="text-muted-foreground text-sm">{t("hero.freeDesc")}</p>
              </div>
              <div className="my-6 text-center">
                <span className="text-6xl font-black text-foreground tracking-tight">€0</span>
                <p className="text-sm text-muted-foreground mt-2">{t("hero.freePeriod")}</p>
              </div>
              <div className="w-full mb-6 space-y-2.5 text-left flex-1">
                {[
                  t("hero.freeFeature1"),
                  t("hero.freeFeature2"),
                  t("hero.freeFeature3"),
                  t("hero.freeFeature4"),
                  t("hero.freeFeature5"),
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="bg-foreground/20 p-0.5 rounded-full"><Check className="w-3 h-3 text-foreground/60" /></div>
                    <span className="text-sm text-muted-foreground">{feat}</span>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => navigate("/auth")}
                variant="outline"
                size="lg"
                className="w-full h-14 text-lg font-bold border-2 rounded-xl mt-auto"
              >
                {t("hero.freeBtn")}
              </Button>
            </motion.div>

            {/* 1-YEAR PASS */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-card rounded-[2rem] p-8 border border-border shadow-sm flex flex-col transition-all duration-300"
            >
              <div className="mb-4 text-center">
                <h3 className="text-2xl font-bold text-foreground">{t("hero.yearlyPlan")}</h3>
                <p className="text-muted-foreground text-sm">{t("hero.yearlyDesc")}</p>
              </div>
              <div className="my-6 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg text-muted-foreground line-through">€35</span>
                  <span className="text-6xl font-black text-foreground tracking-tight">€25</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{t("hero.yearlyPeriod")}</p>
              </div>
              <div className="w-full mb-2 text-left">
                <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">{t("hero.everythingInFree")}</p>
              </div>
              <div className="w-full mb-6 space-y-2.5 text-left flex-1">
                {[
                  t("hero.featureAnalytics"),
                  t("hero.featureStripe"),
                  t("hero.featureSEOIndex"),
                  t("hero.featureThemes"),
                  t("hero.featureLeaderboardAccess"),
                  t("hero.featureEmail"),
                  t("hero.featureSupport"),
                  t("hero.featureUpdates"),
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="bg-accent p-0.5 rounded-full"><Check className="w-3 h-3 text-white" /></div>
                    <span className="text-sm text-muted-foreground">{feat}</span>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => handleBuy(STRIPE_LINKS.YEARLY)}
                variant="outline"
                size="lg"
                className="w-full h-14 text-lg font-bold border-2 rounded-xl mt-auto hover:bg-accent hover:text-white hover:border-accent transition-all"
              >
                {t("hero.yearlyBtn")}
              </Button>
            </motion.div>

            {/* LIFETIME DEAL */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-card rounded-[2rem] p-8 border-2 border-accent shadow-2xl shadow-accent/10 flex flex-col relative transition-all duration-300"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-6 py-2 rounded-full font-bold text-sm tracking-wide shadow-lg flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> {t("hero.lifetimeBadge")}
              </div>
              <div className="mb-4 mt-2 text-center">
                <h3 className="text-2xl font-bold text-foreground">{t("hero.lifetimePlan")}</h3>
                <p className="text-muted-foreground text-sm">{t("hero.lifetimeDesc")}</p>
              </div>
              <div className="my-6 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg text-muted-foreground line-through">€50</span>
                  <span className="text-6xl font-black text-accent tracking-tight">€30</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{t("hero.lifetimePeriod")}</p>
              </div>
              <div className="w-full mb-2 text-left">
                <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">{t("hero.everythingInFree")}</p>
              </div>
              <div className="w-full mb-6 space-y-2.5 text-left flex-1">
                {[
                  t("hero.featureAnalytics"),
                  t("hero.featureStripe"),
                  t("hero.featureSEOIndex"),
                  t("hero.featureThemes"),
                  t("hero.featureLeaderboardAccess"),
                  t("hero.featureEmail"),
                  t("hero.featureSupport"),
                  t("hero.featureUpdates"),
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="bg-accent p-0.5 rounded-full"><Check className="w-3 h-3 text-white" /></div>
                    <span className="text-sm text-muted-foreground">{feat}</span>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => handleBuy(STRIPE_LINKS.LIFETIME)}
                size="lg"
                className="w-full h-14 text-lg font-bold rounded-xl mt-auto bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/25 transition-all"
              >
                {t("hero.lifetimeBtn")}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA CON WAVY BACKGROUND --- */}
      <WavyBackground
        backgroundFill="white"
        colors={["#f471b7", "#feebe7"]}
        waveWidth={30}
        waveOpacity={0.6}
        blur={20}
        speed="fast"
        containerClassName="flex flex-col items-center justify-center px-4 py-16 sm:py-24 h-auto min-h-[400px] sm:min-h-[500px]"
        className="max-w-4xl w-full mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center px-2"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">{t("hero.ctaTitle")}</h2>
          <p className="text-base sm:text-xl text-muted-foreground mb-8 sm:mb-12">{t("hero.ctaSubtitle")}</p>
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
              <div className="flex-1 w-full">
                <div className="relative w-full">
                  <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm sm:text-lg pointer-events-none select-none">founderpage.xyz/</span>
                  <Input type="text" placeholder={t("hero.placeholder")} value={username} onChange={(e) => setUsername(e.target.value)} className="h-12 sm:h-14 text-base sm:text-lg pl-[145px] sm:pl-[180px] bg-card border-2 placeholder:text-base sm:placeholder:text-lg" />
                </div>
              </div>
              <Button onClick={handleClaim} size="lg" className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg bg-accent hover:bg-accent/90 text-accent-foreground font-semibold whitespace-nowrap w-full sm:w-auto">{t("hero.claimBtn")}</Button>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><Check className="w-4 h-4 text-accent" />{t("hero.ctaFree")}</div>
            <div className="flex items-center gap-2"><Check className="w-4 h-4 text-accent" />{t("hero.ctaNoCard")}</div>
            <div className="flex items-center gap-2"><Check className="w-4 h-4 text-accent" />{t("hero.ctaSetup")}</div>
          </div>
        </motion.div>
      </WavyBackground>
    </div>
  );
};

export default Hero;