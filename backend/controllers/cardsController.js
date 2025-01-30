import card from "../models/card.js";

export const listAllCards = (req, res, next) => {
  card
    .find()
    .then((cards) => {
      res.status(200).json(cards);
    })
    .catch((err) => {
      next(err);
    });
};

export const createCard = (req, res, next) => {
  const { name, link } = req.body;

  if (!name || !link || !req.user._id) {
    const error = new Error("Dados inválidos");
    error.statusCode = 400;
    throw error;
  }

  card
    .create({ name, link, owner: req.user._id })
    .then((newCard) => {
      res.status(201).json(newCard);
    })
    .catch((err) => {
      next(err);
    });
};

export const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  card
    .findById(cardId)
    .orFail(() => {
      const error = new Error("Cartão não existe");
      error.statusCode = 404;
      throw error;
    })
    .then((cardData) => {
      if (String(cardData.owner._id) !== String(req.user._id)) {
        const error = new Error("Sem permissão para excluir este cartão");
        error.statusCode = 403;
        throw error;
      }

      return card.findByIdAndDelete(cardId);
    })
    .then((deletedCard) => {
      if (!deletedCard) {
        const error = new Error("Cartão não encontrado");
        error.statusCode = 404;
        throw error;
      }
      res.send({ data: deletedCard });
    })
    .catch((err) => {
      next(err);
    });
};

export const likeCard = (req, res, next) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail(() => {
      const error = new Error("Esse usuário não existe");
      error.statusCode = 404;
      throw error;
    })
    .then((cardData) => {
      res.status(200).json(cardData);
    })
    .catch((err) => {
      next(err);
    });
};

export const dislikeCard = (req, res, next) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail(() => {
      const error = new Error("Esse usuário não existe");
      error.statusCode = 404;
      throw error;
    })
    .then((cardData) => {
      res.status(200).json(cardData);
    })
    .catch((err) => {
      next(err);
    });
};
