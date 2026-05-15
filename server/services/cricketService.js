const axios = require("axios");

const CRICKET_API_BASE = "https://api.cricapi.com/v1";

/**
 * Fetch live match data from Cricket API
 * Returns a clean, lightweight JSON object
 */
async function fetchLiveMatchData() {
  try {
    const apiKey = process.env.CRICKET_API_KEY;

    if (!apiKey) {
      console.warn("⚠️  No CRICKET_API_KEY found — returning mock data");
      return getMockMatchData();
    }

    // Fetch current matches list
    const listRes = await axios.get(`${CRICKET_API_BASE}/currentMatches`, {
      params: { apikey: apiKey, offset: 0 },
      timeout: 10000,
    });

    const matches = listRes.data?.data;

    if (!matches || matches.length === 0) {
      console.warn("⚠️  No live matches found — returning mock data");
      return getMockMatchData();
    }

    // Pick the first live/ongoing match
    const liveMatch =
      matches.find((m) => m.matchStarted && !m.matchEnded) || matches[0];

    // Extract clean data from the match
    const cleanData = extractMatchData(liveMatch);
    return cleanData;
  } catch (err) {
    console.error("❌ Cricket API Error:", err.message);
    console.warn("⚠️  Falling back to mock data");
    return getMockMatchData();
  }
}

/**
 * Extract clean match data from raw API response
 */
function extractMatchData(match) {
  const score = match.score || [];
  const currentInnings = score[score.length - 1] || {};
  const previousInnings = score.length > 1 ? score[0] : null;

  return {
    matchName: match.name || "Unknown Match",
    status: match.status || "In Progress",
    venue: match.venue || "Unknown Venue",
    battingTeam: currentInnings.inning?.split(" ")?.[0] || "Team A",
    bowlingTeam: getOpponentTeam(match, currentInnings),
    score: {
      runs: currentInnings.r ?? 0,
      wickets: currentInnings.w ?? 0,
      overs: currentInnings.o ?? 0,
    },
    target: previousInnings ? (previousInnings.r || 0) + 1 : null,
    striker: extractBatsman(match, 0),
    bowler: extractBowler(match),
    recentBalls: generateRecentBalls(),
    requiredRunRate: calculateRRR(currentInnings, previousInnings),
    currentRunRate: calculateCRR(currentInnings),
    matchStarted: match.matchStarted || false,
    matchEnded: match.matchEnded || false,
  };
}

/**
 * Get opponent team name
 */
function getOpponentTeam(match, currentInnings) {
  const teams = match.teams || [];
  const battingTeam = currentInnings.inning?.split(" ")?.[0];
  return teams.find((t) => !t.startsWith(battingTeam)) || "Team B";
}

/**
 * Extract batsman info (fallback to placeholder)
 */
function extractBatsman(match, index) {
  if (match.bpiData && match.bpiData[index]) {
    return {
      name: match.bpiData[index].name || "Unknown Batsman",
      runs: match.bpiData[index].r || 0,
      balls: match.bpiData[index].b || 0,
    };
  }
  return { name: "Unknown Batsman", runs: 0, balls: 0 };
}

/**
 * Extract bowler info (fallback to placeholder)
 */
function extractBowler(match) {
  const bowlerIndex = match.bpiData ? match.bpiData.length - 1 : -1;
  if (match.bpiData && match.bpiData[bowlerIndex]) {
    return {
      name: match.bpiData[bowlerIndex].name || "Unknown Bowler",
      overs: match.bpiData[bowlerIndex].o || 0,
      wickets: match.bpiData[bowlerIndex].w || 0,
      runs: match.bpiData[bowlerIndex].r || 0,
    };
  }
  return { name: "Unknown Bowler", overs: 0, wickets: 0, runs: 0 };
}

/**
 * Generate simulated recent balls (API often lacks ball-by-ball)
 */
function generateRecentBalls() {
  const outcomes = ["0", "1", "2", "4", "6", "W", "0", "1", "1", "4", "0", "2"];
  const count = 6 + Math.floor(Math.random() * 6);
  const balls = [];
  for (let i = 0; i < count; i++) {
    balls.push(outcomes[Math.floor(Math.random() * outcomes.length)]);
  }
  return balls;
}

/**
 * Calculate Required Run Rate
 */
function calculateRRR(current, previous) {
  if (!previous) return null;
  const target = (previous.r || 0) + 1;
  const runsNeeded = target - (current.r || 0);
  const oversLeft = 20 - (current.o || 0);
  if (oversLeft <= 0) return null;
  return parseFloat((runsNeeded / oversLeft).toFixed(2));
}

/**
 * Calculate Current Run Rate
 */
function calculateCRR(current) {
  const overs = current.o || 0;
  if (overs <= 0) return 0;
  return parseFloat(((current.r || 0) / overs).toFixed(2));
}

/**
 * Mock match data for development / API failure fallback
 */
function getMockMatchData() {
  return {
    matchName: "Mumbai Indians vs Chennai Super Kings, 42nd Match",
    status: "Mumbai Indians need 38 runs in 18 balls",
    venue: "Wankhede Stadium, Mumbai",
    battingTeam: "Mumbai Indians",
    bowlingTeam: "Chennai Super Kings",
    score: { runs: 168, wickets: 5, overs: 17.0 },
    target: 206,
    striker: { name: "Suryakumar Yadav", runs: 72, balls: 38 },
    bowler: { name: "Matheesha Pathirana", overs: 3.0, wickets: 2, runs: 28 },
    recentBalls: ["4", "1", "0", "6", "W", "2", "4", "0", "1", "6"],
    requiredRunRate: 12.67,
    currentRunRate: 9.88,
    matchStarted: true,
    matchEnded: false,
  };
}

module.exports = { fetchLiveMatchData };
