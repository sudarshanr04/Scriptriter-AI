const axios = require("axios");

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

/**
 * Call Gemini with automatic API key fallback
 * Tries Key 1 first → falls back to Key 2 on failure
 */
async function callGemini(prompt) {
  const keys = [
    { key: process.env.GEMINI_API_KEY_1, label: "Gemini Key 1" },
    { key: process.env.GEMINI_API_KEY_2, label: "Gemini Key 2" },
  ].filter((k) => k.key); // remove any undefined keys

  if (keys.length === 0) {
    console.warn("⚠️  No GEMINI_API_KEY found — returning fallback script");
    return getFallbackScript();
  }

  for (let i = 0; i < keys.length; i++) {
    const { key, label } = keys[i];

    try {
      console.log(`🔑 Using ${label}...`);

      const response = await axios.post(
        `${GEMINI_API_URL}?key=${key}`,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 30000,
        }
      );

      // Extract the generated text
      const generatedText =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!generatedText) {
        console.warn(`⚠️  ${label} returned empty response`);
        // Treat empty response as a failure — try next key
        continue;
      }

      console.log(`✅ ${label} succeeded`);
      return generatedText;
    } catch (err) {
      const status = err.response?.status;
      const errorMsg = err.response?.data?.error?.message || err.message;

      console.error(`❌ ${label} failed (${status || "network"}): ${errorMsg}`);

      // If this is the last key, don't log fallback — we'll handle below
      if (i < keys.length - 1) {
        console.log(`🔄 Falling back to ${keys[i + 1].label}...`);
      }
    }
  }

  // Both keys failed
  console.warn("⚠️  All Gemini keys exhausted — returning fallback script");
  return getFallbackScript();
}

/**
 * Fallback script when Gemini is unavailable
 */
function getFallbackScript() {
  return `🏏 OVER 18 — THE TURNING POINT

The stadium goes absolutely SILENT as Pathirana runs in. Short ball, PULLED! 
SIX over deep midwicket! The Wankhede ERUPTS! 

Twitter is already losing its mind — #ScriptLeaked is trending number 1. 
The betting odds just flipped from 75-25 to 52-48 in THREE deliveries. 

Next ball — yorker, dug out, they steal a single. Smart cricket? Or is this 
all part of the SCRIPT? The conspiracy theorists are having a field day.

🏏 OVER 19 — CHAOS UNLEASHED

Wide! The bowler's nerve is cracking. Free hit coming up. 
SIX! Straight down the ground! The required rate drops below 10. 
Timeout called — but who's really pulling the strings here?

The crowd is chanting. The dugout is pacing. Social media has already 
written three different endings to this match.

🏏 OVER 20 — THE FINAL ACT

12 needed off the last over. This is what dreams are made of. Or nightmares. 
Depends on which team you put your money on.

Four off the first ball. Dot ball. The agony. Single. 
SIX NEEDED OFF THE LAST BALL.

The bowler runs in. The nation holds its breath...

[To be continued by the REAL match — or was it all scripted anyway?]`;
}

module.exports = { callGemini };
