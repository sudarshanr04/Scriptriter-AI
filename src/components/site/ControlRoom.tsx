import { motion } from "framer-motion";
import { Zap, Flame, AlertTriangle, Volume2, Crosshair } from "lucide-react";
import { useState } from "react";
import { TEAMS, type MatchState } from "@/lib/mock-data";

interface Props {
  state: MatchState;
  setState: (s: MatchState) => void;
  onGenerate: () => void;
  generating: boolean;
}

const SLIDERS = [
  { key: "drama", label: "Drama Level", icon: Flame, color: "var(--color-drama)" },
  { key: "rage", label: "Crowd Rage", icon: Volume2, color: "var(--color-alert)" },
  { key: "energy", label: "Script Energy", icon: Zap, color: "var(--color-tech)" },
  { key: "controversy", label: "Umpire Controversy", icon: Crosshair, color: "var(--color-drama)" },
] as const;

export function ControlRoom({ state, setState, onGenerate, generating }: Props) {
  const update = <K extends keyof MatchState>(k: K, v: MatchState[K]) =>
    setState({ ...state, [k]: v });

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="glass scanlines relative flex flex-col gap-5 rounded-2xl p-5"
    >
      <header className="flex items-center justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Section 01
          </div>
          <h2 className="font-display text-lg font-bold tracking-wide">Live Match State</h2>
        </div>
        <div className="chip border-[var(--color-tech)]/40 bg-[var(--color-tech)]/10 text-[var(--color-tech)]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-tech)]" />
          Synced
        </div>
      </header>

      {/* Teams */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Batting">
          <select
            value={state.battingTeam}
            onChange={(e) => update("battingTeam", e.target.value)}
            className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm font-medium text-foreground outline-none focus:border-[var(--color-tech)]"
          >
            {TEAMS.map((t) => (
              <option key={t.id} value={t.id} className="bg-background">{t.short} — {t.name}</option>
            ))}
          </select>
        </Field>
        <Field label="Bowling">
          <select
            value={state.bowlingTeam}
            onChange={(e) => update("bowlingTeam", e.target.value)}
            className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm font-medium text-foreground outline-none focus:border-[var(--color-drama)]"
          >
            {TEAMS.map((t) => (
              <option key={t.id} value={t.id} className="bg-background">{t.short} — {t.name}</option>
            ))}
          </select>
        </Field>
      </div>

      {/* Score row */}
      <div className="grid grid-cols-3 gap-2">
        <NumField label="Score" value={state.score} onChange={(v) => update("score", v)} />
        <NumField label="Wickets" value={state.wickets} onChange={(v) => update("wickets", v)} max={10} />
        <NumField label="Overs" value={state.overs} onChange={(v) => update("overs", v)} step={0.1} max={20} />
      </div>
      <div className="grid grid-cols-1 gap-2">
        <NumField label="Target" value={state.target} onChange={(v) => update("target", v)} />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Field label="Batter">
          <input
            value={state.batter}
            onChange={(e) => update("batter", e.target.value)}
            className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm outline-none focus:border-[var(--color-tech)]"
          />
        </Field>
        <Field label="Bowler">
          <input
            value={state.bowler}
            onChange={(e) => update("bowler", e.target.value)}
            className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm outline-none focus:border-[var(--color-drama)]"
          />
        </Field>
      </div>

      {/* Sliders */}
      <div className="space-y-4 border-t border-border/60 pt-4">
        {SLIDERS.map(({ key, label, icon: Icon, color }) => (
          <Slider
            key={key}
            label={label}
            value={state[key]}
            onChange={(v) => update(key, v)}
            color={color}
            Icon={Icon}
          />
        ))}
      </div>

      {/* CTA */}
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        disabled={generating}
        onClick={onGenerate}
        className="group relative mt-2 inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-[var(--gradient-drama)] px-5 py-4 font-display text-sm font-bold uppercase tracking-[0.2em] text-white shadow-[var(--shadow-glow-drama)] transition disabled:opacity-60"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <AlertTriangle className="h-4 w-4" />
        {generating ? "Cooking the script..." : "Generate Chaos"}
      </motion.button>
    </motion.aside>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      {children}
    </label>
  );
}

function NumField({
  label, value, onChange, step = 1, max,
}: { label: string; value: number; onChange: (v: number) => void; step?: number; max?: number }) {
  return (
    <Field label={label}>
      <input
        type="number"
        value={value}
        step={step}
        max={max}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm font-mono outline-none focus:border-[var(--color-tech)]"
      />
    </Field>
  );
}

function Slider({
  label, value, onChange, color, Icon,
}: {
  label: string; value: number; onChange: (v: number) => void; color: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  const critical = value > 80;
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-3.5 w-3.5" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            {label}
          </span>
        </div>
        <motion.span
          key={value}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`font-mono text-xs font-bold ${critical ? "text-[var(--color-alert)] text-glow-alert" : "text-foreground"}`}
        >
          {value}%{critical && " ⚠"}
        </motion.span>
      </div>
      <div className="relative h-2 rounded-full bg-muted/60">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${color}, oklch(1 0 0 / 0.3))`,
            boxShadow: `0 0 ${10 + value / 5}px ${color}`,
          }}
        />
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0"
        />
      </div>
    </div>
  );
}
