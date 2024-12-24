import card from "../models/card.js";
import { handleErrorResponse } from "../utils/errorHandler.js";

export const listAllCards = (req, res) => {
  card
    .find()
    .then((cards) => {
      res.status(200).json(cards);
    })
    .catch((err) => {
      handleErrorResponse(err, res, "card");
    });
};

export const createCard = (req, res) => {
  const { name, link } = req.body;

  card
    .create({ name, link, owner: req.user._id })
    .then((newCard) => {
      res.status(201).json(newCard);
    })
    .catch((err) => {
      handleErrorResponse(err, res, "card");
    });
};

export const deleteCard = (req, res) => {
  const { cardId } = req.params.cardId;
  card
    .findByIdAndDelete(cardId)
    .orFail()
    .then((cardData) => {
      res.status(200).json(cardData);
    })
    .catch((err) => {
      handleErrorResponse(err, res, "card");
    });
};

export const likeCard = (req, res) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((cardData) => {
      res.status(200).json(cardData);
    })
    .catch((err) => {
      handleErrorResponse(err, res, "card");
    });
};

export const dislikeCard = (req, res) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((cardData) => {
      res.status(200).json(cardData);
    })
    .catch((err) => {
      handleErrorResponse(err, res, "card");
    });
};
