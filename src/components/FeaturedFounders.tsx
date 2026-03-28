import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

type FounderProfile = {
  id: string;
  username: string;
  name: string | null;
  photo_url: string | null;
  startup_count: number;
};

export const FeaturedFounders = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [founders, setFounders] = useState<FounderProfile[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadFounders();
  }, []);

  const loadFounders = async () => {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, username, name, photo_url")
      .not("photo_url", "is", null);

    if (!profiles || profiles.length === 0) return;

    const { data: startups } = await supabase
      .from("startups")
      .select("user_id")
      .in("user_id", profiles.map((p) => p.id));

    if (!startups) return;

    const countMap: Record<string, number> = {};
    for (const s of startups) {
      countMap[s.user_id] = (countMap[s.user_id] || 0) + 1;
    }

    const foundersWithStartups = profiles
      .filter((p) => countMap[p.id] > 0)
      .map((p) => ({ ...p, startup_count: countMap[p.id] }))
      .sort((a, b) => b.startup_count - a.startup_count);

    setFounders(foundersWithStartups);
  };

  if (founders.length === 0) return null;

  // Duplicate for infinite scroll illusion
  const displayFounders = [...founders, ...founders];

  return (
    <section className="py-16 bg-card/50 overflow-hidden border-b border-border/50">
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          {t("founders.title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-center mt-3"
        >
          {t("founders.subtitle")}
        </motion.p>
      </div>

      <div className="relative">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-card/50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-card/50 to-transparent z-10 pointer-events-none" />

        <motion.div
          ref={scrollRef}
          className="flex gap-6 px-4"
          animate={{ x: [0, -(founders.length * 140)] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: founders.length * 4,
              ease: "linear",
            },
          }}
        >
          {displayFounders.map((founder, idx) => (
            <motion.div
              key={`${founder.id}-${idx}`}
              whileHover={{ y: -8, scale: 1.05 }}
              onClick={() => navigate(`/${founder.username}`)}
              className="flex flex-col items-center gap-3 cursor-pointer flex-shrink-0 w-[120px] group"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-border group-hover:ring-accent transition-all duration-300 shadow-md group-hover:shadow-lg">
                  <img
                    src={founder.photo_url!}
                    alt={founder.name || founder.username}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold truncate max-w-[110px] group-hover:text-accent transition-colors">
                  {founder.name || founder.username}
                </p>
                <span className="text-xs text-accent font-medium bg-accent/10 px-2 py-0.5 rounded-full">
                  {t("founders.startupCount", { count: founder.startup_count })}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
