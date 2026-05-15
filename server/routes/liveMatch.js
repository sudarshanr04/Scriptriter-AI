const express = require("express");
const router = express.Router();
const { fetchLiveMatchData } = require("../services/cricketService");

// GET /api/live-match
router.get("/live-match", async (req, res, next) => {
  try {
    const matchData = await fetchLiveMatchData();
    res.json({ success: true, data: matchData });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
