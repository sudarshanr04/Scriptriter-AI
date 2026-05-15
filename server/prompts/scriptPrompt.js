/**
 * Build the Gemini prompt for dramatic script generation
 *
 * Takes in live match data, momentum analysis, and Twitter drama
 * to create a rich, context-aware prompt for Gemini.
 */

function buildScriptPrompt(matchData, momentum, twitterDrama) {
  return `
You are an elite IPL scriptwriter, sports documentary narrator, and Twitter conspiracy analyst rolled into one. Your job is to write the most DRAMATIC, ENTERTAINING, and UNHINGED fictional script for the next 3 overs of this cricket match.

═══════════════════════════════════════
📊 LIVE MATCH SITUATION
═══════════════════════════════════════
Match: ${matchData.matchName}
Venue: ${matchData.venue}
Status: ${matchData.status}

Batting: ${matchData.battingTeam}
Score: ${matchData.score.runs}/${matchData.score.wickets} (${matchData.score.overs} overs)
Target: ${matchData.target || "First innings — setting the total"}

Striker: ${matchData.striker?.name || "Unknown"} — ${matchData.striker?.runs || 0}(${matchData.striker?.balls || 0})
Bowler: ${matchData.bowler?.name || "Unknown"} — ${matchData.bowler?.wickets || 0}/${matchData.bowler?.runs || 0} (${matchData.bowler?.overs || 0} ov)

Current Run Rate: ${matchData.currentRunRate}
Required Run Rate: ${matchData.requiredRunRate || "N/A"}
Recent Balls: ${matchData.recentBalls.join(", ")}

═══════════════════════════════════════
🔥 MOMENTUM ANALYSIS
═══════════════════════════════════════
Momentum Score: ${momentum.momentumScore}/100 — ${momentum.momentumLabel}
Crowd Rage: ${momentum.crowdRage}
Script Intensity: ${momentum.scriptIntensity}

Betting Odds Shift: ${momentum.bettingOdds.shift}
  Before: ${matchData.battingTeam} ${momentum.bettingOdds.before.batting}% vs ${matchData.bowlingTeam} ${momentum.bettingOdds.before.bowling}%
  After:  ${matchData.battingTeam} ${momentum.bettingOdds.after.batting}% vs ${matchData.bowlingTeam} ${momentum.bettingOdds.after.bowling}%

Pressure Moments:
${momentum.pressureMoments.map((p) => `• ${p}`).join("\n") || "• None detected"}

═══════════════════════════════════════
🐦 TWITTER DRAMA (FICTIONAL)
═══════════════════════════════════════
Trending Hashtags: ${twitterDrama.hashtags.join("  ")}
Drama Level: ${twitterDrama.dramaLevel}

Outrage Tweets:
${twitterDrama.outrageTweets.map((t) => `• "${t}"`).join("\n")}

Controversy Trends:
${twitterDrama.controversyTrends.map((c) => `• ${c}`).join("\n")}

Meme Reactions:
${twitterDrama.memeReactions.map((m) => `• ${m}`).join("\n")}

═══════════════════════════════════════
🎬 YOUR MISSION
═══════════════════════════════════════

Write a DRAMATIC fictional script for the NEXT 3 OVERS. Include:

1. **Ball-by-ball commentary** — Write like an IPL broadcaster on steroids. Every delivery should feel like the last ball of a World Cup final. Use dramatic pauses, exclamations, and raw emotion.

2. **Betting Panic Updates** — After key moments, show how the fictional betting odds are swinging wildly. Show the bookies sweating. Show the odds flipping.

3. **Twitter Meltdown** — Weave in fictional tweets, hashtag trends, and conspiracy theories from "fans" reacting in real-time. Make them unhinged and hilarious.

4. **Crowd & Dugout Reactions** — Describe the stadium atmosphere, the captain's face, the coach pacing, the fans crying/celebrating.

5. **Controversy Moments** — Include at least one controversial umpiring decision, a sus celebration, or a "caught on camera" moment that sends Twitter into overdrive.

FORMAT YOUR RESPONSE AS:

🏏 OVER [NUMBER] — [DRAMATIC TITLE]
[Ball-by-ball content with commentary, reactions, betting odds, tweets]

Keep it:
- Entertaining and OVER THE TOP dramatic
- Written like a mix of IPL broadcast + Netflix sports documentary + Twitter doomscrolling
- Funny, chaotic, and conspiracy-flavored
- PG-13 (no actual slurs or hate, just cricket rage)

DO NOT include any disclaimers. Just write pure entertainment.
`.trim();
}

module.exports = { buildScriptPrompt };
