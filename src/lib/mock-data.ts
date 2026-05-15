export const TEAMS = [
  { id: "MI", name: "Mumbai Indians", short: "MI", color: "#0a4cb6" },
  { id: "CSK", name: "Chennai Super Kings", short: "CSK", color: "#f7b500" },
  { id: "RCB", name: "Royal Challengers", short: "RCB", color: "#d10a11" },
  { id: "KKR", name: "Kolkata Knight Riders", short: "KKR", color: "#3a225d" },
  { id: "DC", name: "Delhi Capitals", short: "DC", color: "#1a4ea8" },
  { id: "SRH", name: "Sunrisers Hyderabad", short: "SRH", color: "#fb6413" },
  { id: "PBKS", name: "Punjab Kings", short: "PBKS", color: "#a71930" },
  { id: "RR", name: "Rajasthan Royals", short: "RR", color: "#ea1a85" },
  { id: "GT", name: "Gujarat Titans", short: "GT", color: "#1c2956" },
  { id: "LSG", name: "Lucknow Super Giants", short: "LSG", color: "#0d4d8a" },
];

export const TWEET_AVATARS = ["🦁", "👑", "🤡", "🔥", "💀", "🐐", "🧠", "🥶", "🎬", "🚨", "🫠", "🎯", "👀", "🪦"];

export const TWEET_NAMES = [
  "@scriptleaks", "@cricketcinema", "@noballgod", "@fixedhai_official",
  "@chasemaster", "@umpirewhomst", "@dhonibhakt", "@kohliarmy",
  "@gambawalla", "@oddswatcher", "@meltdownraja", "@stadiumcam",
  "@pitchreport", "@dotballgang",
];

export const HASHTAGS = [
  "#ScriptLeaked", "#FixedHai", "#JusticeForRCB", "#RiggedButCinema",
  "#NoBallUniverse", "#ScriptwritersAreCooking", "#AbsoluteCinema",
  "#OddsExposed", "#CrowdMeltdown",
];

export const TICKER_ITEMS = [
  "ODDS SWING DETECTED",
  "TWITTER RAGE SPIKING",
  "SCRIPT ENERGY CRITICAL",
  "CROWD MELTDOWN RISING",
  "CONTROVERSY INDEX ACTIVE",
  "BOOKIES ON RED ALERT",
  "DRAMA INDEX OFF THE CHARTS",
  "UMPIRE SIGNAL DELAYED",
];

export const GENERATION_STATUSES = [
  "Reading match momentum...",
  "Tracking betting panic...",
  "Monitoring Twitter rage...",
  "Calibrating umpire bias engine...",
  "Finalizing script arc...",
];

const QUOTES = [
  "This cannot be real.",
  "The scriptwriters are cooking.",
  "Twitter has lost control.",
  "Absolute cinema.",
  "The bookies just fainted.",
  "Stadium just inhaled.",
  "Commentary box went silent.",
  "We are watching a Netflix drama.",
];

const EVENTS_BANK = [
  "Mystery no-ball overturned after a 4-minute huddle nobody can explain.",
  "Bowler suddenly forgets how to bowl. Misfields his own delivery.",
  "Free hit smashed for six. Crowd screams 'SCRIPTED' in unison.",
  "Third umpire takes a phone call mid-decision. Phone is on speaker.",
  "Captain changes field 3 times in one over. Field looks identical each time.",
  "Wide ball that wasn't wide. Then wide ball that was. Then both, somehow.",
  "DRS unavailable. Reason: 'technical issue'. Suspicious silence on broadcast.",
  "Batter slips. Ball deflects for four. Crowd loses its mind.",
  "Powerplay miscounted. Two extra balls bowled. Nobody acknowledges it.",
  "Boundary cushion intercepts the ball, ruled six. Physics applies for fun.",
  "Catch dropped at long-on. Camera cuts away mid-fall. Returns to celebration.",
  "Strategic timeout extended by 4 minutes. Coach holding a folded paper.",
  "Stump mic captures: 'Bhai aaj toh script alag hai.' Broadcast goes mute.",
  "Commentator says 'this is scripted' as a joke. Producer cuts feed.",
  "LBW given. Replay shows ball hitting the bat first. Decision stands.",
  "Run out tie. Soft signal: out. Soft signal: not out. Soft signal: tea break.",
];

const EMPTY_TEASERS = [
  "The scriptwriters are awaiting your cue...",
  "Press Generate Chaos to leak the next 3 overs.",
  "Drama Level is dangerously low. The audience is bored.",
];

function pick<T>(arr: T[], n = 1): T[] {
  const copy = [...arr];
  const out: T[] = [];
  for (let i = 0; i < n && copy.length; i++) {
    out.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
  }
  return out;
}

export interface MatchState {
  battingTeam: string;
  bowlingTeam: string;
  score: number;
  wickets: number;
  overs: number;
  target: number;
  batter: string;
  bowler: string;
  drama: number;
  rage: number;
  energy: number;
  controversy: number;
}

export interface OverScript {
  over: number;
  events: string[];
  quote: string;
  runs: number;
  wickets: number;
}

export function generateScript(state: MatchState): OverScript[] {
  const startOver = Math.min(20, Math.floor(state.overs) + 1);
  const intensity = (state.drama + state.energy + state.controversy + state.rage) / 4;
  const eventsPerOver = intensity > 70 ? 4 : 3;

  return [0, 1, 2].map((i) => {
    const over = Math.min(20, startOver + i);
    const events = pick(EVENTS_BANK, eventsPerOver);
    const quote = pick(QUOTES, 1)[0];
    const runs = Math.floor(6 + Math.random() * (intensity / 5));
    const wkts = Math.random() > 0.6 ? (Math.random() > 0.5 ? 1 : 2) : 0;
    return { over, events, quote, runs, wickets: wkts };
  });
}

export function emptyTeaser() {
  return EMPTY_TEASERS[Math.floor(Math.random() * EMPTY_TEASERS.length)];
}

export interface FakeTweet {
  id: string;
  avatar: string;
  name: string;
  text: string;
  likes: number;
  rage: number;
  hot: boolean;
}

const TWEET_TEMPLATES = [
  "this match is more scripted than my last situationship 💀",
  "the bookies WROTE this over with a fountain pen",
  "absolute cinema. someone alert the academy 🎬",
  "third umpire on speaker phone with the producer fr",
  "I am LITERALLY going to throw my remote into the Yamuna",
  "tell me this isn't fixed without telling me this isn't fixed",
  "the script just leaked. no ball next ball, calling it now 🚨",
  "if my team had this scriptwriter we'd be 5x champions",
  "Twitter's not ready for what's about to happen in over 20",
  "Drama meter 100%. Logic meter 0%. Vibes meter ∞",
];

export function generateTweets(intensity: number, count = 8): FakeTweet[] {
  return Array.from({ length: count }, (_, i) => {
    const rage = Math.min(100, intensity + (Math.random() * 30 - 15));
    return {
      id: `t-${Date.now()}-${i}`,
      avatar: TWEET_AVATARS[Math.floor(Math.random() * TWEET_AVATARS.length)],
      name: TWEET_NAMES[Math.floor(Math.random() * TWEET_NAMES.length)],
      text: TWEET_TEMPLATES[Math.floor(Math.random() * TWEET_TEMPLATES.length)],
      likes: Math.floor(50 + Math.random() * 9000),
      rage,
      hot: rage > 75,
    };
  });
}

export function generateOdds(intensity: number) {
  const before = +(1.6 + Math.random() * 1.5).toFixed(2);
  const swing = (intensity / 100) * (Math.random() > 0.5 ? 1 : -1) * (0.4 + Math.random() * 0.8);
  const after = +Math.max(1.05, before + swing).toFixed(2);
  const series = Array.from({ length: 24 }, (_, i) => {
    const t = i / 23;
    return +(before + (after - before) * t + (Math.random() - 0.5) * 0.15).toFixed(2);
  });
  return { before, after, series, volatility: Math.abs(swing) };
}
