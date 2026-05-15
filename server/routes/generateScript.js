const express = require("express");
const router = express.Router();
const { fetchLiveMatchData } = require("../services/cricketService");
const { generateMomentum } = require("../utils/momentumEngine");
const { generateTwitterDrama } = require("../utils/twitterDramaEngine");
const { callGemini } = require("../services/geminiService");
const { buildScriptPrompt } = require("../prompts/scriptPrompt");

// POST /api/generate-script
router.post("/generate-script", async (req, res, next) => {
  try {
    // 1. Fetch live match data
    const matchData = await fetchLiveMatchData();

    // 2. Generate momentum analysis
    const momentum = generateMomentum(matchData);

    // 3. Generate fake Twitter drama
    const twitterDrama = generateTwitterDrama(matchData);

    // 4. Build the Gemini prompt
    const prompt = buildScriptPrompt(matchData, momentum, twitterDrama);

    // 5. Call Gemini for script generation
    const script = await callGemini(prompt);

    // 6. Send everything back
    res.json({
      success: true,
      data: {
        match: matchData,
        momentum,
        twitterDrama,
        script,
      },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
