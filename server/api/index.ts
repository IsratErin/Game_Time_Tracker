import express from "express";
import userRoutes from "../src/routes/userRoutes.js";
import gameRoutes from "../src/routes/gameRoutes.js";
import playSessionRoutes from "../src/routes/playSessionRoutes.js";
import statisticsRoutes from "../src/routes/statisticsRoutes.js";

const app = express();

// Allowed origin (no credentials -> can use wildcard; if you later set withCredentials:true, replace "*" with exact origin)
const ALLOWED_ORIGIN =
  "https://game-time-tracker-client-git-auth-israt-jahan-erins-projects.vercel.app";

// Core CORS + preflight FIRST
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  res.setHeader("Vary", "Origin"); // good practice
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // No credentials since axios uses withCredentials:false
  res.setHeader("Access-Control-Max-Age", "86400");
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  next();
});

app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/games", gameRoutes);
app.use("/sessions", playSessionRoutes);
app.use("/statistics", statisticsRoutes);

app.get("/", (_req, res) => {
  res.send("Welcome to the Game Time Tracker API!");
});

// 404 with CORS headers still present
app.use((req, res) => {
  res.status(404).json({ error: "Not Found", path: req.originalUrl });
});

// Error handler ensuring CORS headers
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error("Server error:", err);
  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  res.status(500).json({ error: "Server Error", detail: err?.message });
});

export default app;
