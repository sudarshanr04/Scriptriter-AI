const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables FIRST
dotenv.config();

const healthRoute = require("./routes/health");
const liveMatchRoute = require("./routes/liveMatch");
const generateScriptRoute = require("./routes/generateScript");

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Routes ───────────────────────────────────────────
app.use("/api", healthRoute);
app.use("/api", liveMatchRoute);
app.use("/api", generateScriptRoute);

// ─── Centralized Error Handler ────────────────────────
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
});

// ─── Start Server ─────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🏏 ScriptWriter server running on http://localhost:${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});
