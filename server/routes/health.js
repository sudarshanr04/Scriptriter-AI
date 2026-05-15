const express = require("express");
const router = express.Router();

// GET /api/health
router.get("/health", (req, res) => {
  res.json({
    success: true,
    status: "alive",
    message: "🏏 ScriptWriter API is running",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
