import express from "express";
import cors from "cors";
import userRoutes from "../src/routes/userRoutes.js";
import gameRoutes from "../src/routes/gameRoutes.js";
import playSessionRoutes from "../src/routes/playSessionRoutes.js";
import statisticsRoutes from "../src/routes/statisticsRoutes.js";

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "*", // Allow all origins for now
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

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
