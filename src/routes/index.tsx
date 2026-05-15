import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Hero } from "@/components/site/Hero";
import { LiveHeader, Ticker } from "@/components/site/LiveHeader";
import { ControlRoom } from "@/components/site/ControlRoom";
import { ScriptFeed } from "@/components/site/ScriptFeed";
import { TwitterMeltdown } from "@/components/site/TwitterMeltdown";
import { OddsCard } from "@/components/site/OddsCard";
import {
  generateOdds,
  generateScript,
  generateTweets,
  GENERATION_STATUSES,
  type FakeTweet,
  type MatchState,
  type OverScript,
} from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "The Scriptwriter's Revenge — AI IPL Conspiracy Drama" },
      {
        name: "description",
        content:
          "Cinematic IPL satire. Generate fake next-3-overs drama from match momentum, betting chaos, and Twitter meltdowns. Fictional satire — not real.",
      },
      { property: "og:title", content: "The Scriptwriter's Revenge" },
      { property: "og:description", content: "AI-generated IPL conspiracy drama. Pure satire." },
    ],
  }),
});

const initialState: MatchState = {
  battingTeam: "RCB",
  bowlingTeam: "CSK",
  score: 142,
  wickets: 4,
  overs: 17.2,
  target: 198,
  batter: "V. Kohlirat",
  bowler: "M.S. Dhoneon",
  drama: 78,
  rage: 64,
  energy: 82,
  controversy: 71,
};

function Index() {
  const [state, setState] = useState<MatchState>(initialState);
  const [generating, setGenerating] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);
  const [script, setScript] = useState<OverScript[] | null>(null);
  const [tweets, setTweets] = useState<FakeTweet[]>(() => generateTweets(70, 10));
  const [odds, setOdds] = useState(() => generateOdds(70));
  const dashRef = useRef<HTMLDivElement>(null);

  const intensity = (state.drama + state.rage + state.energy + state.controversy) / 4;

  const scrollToDash = () => {
    dashRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleGenerate = () => {
    if (generating) return;
    setGenerating(true);
    setScript(null);
    setStatusIndex(0);
    let i = 0;
    const id = setInterval(() => {
      i++;
      if (i >= GENERATION_STATUSES.length) {
        clearInterval(id);
        setScript(generateScript(state));
        setTweets(generateTweets(intensity, 10));
        setOdds(generateOdds(intensity));
        setGenerating(false);
      } else {
        setStatusIndex(i);
      }
    }, 700);
  };

  // Subtle live tweet refresh
  useEffect(() => {
    const id = setInterval(() => {
      setTweets((prev) => {
        const next = generateTweets(intensity, 1);
        return [next[0], ...prev.slice(0, 11)];
      });
    }, 8000);
    return () => clearInterval(id);
  }, [intensity]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <LiveHeader />
      <Ticker />

      <Hero onStart={scrollToDash} />

      <Ticker />

      <main ref={dashRef} className="relative z-10 mx-auto max-w-[1600px] px-4 py-10 md:px-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-tech)]">
              Conspiracy Command Center
            </div>
            <h2 className="mt-2 font-display text-3xl font-black uppercase tracking-tight md:text-5xl">
              Cook the next <span className="text-primary text-glow-drama">3 overs</span>.
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Tweak the match. Crank the drama. Press the big red button. The scriptwriters
              do the rest. (None of this is real, obviously.)
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { k: "Drama", v: state.drama, c: "var(--color-drama)" },
              { k: "Rage", v: state.rage, c: "var(--color-alert)" },
              { k: "Energy", v: state.energy, c: "var(--color-tech)" },
              { k: "Chaos", v: Math.round(intensity), c: "var(--color-drama)" },
            ].map((s) => (
              <div key={s.k} className="glass min-w-[90px] rounded-lg px-3 py-2 text-center">
                <div className="font-display text-xl font-bold" style={{ color: s.c }}>{s.v}</div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{s.k}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <ControlRoom state={state} setState={setState} onGenerate={handleGenerate} generating={generating} />
            </div>
          </div>
          <div className="lg:col-span-6 space-y-6">
            <ScriptFeed generating={generating} script={script} statusIndex={statusIndex} />
            <OddsCard {...odds} />
          </div>
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <TwitterMeltdown tweets={tweets} intensity={intensity} />
            </div>
          </div>
        </div>

        <footer className="mt-16 border-t border-border/50 pt-8 text-center">
          <div className="chip mx-auto border-primary/40 bg-primary/10 text-primary">
            Fictional Satire — No Real Cricket Was Predicted
          </div>
          <p className="mx-auto mt-4 max-w-xl text-xs text-muted-foreground">
            The Scriptwriter's Revenge is a parody entertainment product. All overs, tweets,
            odds, players, and meltdowns are fictional, generated for comedy. Not betting
            advice. Not real prediction. Pure cinema.
          </p>
        </footer>
      </main>

      {/* Mobile sticky generate */}
      <div className="fixed bottom-4 left-4 right-4 z-30 lg:hidden">
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="w-full rounded-xl bg-[var(--gradient-drama)] px-5 py-4 font-display text-sm font-bold uppercase tracking-[0.2em] text-white shadow-[var(--shadow-glow-drama)] disabled:opacity-60"
        >
          {generating ? "Cooking..." : "Generate Chaos"}
        </button>
      </div>
    </div>
  );
}
