import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles, Film, Quote } from "lucide-react";
import { GENERATION_STATUSES, type OverScript, emptyTeaser } from "@/lib/mock-data";

interface Props {
  generating: boolean;
  script: OverScript[] | null;
  statusIndex: number;
}

export function ScriptFeed({ generating, script, statusIndex }: Props) {
  const [teaser] = useState(emptyTeaser);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="glass glass-glow-drama scanlines sweep relative flex min-h-[600px] flex-col rounded-2xl p-6"
    >
      <header className="flex items-center justify-between border-b border-border/50 pb-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Section 02 · The Cinema
          </div>
          <h2 className="flex items-center gap-2 font-display text-2xl font-black uppercase tracking-tight">
            <Film className="h-5 w-5 text-primary" /> Predictive Match Engine
          </h2>
        </div>
        <div className="chip border-primary/40 bg-primary/10 text-primary">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary shadow-[0_0_8px_var(--color-drama)]" />
          {generating ? "Generating" : script ? "Leaked" : "Standby"}
        </div>
      </header>

      <div className="flex-1 pt-5">
        <AnimatePresence mode="wait">
          {generating && !script && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {GENERATION_STATUSES.slice(0, statusIndex + 1).map((s, i) => (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3"
                >
                  <div className={`h-2 w-2 rounded-full ${i === statusIndex ? "animate-pulse bg-[var(--color-tech)] shadow-[0_0_10px_var(--color-tech)]" : "bg-success"}`} />
                  <span className="font-mono text-sm text-muted-foreground">{s}</span>
                </motion.div>
              ))}
              <div className="mt-6 h-1 overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-[var(--color-alert)] to-[var(--color-tech)]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(statusIndex + 1) * 22}%` }}
                />
              </div>
            </motion.div>
          )}

          {!generating && !script && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-full min-h-[400px] flex-col items-center justify-center text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--gradient-tech)] shadow-[var(--shadow-glow-tech)]"
              >
                <Sparkles className="h-10 w-10 text-white" />
              </motion.div>
              <h3 className="font-display text-2xl font-bold">{teaser}</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Adjust drama, rage and energy on the left, then press{" "}
                <span className="font-mono text-primary">Generate Chaos</span> to leak the next 3 overs.
              </p>
            </motion.div>
          )}

          {script && !generating && (
            <motion.div key="result" className="space-y-5">
              {script.map((over, i) => (
                <OverCard key={over.over + "-" + i} over={over} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

function OverCard({ over, index }: { over: OverScript; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, delay: index * 0.5 }}
      className="relative overflow-hidden rounded-xl border border-border/60 bg-background/40 p-5"
    >
      <div className="absolute -left-px top-0 h-full w-1 bg-gradient-to-b from-primary via-[var(--color-alert)] to-[var(--color-tech)]" />
      <header className="mb-3 flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            AI Projection
          </span>
          <span className="font-display text-3xl font-black text-glow-drama text-primary">
            OVER {over.over}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="chip">+{over.runs} runs</span>
          {over.wickets > 0 && (
            <span className="chip border-[var(--color-alert)]/50 bg-[var(--color-alert)]/15 text-[var(--color-alert)]">
              {over.wickets} wkt{over.wickets > 1 ? "s" : ""}
            </span>
          )}
        </div>
      </header>

      <ul className="space-y-2">
        {over.events.map((e, i) => (
          <TypingItem key={i} text={e} delay={index * 0.5 + i * 0.4} />
        ))}
      </ul>

      <motion.blockquote
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.5 + over.events.length * 0.4 + 0.2 }}
        className="mt-4 flex items-start gap-2 rounded-lg border border-[var(--color-alert)]/30 bg-[var(--color-alert)]/5 p-3"
      >
        <Quote className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-alert)]" />
        <span className="font-display italic text-foreground">"{over.quote}"</span>
      </motion.blockquote>
    </motion.article>
  );
}

function TypingItem({ text, delay }: { text: string; delay: number }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    const start = setTimeout(() => {
      let i = 0;
      const id = setInterval(() => {
        i++;
        setShown(text.slice(0, i));
        if (i >= text.length) clearInterval(id);
      }, 12);
    }, delay * 1000);
    return () => clearTimeout(start);
  }, [text, delay]);

  return (
    <li className="flex items-start gap-3 text-sm text-foreground/90">
      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_8px_var(--color-drama)]" />
      <span className="font-mono leading-relaxed">{shown}<span className="ml-0.5 inline-block h-3 w-[2px] animate-blink bg-primary align-middle" /></span>
    </li>
  );
}
