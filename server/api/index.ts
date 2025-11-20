import express from "express";
import userRoutes from "../src/routes/userRoutes.js";
import gameRoutes from "../src/routes/gameRoutes.js";
import playSessionRoutes from "../src/routes/playSessionRoutes.js";
import statisticsRoutes from "../src/routes/statisticsRoutes.js";

const app = express();

const CLIENT_ORIGIN =
  "https://game-time-tracker-client-git-auth-israt-jahan-erins-projects.vercel.app";

// Global CORS (first)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", CLIENT_ORIGIN);
  res.setHeader("Vary", "Origin");
  const requested = req.headers["access-control-request-headers"];
  res.setHeader(
    "Access-Control-Allow-Headers",
    requested ? String(requested) : "Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  // No credentials (axios uses withCredentials:false)
  res.setHeader("Access-Control-Max-Age", "86400");
  if (req.method === "OPTIONS") return res.status(204).end();
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

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Not Found", path: req.originalUrl });
});

// Error handler
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Server Error" });
});

export default app;
