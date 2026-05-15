import { motion } from "framer-motion";
import { Radio, Activity, AlertTriangle } from "lucide-react";
import { TICKER_ITEMS } from "@/lib/mock-data";
import { useEffect, useState } from "react";

export function LiveHeader() {
  const [time, setTime] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(time / 60) + 47).padStart(2, "0");
  const ss = String(time % 60).padStart(2, "0");

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3 md:px-8">
        <div className="flex items-center gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-md bg-[var(--gradient-drama)] shadow-[var(--shadow-glow-drama)]">
            <Radio className="h-4 w-4 text-white" />
          </div>
          <div className="leading-tight">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              The Scriptwriter's
            </div>
            <div className="font-display text-sm font-bold tracking-wide">REVENGE</div>
          </div>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="font-mono text-xs font-semibold tracking-widest text-primary">LIVE</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Activity className="h-3.5 w-3.5 text-[var(--color-tech)]" />
            <span className="font-mono">MATCH 47:{mm}:{ss}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <AlertTriangle className="h-3.5 w-3.5 text-[var(--color-alert)]" />
            <span className="font-mono uppercase tracking-widest text-[var(--color-alert)]">Drama Critical</span>
          </div>
        </div>

        <div className="chip border-primary/40 bg-primary/10 text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Live Match Intelligence
        </div>
      </div>
    </header>
  );
}

export function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="relative w-full overflow-hidden border-y border-border/40 bg-background/80 py-2">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 45, ease: "linear", repeat: Infinity }}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-drama)] shadow-[0_0_10px_var(--color-drama)]" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
