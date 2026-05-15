import { motion } from "framer-motion";
import { Sparkles, Play, AlertOctagon } from "lucide-react";
import { StadiumBackdrop } from "./StadiumBackdrop";

interface HeroProps {
  onStart: () => void;
}

export function Hero({ onStart }: HeroProps) {
  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      <StadiumBackdrop />

      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-[1400px] flex-col items-center justify-center px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <div className="chip border-primary/50 bg-primary/15 text-primary">
            <AlertOctagon className="h-3 w-3" /> Live Momentum Analysis
          </div>
          <div className="chip border-[var(--color-tech)]/50 bg-[var(--color-tech)]/10 text-[var(--color-tech)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-tech)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-tech)]" />
            </span>
            LIVE Conspiracy Engine v2.4
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-8 font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-foreground sm:text-7xl md:text-[8rem]"
        >
          <span className="block text-glow-drama text-primary">The Scriptwriter's</span>
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-[var(--color-alert)] via-primary to-[var(--color-tech)] bg-clip-text text-transparent">
              REVENGE
            </span>
            <motion.span
              aria-hidden
              className="absolute -inset-x-2 -bottom-2 h-1 origin-left bg-gradient-to-r from-primary via-[var(--color-alert)] to-[var(--color-tech)]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: "circOut" }}
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg"
        >
          Real-time IPL intelligence powered by AI,{" "}
          <span className="text-foreground">live momentum tracking</span>, and{" "}
          <span className="text-[var(--color-tech)]">predictive narrative analysis</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <motion.button
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onStart}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[var(--gradient-drama)] px-10 py-5 font-display text-base font-bold uppercase tracking-widest text-white shadow-[var(--shadow-glow-drama)] transition-shadow hover:shadow-[0_0_60px_oklch(0.62_0.27_22/0.7)]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <Play className="h-5 w-5 fill-current" />
            Generate The Script
            <Sparkles className="h-5 w-5" />
          </motion.button>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            ↓ enter the command room
          </p>
        </motion.div>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 grid w-full max-w-3xl grid-cols-3 gap-3"
        >
          {[
            { k: "Drama Index", v: "98.2%", c: "text-primary" },
            { k: "Conspiracies Generated", v: "47,219", c: "text-[var(--color-tech)]" },
            { k: "Twitter Meltdowns", v: "∞", c: "text-[var(--color-alert)]" },
          ].map((s) => (
            <div key={s.k} className="glass scanlines relative rounded-xl px-4 py-4">
              <div className={`font-display text-2xl font-bold ${s.c}`}>{s.v}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {s.k}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
