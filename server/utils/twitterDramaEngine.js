/**
 * TWITTER DRAMA ENGINE
 * Generates fake hashtags, outrage tweets, controversy trends,
 * and meme reactions based on live match context.
 */

function generateTwitterDrama(matchData) {
  const { battingTeam, bowlingTeam, striker, bowler, score, target } = matchData;
  const wickets = score?.wickets ?? 0;
  const runs = score?.runs ?? 0;

  const battingShort = getShortName(battingTeam);
  const bowlingShort = getShortName(bowlingTeam);

  // ─── Trending Hashtags ──────────────────────────────
  const hashtags = shuffleAndPick(
    [
      "#ScriptLeaked",
      "#FixedHai",
      `#JusticeFor${battingShort}`,
      `#${bowlingShort}Exposed`,
      "#IPLisScripted",
      "#BCCIExplain",
      `#${battingShort}vs${bowlingShort}`,
      "#UmpireBlind",
      `#${striker?.name?.split(" ").pop() || "Batsman"}OnFire`,
      "#ThirdUmpireFraud",
      "#WhistlePodu",
      "#PlayBold",
      `#${bowlingShort}Cheating`,
      "#SelectorsExposed",
      "#MIvsCSK",
      "#TweetAndPray",
      `#Drop${bowler?.name?.split(" ").pop() || "Bowler"}`,
    ],
    5
  );

  // ─── Outrage Tweets ──────────────────────────────────
  const outrageTweets = shuffleAndPick(
    [
      `If ${battingTeam} loses this from here, it's 100% scripted. I'm done watching IPL. #FixedHai`,
      `Bro that wide was SO intentional 💀 The bookie literally texted the bowler mid-over`,
      `${striker?.name || "This batsman"} playing like his fantasy team has the opponent's players 🤡`,
      `Why is ${bowler?.name || "the bowler"} still bowling?? My grandmother has better economy rate`,
      `${wickets} wickets down and they send THIS guy?? Script writers getting lazy fr`,
      `The odds literally shifted during the timeout. You can't tell me this isn't fixed.`,
      `${battingTeam} fans right now: 🤡🤡🤡 vs ${bowlingTeam} fans: 😎😎😎`,
      `Imagine paying ₹2000 for a ticket to watch THIS. I want a refund and emotional damages.`,
      `My dog could've played that delivery better and he doesn't even have thumbs`,
      `Just saw the umpire wink at the bowler. That's it. That's the tweet.`,
      `${runs} runs but at what cost? My blood pressure is at 180. Thanks IPL.`,
      `Commentary box is trying SO HARD to act like this isn't pre-decided lmaooo`,
    ],
    4
  );

  // ─── Controversy Trends ─────────────────────────────
  const controversyTrends = shuffleAndPick(
    [
      `🔥 "${battingTeam} bookie WhatsApp chat LEAKED" — 45K tweets`,
      `📈 "BCCI rigged" trending #1 in India`,
      `💣 "DRS is a scam" — fans furious after overturned decision`,
      `🚨 "${bowler?.name || "Bowler"} spot fixing" — unverified claims going viral`,
      `😱 "Stadium cameras caught suspicious signals" — Twitter detectives activate`,
      `📱 "Betting app crashed" right after that six — coincidence? Twitter says NO`,
      `🎬 "IPL scriptwriters deserve an Oscar" — trending worldwide`,
    ],
    3
  );

  // ─── Meme Reactions ─────────────────────────────────
  const memeReactions = shuffleAndPick(
    [
      `${battingTeam} fans celebrating after 1 boundary: 📈🚀 / After next wicket: 📉💀`,
      `IPL Script Writers → Bollywood Script Writers pipeline is REAL`,
      `Me pretending I understand cricket to fit in with the group chat 🧍‍♂️`,
      `${bowlingTeam} captain right now: "This wasn't in the rehearsal"`,
      `"We'll bowl first" — Famous last words, Chapter ${Math.floor(Math.random() * 99) + 1}`,
      `POV: You bet ₹500 on ${battingTeam} and now you're stress-eating samosas at 2am`,
      `My heart rate during this match 📊: ↗️↘️↗️↗️↘️↘️↗️💀`,
      `Commentator: "What a match!" / The match: 😐😐😐😐😐6😐😐W😐`,
    ],
    3
  );

  return {
    hashtags,
    outrageTweets,
    controversyTrends,
    memeReactions,
    dramaLevel: getDramaLevel(wickets, target, runs),
  };
}

/**
 * Get short team name (first word or abbreviation)
 */
function getShortName(teamName) {
  if (!teamName) return "Team";
  const abbreviations = {
    "Mumbai Indians": "MI",
    "Chennai Super Kings": "CSK",
    "Royal Challengers Bengaluru": "RCB",
    "Royal Challengers Bangalore": "RCB",
    "Kolkata Knight Riders": "KKR",
    "Delhi Capitals": "DC",
    "Rajasthan Royals": "RR",
    "Sunrisers Hyderabad": "SRH",
    "Punjab Kings": "PBKS",
    "Gujarat Titans": "GT",
    "Lucknow Super Giants": "LSG",
  };
  return abbreviations[teamName] || teamName.split(" ")[0];
}

/**
 * Shuffle array and pick N random items
 */
function shuffleAndPick(arr, count) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Determine overall drama level
 */
function getDramaLevel(wickets, target, runs) {
  if (wickets >= 6) return "🔴 ABSOLUTE CARNAGE";
  if (target && target - runs < 20) return "🔴 NAIL-BITER";
  if (wickets >= 4) return "🟠 HIGH DRAMA";
  if (target && target - runs < 50) return "🟡 TENSION BUILDING";
  return "🟢 SLOW BURN";
}

module.exports = { generateTwitterDrama };
