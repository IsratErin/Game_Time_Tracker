import admin from "../firebase/firebaseAdmin.js";
import type { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

const verifyIdToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("No token provided");
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    console.error("Invalid token format");
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
