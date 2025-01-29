import card from "../models/card.js";
//import { handleErrorResponse } from "../utils/errorHandler.js";

//.find({ invalidField: "value" })

export const listAllCards = (req, res, next) => {
  console.log("dentro do listallcards");
  card
    .find()
    .then((cards) => {
      console.log("dentro do then listallcards");
      console.log(cards);
      console.log("dentro do thennnn listallcards");
      res.status(200).json(cards);
    })
    .catch((err) => {
      console.log("catch erro");
      console.log(err.statusCode);
      console.log(err);
      console.log("indo para o next");

      next(err);
    });
};

export const createCard = (req, res, next) => {
  const { name, link } = req.body;

  console.log("criando card", name);
  console.log("criando card", link);
  console.log("criando card", req.user._id);

  if (!name || !link || !req.user._id) {
    const error = new Error("Dados inválidos");
    error.statusCode = 400;
    throw error;
    // return res.status(400).send({ message: "Dados inválidos" });
  }

  card
    .create({ name, link, owner: req.user._id })
    .then((newCard) => {
      res.status(201).json(newCard);
    })
    .catch((err) => {
      console.log("catch erro");
      console.log(err.statusCode);
      console.log(err);
      console.log("indo para o next");

      next(err);
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

export const deleteCard = (req, res, next) => {
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
      console.log("catch erro");
      console.log(err.statusCode);
      console.log(err);
      console.log("indo para o next");

      next(err);
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

export const likeCard = (req, res, next) => {
  console.log("este aqui");
  console.log(req.params);

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
      console.log("catch erro");
      console.log(err.statusCode);
      console.log(err);
      console.log("indo para o next");

      next(err);
    });
};

export const dislikeCard = (req, res, next) => {
  console.log("este aqui dislikecard");
  console.log(req.params);

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
      console.log("catch erro");
      console.log(err.statusCode);
      console.log(err);
      console.log("indo para o next");

      next(err);
    });
};
