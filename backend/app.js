import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import usersRouter from "./routes/usersRoute.js";
import cardsRouter from "./routes/cardsRoute.js";
import { isCelebrateError } from "celebrate";

import { requestLogger, errorLogger } from "./middleware/logger.js";

import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const { port = 3000 } = process.env;
const app = express();

app.use(cors());
app.options("*", cors());

// Configuração do body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.CONNECTION).then(() => {
  console.log("Banco de dados conectado");
  console.log(process.env.CONNECTION);
  console.log(process.env.JWT_SECRET);
});

app.use(requestLogger);

app.use(usersRouter);
app.use(cardsRouter);

app.use(errorLogger);

app.use((err, req, res, next) => {
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

  const { statusCode = 500, message } = err || {};
  res.status(statusCode).send({
    message: statusCode === 500 ? "Ocorreu um erro no servidor" : message,
  });
});

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
