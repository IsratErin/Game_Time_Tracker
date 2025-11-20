import express from "express";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes.js";
import gameRoutes from "./src/routes/gameRoutes.js";
import playSessionRoutes from "./src/routes/playSessionRoutes.js";
import statisticsRoutes from "./src/routes/statisticsRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Allow requests from both local and deployed clients
const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://game-time-tracker-client-git-auth-israt-jahan-erins-projects.vercel.app", // deployed client
];

//CORS configuration with OPTIONS support
app.use(
  cors({
    origin: (origin, callback) => {
      //requests with no origin (like mobile apps, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("CORS blocked origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400, // Cache preflight for 24 hours
  })
);

// preflight OPTIONS requests
app.options("*", cors());

app.use(express.json());

//  API routes
app.use("/users", userRoutes);
app.use("/games", gameRoutes);
app.use("/sessions", playSessionRoutes);
app.use("/statistics", statisticsRoutes);

// Default route for the root path
app.get("/", (req, res) => {
  res.send("Welcome to the Game Time Tracker API!");
});

// Only start the server if not in production (Vercel will handle this)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
}

//for Vercel serverless functions
export default app;
