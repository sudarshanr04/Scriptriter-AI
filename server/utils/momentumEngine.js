/**
 * MOMENTUM ENGINE
 * Generates momentum score, fake betting odds, crowd rage, and script intensity
 * based on live match data.
 */

function generateMomentum(matchData) {
  const { score, target, recentBalls, requiredRunRate, currentRunRate } = matchData;
  const wickets = score?.wickets ?? 0;
  const overs = score?.overs ?? 0;
  const runs = score?.runs ?? 0;

  // ─── Count boundaries & wickets in recent balls ──────
  const boundaries = recentBalls.filter((b) => b === "4" || b === "6").length;
  const recentWickets = recentBalls.filter((b) => b === "W").length;
  const dots = recentBalls.filter((b) => b === "0").length;

  // ─── Momentum Score (0–100) ──────────────────────────
  let momentum = 50; // neutral start

  // Boundaries boost momentum
  momentum += boundaries * 8;

  // Wickets kill momentum
  momentum -= recentWickets * 15;
  momentum -= wickets * 3;

  // Dots are pressure
  momentum -= dots * 2;

  // Run rate comparison
  if (requiredRunRate && currentRunRate) {
    if (currentRunRate >= requiredRunRate) {
      momentum += 10; // batting team in control
    } else {
      momentum -= (requiredRunRate - currentRunRate) * 3;
    }
  }

  // Death overs pressure
  if (overs >= 15) {
    momentum += boundaries * 3; // boundaries matter more in death
    momentum -= dots * 3; // dots hurt more in death
  }

  // Clamp to 0–100
  momentum = Math.max(0, Math.min(100, Math.round(momentum)));

  // ─── Fake Betting Odds ───────────────────────────────
  const battingOdds = Math.max(10, Math.min(90, momentum));
  const bowlingOdds = 100 - battingOdds;

  // Simulate odds shift (before → after recent balls)
  const shiftAmount = boundaries * 5 - recentWickets * 12 + (Math.random() * 6 - 3);
  const beforeBattingOdds = Math.max(10, Math.min(90, Math.round(battingOdds - shiftAmount)));
  const beforeBowlingOdds = 100 - beforeBattingOdds;

  // ─── Crowd Rage Level ───────────────────────────────
  let crowdRage = "Calm";
  if (momentum > 80) crowdRage = "🔥 ABSOLUTE SCENES";
  else if (momentum > 65) crowdRage = "🎉 Electric Atmosphere";
  else if (momentum > 50) crowdRage = "😤 Building Tension";
  else if (momentum > 35) crowdRage = "😰 Nervous Energy";
  else if (momentum > 20) crowdRage = "😡 Frustration Boiling";
  else crowdRage = "💀 Complete Meltdown";

  // ─── Script Intensity ───────────────────────────────
  let scriptIntensity = "Low";
  if (momentum > 75 || momentum < 25) scriptIntensity = "🔴 MAXIMUM DRAMA";
  else if (momentum > 60 || momentum < 35) scriptIntensity = "🟠 High Tension";
  else scriptIntensity = "🟡 Simmering";

  // ─── Pressure Moments ──────────────────────────────
  const pressureMoments = [];
  if (wickets >= 4) pressureMoments.push("Batting collapse alert!");
  if (requiredRunRate > 12) pressureMoments.push("Required rate above 12 — panic zone");
  if (boundaries >= 3) pressureMoments.push("Boundary barrage — bowler under siege");
  if (recentWickets >= 2) pressureMoments.push("Two quick wickets — game changer!");
  if (overs >= 18 && target) pressureMoments.push("Death overs — anything can happen");
  if (dots >= 4) pressureMoments.push("Dot ball pressure mounting");

  return {
    momentumScore: momentum,
    momentumLabel: getMomentumLabel(momentum),
    bettingOdds: {
      before: { batting: beforeBattingOdds, bowling: beforeBowlingOdds },
      after: { batting: battingOdds, bowling: bowlingOdds },
      shift: `${beforeBattingOdds}-${beforeBowlingOdds} → ${battingOdds}-${bowlingOdds}`,
    },
    crowdRage,
    scriptIntensity,
    pressureMoments,
  };
}

/**
 * Human-readable momentum label
 */
function getMomentumLabel(score) {
  if (score >= 80) return "Batting team DOMINATING";
  if (score >= 60) return "Batting team in control";
  if (score >= 45) return "Evenly poised";
  if (score >= 30) return "Bowling team gaining edge";
  return "Bowling team DOMINATING";
}

module.exports = { generateMomentum };
