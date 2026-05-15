import { AnimatePresence, motion } from "framer-motion";
import { Heart, MessageCircle, Repeat2, Flame, TrendingUp } from "lucide-react";
import { useEffect, useRef } from "react";
import { HASHTAGS, type FakeTweet } from "@/lib/mock-data";

interface Props {
  tweets: FakeTweet[];
  intensity: number;
}

export function TwitterMeltdown({ tweets, intensity }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf = 0;
    let paused = false;
    const onEnter = () => { paused = true; };
    const onLeave = () => { paused = false; };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    const tick = () => {
      if (!paused && el.scrollHeight > el.clientHeight) {
        el.scrollTop += 0.4;
        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 1) el.scrollTop = 0;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); };
  }, [tweets]);

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass glass-glow-tech scanlines flex flex-col gap-4 rounded-2xl p-5"
    >
      <header className="flex items-center justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Section 03
          </div>
          <h2 className="font-display text-lg font-bold tracking-wide">Twitter Meltdown</h2>
        </div>
        <div className="chip border-[var(--color-alert)]/40 bg-[var(--color-alert)]/10 text-[var(--color-alert)]">
          <Flame className="h-3 w-3" /> Meme {Math.round(intensity)}
        </div>
      </header>

      {/* Trending */}
      <div>
        <div className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <TrendingUp className="h-3 w-3" /> Trending
        </div>
        <div className="flex flex-wrap gap-1.5">
          {HASHTAGS.slice(0, 5).map((h, i) => (
            <motion.span
              key={h}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              className="rounded-md border border-[var(--color-tech)]/30 bg-[var(--color-tech)]/10 px-2 py-1 font-mono text-[10px] font-semibold text-[var(--color-tech)]"
            >
              {h}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Tweet feed */}
      <div
        ref={scrollRef}
        className="hide-scroll relative max-h-[520px] space-y-3 overflow-y-auto pr-1"
        style={{ maskImage: "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)" }}
      >
        <AnimatePresence>
          {tweets.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`group rounded-xl border p-3 transition ${
                t.hot
                  ? "border-primary/40 bg-primary/5 shadow-[0_0_20px_oklch(0.62_0.27_22/0.15)]"
                  : "border-border/60 bg-background/30"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-muted to-background text-lg ring-1 ring-border">
                  {t.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold">{t.name}</span>
                    {t.hot && (
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-foreground/90">{t.text}</p>
                  <div className="mt-2 flex items-center gap-4 font-mono text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Heart className="h-3 w-3" />{t.likes.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Repeat2 className="h-3 w-3" />{Math.floor(t.likes/4).toLocaleString()}</span>
                    <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" />{Math.floor(t.likes/9).toLocaleString()}</span>
                    <span className={`ml-auto rounded px-1.5 py-0.5 ${t.rage > 80 ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                      RAGE {Math.round(t.rage)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}
