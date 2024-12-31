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

console.log("dentro do app backend");
console.log("indo chamar o /signup");
router.post("/signup", createUser);
console.log("indo chamar o /signin");
router.post("/signin", login);
console.log("indo chamar o auth");
router.use(auth);
console.log("depois chamar o auth");

router.get("/users", listAllUsers);

///router.get("/users/:userId", getUserById);4
/// testar este
console.log("indo chamar o /users/me");
router.get("/users/me", getUserById);

//router.post("/users", createUser);

router.patch("/users/me", updateUserProfile);

router.patch("/users/me/avatar", updateUserAvatar);

export default router;
