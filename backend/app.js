import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import usersRouter from "./routes/usersRoute.js";
import cardsRouter from "./routes/cardsRoute.js";
import { isCelebrateError } from "celebrate";

import { requestLogger, errorLogger } from "./middleware/logger.js";

import cors from "cors";

///require("dotenv").config();
//import dotenv from 'dotenv';
//dotenv.config();

const { port = 3000 } = process.env;
const app = express();

//console.log(process.env.CONNECTION);
//console.log(process.env.PORT);
//console.log(process.env.TESTE_AMBIENTE);

app.use(cors());
app.options("*", cors());

// Configuração do body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/aroundb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use(usersRouter);
app.use(cardsRouter);

app.use(errorLogger);

/*

app.use((err, req, res, next) => {
  // Verificar se o erro é do celebrate
  if (isCelebrateError(err)) {
    // Extrair as mensagens de erro do celebrate
    const validationErrors = [];
    err.details.forEach((details) => {
      validationErrors.push(details.message); // Captura as mensagens de erro
    });

    // Retorna um erro de validação com status 400
    return res.status(400).send({
      message: "Erro de validação",
      errors: validationErrors,
    });
  }

  // Caso contrário, trata os outros erros como já estava definido
  const { statusCode = 500, message } = err || {};
  res.status(statusCode).send({
    message: statusCode === 500 ? "Ocorreu um erro no servidor" : message,
  });
});
*/

/*
const errorMap = {
  CastError: {
    status: 400,
    message: (entity) => `O ID do ${entity} fornecido é inválido.`,
  },
  DocumentNotFoundError: {
    status: 404,
    message: (entity) => `${entity} não encontrado com o ID fornecido.`,
  },
};
*/

app.use((err, req, res, next) => {
  console.log("dentro global erro");
  // console.log("errorMap", errorMap);
  // console.log("errorMap.CastError", errorMap.CastError);
  // console.log("errorMap.DocumentNotFoundError", errorMap.DocumentNotFoundError);

  console.log(err);
  console.log(err.status);
  console.log(err);
  console.log("depois");

  // Verificar se o erro é do celebrate
  if (isCelebrateError(err)) {
    const validationErrors = [];
    err.details.forEach((details) => {
      validationErrors.push(details.message);
    });

    return res.status(400).send({
      message: "Erro de validação",
      errors: validationErrors,
    });
  }

  // Caso contrário, tratar com base no mapeamento de erros
  /*
  const errorConfig = errorMap[err.name] || {
    status: 500,
    message: () => "Erro interno do servidor.",
  };

  console.log("errorConfig", errorConfig);
  console.log("errorConfig.message", errorConfig.message);

  const message =
    typeof errorConfig.message === "function"
      ? errorConfig.message(req.entity || "Recurso")
      : errorConfig.message;

  res.status(errorConfig.status).json({
    message,
    error: err.message,
  });
  */

  const { statusCode = 500, message } = err || {};
  res.status(statusCode).send({
    message: statusCode === 500 ? "Ocorreu um erro no servidor" : message,
  });
});

// Inicia o servidor

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
