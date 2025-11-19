import express from "express";
import userRoutes from "../src/routes/userRoutes.js";
import gameRoutes from "../src/routes/gameRoutes.js";
import playSessionRoutes from "../src/routes/playSessionRoutes.js";
import statisticsRoutes from "../src/routes/statisticsRoutes.js";

const app = express();

// Set CORS headers on ALL responses
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Max-Age", "86400");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// API routes
app.use("/users", userRoutes);
app.use("/games", gameRoutes);
app.use("/sessions", playSessionRoutes);
app.use("/statistics", statisticsRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Game Time Tracker API!");
});

export default app;
