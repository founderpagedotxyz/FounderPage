import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rocket, TrendingUp, Verified, Check, Zap, Shield, Trophy, Search, Sparkles } from "lucide-react";
import { WavyBackground } from "@/components/ui/wavy-background";
import { motion } from "framer-motion";

// --- PEGA TUS ENLACES DE STRIPE AQUÍ ---
const STRIPE_LINKS = {
  YEARLY: "https://buy.stripe.com/bJeeV67ExdbieRQ0WGafS00", // Reemplaza con tu enlace real del plan anual
  LIFETIME: "https://buy.stripe.com/6oUfZa2kdc7e398dJsafS01" // Reemplaza con tu enlace real del plan lifetime
};

const Hero = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleClaim = () => {
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
              <span className="text-sm font-medium text-muted-foreground">Founder Page is under active development</span>
            </div>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-center mb-6 leading-tight">
            Showcase and<br />grow your startups
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl text-gray-600-foreground text-center mb-12 max-w-3xl mx-auto">
            Get a Founder Page to show your unique journey and stand out from the crowd. 
          </motion.p>

          <motion.div variants={itemVariants} className="max-w-2xl w-full mx-auto mb-16">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <div className="relative w-full">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg pointer-events-none select-none">
                  founderpage.xyz/
                </span>
                <Input
                  type="text"
                  placeholder="yourname"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-14 text-lg pl-[180px] bg-card border-2 placeholder:text-lg"
                />
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={handleClaim} size="lg" className="h-14 px-8 text-lg bg-accent hover:bg-accent/90 text-accent-foreground font-semibold whitespace-nowrap transition-all">
                  CLAIM MY FOUNDER PAGE →
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4"><Rocket className="w-6 h-6 text-accent" /></div>
              <h3 className="text-lg font-semibold mb-2">Launch Fast</h3>
              <p className="text-sm text-muted-foreground">Create your page in minutes</p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4"><Verified className="w-6 h-6 text-accent" /></div>
              <h3 className="text-lg font-semibold mb-2">Verify Revenue</h3>
              <p className="text-sm text-muted-foreground">Connect Stripe automatically</p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4"><TrendingUp className="w-6 h-6 text-accent" /></div>
              <h3 className="text-lg font-semibold mb-2">Track Growth</h3>
              <p className="text-sm text-muted-foreground">Show your startup's progress</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </WavyBackground>

      {/* --- HOW IT WORKS --- */}
      <section className="px-4 py-32 bg-card/50 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-20"
          >
            How it works
          </motion.h2>
          
          <motion.div 
            variants={howItWorksContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          >
            {[
              { id: "1", title: "Create Your Founder Page", desc: "Sign up in seconds and claim your unique username." },
              { id: "2", title: "Add Your Startups", desc: "List all your projects and startups. Upload logos, add descriptions." },
              { id: "3", title: "Verify Revenue", desc: "Connect Stripe or Polar to verify your revenue. Show real growth." }
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
      <section className="px-4 py-32 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-24"
          >
            Everything you need to stand out
          </motion.h2>

          <motion.div 
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
          >
            {[
              { icon: Zap, title: "Lightning Fast Setup", desc: "Get your professional page live in under 5 minutes." },
              { icon: Shield, title: "Verified Revenue", desc: "Build trust with verified revenue badges via Stripe." },
              { icon: Trophy, title: "Compete for Leaderboards", desc: "Rank among the top makers by revenue." },
              { icon: Search, title: "SEO Optimized", desc: "Search engines follow your links. Fully indexed." }
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
      <section className="px-4 py-32 bg-gradient-to-b from-background to-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Unlock Your Full Potential <br/>
              <span className="text-accent">with Any Plan</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple pricing. No hidden fees. Choose your pace.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 bg-white rounded-3xl p-8 border border-border/50 shadow-sm"
          >
            <div className="text-center mb-8">
              <span className="bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide">
                Included in both plans
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                  "Verified Analytics",
                  "Stripe Revenue Integration",
                  "SEO Indexing",
                  "Custom Themes",
                  "Leaderboard Access",
                  "Email Collection",
                  "Priority Support",
                  "Lifetime Updates"
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-3 justify-center md:justify-start">
                    <div className="bg-accent p-1 rounded-full"><Check className="w-4 h-4 text-white" /></div>
                    <span className="font-medium text-muted-foreground">{feat}</span>
                  </div>
                ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* 1-Year Pass */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-card rounded-[2rem] p-10 border border-border shadow-sm flex flex-col items-center text-center transition-all duration-300"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground">1-Year Pass</h3>
                <p className="text-muted-foreground">Perfect for validating ideas</p>
              </div>
              <div className="my-8">
                 <div className="flex items-center justify-center gap-2">
                    <span className="text-lg text-muted-foreground line-through">€35</span>
                    <span className="text-6xl font-black text-foreground tracking-tight">€25</span>
                 </div>
                 <p className="text-sm text-muted-foreground mt-2">USD / year</p>
              </div>
              <Button 
                onClick={() => handleBuy(STRIPE_LINKS.YEARLY)} 
                variant="outline" 
                size="lg" 
                className="w-full h-16 text-lg font-bold border-2 rounded-xl mt-auto hover:bg-accent hover:text-white hover:border-accent transition-all"
              >
                Choose Yearly
              </Button>
            </motion.div>

            {/* Lifetime Deal */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-card rounded-[2rem] p-10 border-2 border-accent shadow-2xl shadow-accent/10 flex flex-col items-center text-center relative transition-all duration-300"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-6 py-2 rounded-full font-bold text-sm tracking-wide shadow-lg flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> BEST VALUE
              </div>
              <div className="mb-6 mt-2">
                <h3 className="text-2xl font-bold text-foreground">Lifetime Deal</h3>
                <p className="text-muted-foreground">Pay once, own it forever</p>
              </div>
              <div className="my-8">
                 <div className="flex items-center justify-center gap-2">
                    <span className="text-lg text-muted-foreground line-through">€50</span>
                    <span className="text-6xl font-black text-accent tracking-tight">€30</span>
                 </div>
                 <p className="text-sm text-muted-foreground mt-2">USD / once</p>
              </div>
              <Button 
                onClick={() => handleBuy(STRIPE_LINKS.LIFETIME)} 
                size="lg" 
                className="w-full h-16 text-lg font-bold rounded-xl mt-auto bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/25 transition-all"
              >
                Get Lifetime Access
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
        containerClassName="flex flex-col items-center justify-center px-4 py-24 h-auto min-h-[500px]"
        className="max-w-4xl w-full mx-auto"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to showcase your journey?</h2>
          <p className="text-xl text-muted-foreground mb-12">Claim your Founder Page and start building in public today</p>
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <div className="flex-1 w-full">
                <div className="relative w-full">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg pointer-events-none select-none">founderpage.xyz/</span>
                  <Input type="text" placeholder="yourname" value={username} onChange={(e) => setUsername(e.target.value)} className="h-14 text-lg pl-[180px] bg-card border-2 placeholder:text-lg" />
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={handleClaim} size="lg" className="h-14 px-8 text-lg bg-accent hover:bg-accent/90 text-accent-foreground font-semibold whitespace-nowrap">CLAIM MY FOUNDER PAGE →</Button>
              </motion.div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><Check className="w-4 h-4 text-accent" />Free to start</div>
            <div className="flex items-center gap-2"><Check className="w-4 h-4 text-accent" />No credit card required</div>
            <div className="flex items-center gap-2"><Check className="w-4 h-4 text-accent" />Setup in 5 minutes</div>
          </div>
        </motion.div>
      </WavyBackground>
    </div>
  );
};

export default Hero;