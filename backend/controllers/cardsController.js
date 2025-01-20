import card from "../models/card.js";
import { handleErrorResponse } from "../utils/errorHandler.js";

export const listAllCards = (req, res) => {
  card
    .find({ invalidField: "value" })
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

/*   como era antes
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
*/

export const deleteCard = (req, res) => {
  const { cardId } = req.params;
  console.log("dentro do delete", cardId);

  // Usando orFail de maneira mais simples
  card
    .findById(cardId)
    .orFail(() => {
      const error = new Error("Cartão não existe");
      error.statusCode = 404; /// 404
      throw error;
    })
    .then((cardData) => {
      console.log("indo ver se é meu");
      console.log(cardData);
      console.log("dono do cartão:", cardData.owner._id);
      console.log("meu id:", req.user);

      // Verificando se o usuário tem permissão
      if (String(cardData.owner._id) !== String(req.user._id)) {
        const error = new Error("Sem permissão para excluir este cartão");
        error.statusCode = 403;
        throw error;
      }

      console.log("indo deletar");
      // Usando o modelo `card` para deletar, não o documento
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
      console.log("dentro do catch");
      console.log("erro:", err);
      handleErrorResponse(err, res, "card");
    });
};

/*
export const deleteCard = (req, res) => {
  const { cardId } = req.params;
  console.log("dentro do delete", cardId);
  card
    .findById(cardId)
    .orFail(() => {
      const error = new Error("Cartão não existe");
      error.statusCode = 404; /// 404
      throw error;
    })
    .then((cardData) => {
      console.log("indo ver se é meu");
      console.log(cardData);
      console.log("dono do cartao:", cardData.owner._id);
      console.log("meu id:", req.user);

      if (String(cardData.owner._id) !== String(req.user._id))
        if (String(cardData.owner._id) !== String(req.user._id)) {
          const error = new Error("Sem permissão para excluir este cartão");
          error.statusCode = 403;
          throw error;
        }

      console.log("indo deletar");
      return card.findByIdAndDelete(cardId);
    })
    .then((deletedCard) => {
      res.send({ data: deletedCard });
    })
    .catch((err) => {
      console.log("dentro do catchccc");
      console.log("ver-", err);
      handleErrorResponse(err, res, "card");
    });
};
*/

export const likeCard = (req, res) => {
  console.log("este aqui");
  console.log(req.params);

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
  console.log("este aqui dislikecard");
  console.log(req.params);

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
