import express from "express";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes.js";
import gameRoutes from "./src/routes/gameRoutes.js";
import playSessionRoutes from "./src/routes/playSessionRoutes.js";
import statisticsRoutes from "./src/routes/statisticsRoutes.js";
import verifyIdToken from "./src/middleware/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/users", verifyIdToken, userRoutes);
app.use("/games", gameRoutes);
app.use("/sessions", playSessionRoutes);
app.use("/statistics", statisticsRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
