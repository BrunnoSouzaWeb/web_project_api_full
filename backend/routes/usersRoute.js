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

import { celebrate, Joi, Segments } from "celebrate";
import validator from "validator";

const router = express.Router();

// Middleware de validação para criar usuários

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    console.log(validator.isURL(value));
    return value;
  }
  return helpers.error("string.uri");
};

const validateUserSignup = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional().min(2).max(30),
    about: Joi.string().optional().min(2).max(30),
    avatar: Joi.string().optional().uri(),
    email: Joi.string().required().custom(validateURL),
    password: Joi.string().required().min(8),
  }),
});

/// AQUI MESMO OS DOIS ABAIXO ???? testar

console.log("dentro do app backend");

console.log("indo chamar o /signup");
//router.post("/signup", createUser);
router.post("/signup", validateUserSignup, createUser);

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
