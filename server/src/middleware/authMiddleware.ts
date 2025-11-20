import admin from "../firebase/firebaseAdmin.js";
import type { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

const CLIENT_ORIGIN =
  "https://game-time-tracker-client-git-auth-israt-jahan-erins-projects.vercel.app";

const verifyIdToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // Ensure CORS header even on auth failure
  res.setHeader("Access-Control-Allow-Origin", CLIENT_ORIGIN);

  if (req.method === "OPTIONS") {
    return next(); // preflight already handled, do not auth
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default verifyIdToken;
