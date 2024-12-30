import express from "express";
import {
  listAllUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
} from "../controllers/usersController.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

/// AQUI MESMO OS DOIS ABAIXO ???? testar
router.post("/signup", createUser);
router.post("/signin", login);
router.use(auth);

router.get("/users", listAllUsers);

///router.get("/users/:userId", getUserById);4
/// testar este
router.get("/users/me", getUserById);

//router.post("/users", createUser);

router.patch("/users/me", updateUserProfile);

router.patch("/users/me/avatar", updateUserAvatar);

export default router;
