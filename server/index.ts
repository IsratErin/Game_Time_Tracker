import express from "express";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes.js";
import gameRoutes from "./src/routes/gameRoutes.js";
import playSessionRoutes from "./src/routes/playSessionRoutes.js";
import statisticsRoutes from "./src/routes/statisticsRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://client-gametimetracker.vercel.app",
    ],
    credentials: false, // no cookie support
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400,
  })
);

app.options("*", cors());

app.use(express.json());

app.use("/users", userRoutes);
app.use("/games", gameRoutes);
app.use("/sessions", playSessionRoutes);
app.use("/statistics", statisticsRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Game Time Tracker API!");
});

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
  });
}

export default app;
