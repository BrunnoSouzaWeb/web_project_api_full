import express from "express";
import {
  listAllUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} from "../controllers/usersController.js";

const router = express.Router();

router.get("/users", listAllUsers);

router.get("/users/:userId", getUserById);

router.post("/users", createUser);

router.patch("/users/me", updateUserProfile);

router.patch("/users/me/avatar", updateUserAvatar);

export default router;
