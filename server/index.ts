import express from "express";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes.js";
import gameRoutes from "./src/routes/gameRoutes.js";
import playSessionRoutes from "./src/routes/playSessionRoutes.js";
import statisticsRoutes from "./src/routes/statisticsRoutes.js";
import verifyIdToken from "./src/middleware/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS to allow requests from both local and deployed clients
const corsOptions = {
  // Local development client
  origin: "https://client-gametimetracker.vercel.app", // Deployed client
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true, // Allow cookies or authentication headers
};

app.use(cors(corsOptions));
app.use(express.json());

// Handle preflight requests
app.options("*", cors(corsOptions));

// Routes
app.use("/users", verifyIdToken, userRoutes);
app.use("/games", gameRoutes);
app.use("/sessions", playSessionRoutes);
app.use("/statistics", statisticsRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
