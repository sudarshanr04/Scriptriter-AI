import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  before: number;
  after: number;
  series: number[];
  volatility: number;
}

export function OddsCard({ before, after, series, volatility }: Props) {
  const up = after > before;
  const min = Math.min(...series);
  const max = Math.max(...series);
  const range = max - min || 1;
  const path = series
    .map((v, i) => `${(i / (series.length - 1)) * 100},${100 - ((v - min) / range) * 100}`)
    .join(" ");

  const [display, setDisplay] = useState(before);
  useEffect(() => {
    let f = 0;
    const id = setInterval(() => {
      f++;
      const t = Math.min(1, f / 30);
      setDisplay(+(before + (after - before) * t).toFixed(2));
      if (t >= 1) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [before, after]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`glass scanlines relative overflow-hidden rounded-2xl p-5 ${up ? "glass-glow-drama" : ""}`}
      style={up ? undefined : { boxShadow: "0 0 30px oklch(0.72 0.2 150 / 0.3)" }}
    >
      <header className="mb-3 flex items-center justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Live Odds Shift
          </div>
          <h3 className="font-display text-lg font-bold tracking-wide">Bookmaker Pulse</h3>
        </div>
        <div className={`chip ${volatility > 0.5 ? "border-[var(--color-alert)]/50 bg-[var(--color-alert)]/15 text-[var(--color-alert)]" : "border-border"}`}>
          <AlertCircle className="h-3 w-3" /> {volatility > 0.5 ? "High Volatility" : "Stable"}
        </div>
      </header>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-border/60 bg-background/30 p-3">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Before Over</div>
          <div className="mt-1 font-display text-2xl font-bold">{before.toFixed(2)}</div>
        </div>
        <div className={`rounded-lg border p-3 ${up ? "border-primary/50 bg-primary/10" : "border-success/50 bg-success/10"}`}>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">After Chaos</span>
            {up ? (
              <TrendingUp className="h-3 w-3 text-primary" />
            ) : (
              <TrendingDown className="h-3 w-3 text-success" />
            )}
          </div>
          <motion.div
            key={display}
            initial={{ y: -4, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`mt-1 font-display text-2xl font-bold ${up ? "text-primary text-glow-drama" : "text-success"}`}
          >
            {display.toFixed(2)}
          </motion.div>
        </div>
      </div>

      {/* Sparkline */}
      <div className="mt-4 h-20 w-full">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <linearGradient id="sparkfill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={up ? "oklch(0.62 0.27 22)" : "oklch(0.72 0.2 150)"} stopOpacity="0.5" />
              <stop offset="100%" stopColor={up ? "oklch(0.62 0.27 22)" : "oklch(0.72 0.2 150)"} stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.polyline
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2 }}
            points={path}
            fill="none"
            stroke={up ? "oklch(0.62 0.27 22)" : "oklch(0.72 0.2 150)"}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <polygon points={`${path} 100,100 0,100`} fill="url(#sparkfill)" />
        </svg>
      </div>
    </motion.div>
  );
}
