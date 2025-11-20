import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import verifyIdToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", verifyIdToken, getUserById);
router.put("/:id", updateUser);
router.post("/", createUser);
router.delete("/:id", deleteUser);

export default router;
