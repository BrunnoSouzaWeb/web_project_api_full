import express from "express";
import {
  listAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from "../controllers/cardsController.js";

const router = express.Router();

router.get("/cards", listAllCards);

router.post("/cards", createCard);

router.delete("/cards/:cardId", deleteCard);

///router.put("/cards/:cardId/likes", likeCard);

router.put("/cards/likes/:cardId", likeCard);

///router.delete("/cards/:cardId/likes", dislikeCard);

router.delete("/cards/likes/:cardId", dislikeCard);

export default router;
