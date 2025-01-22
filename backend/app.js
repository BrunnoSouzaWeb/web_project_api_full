import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import usersRouter from "./routes/usersRoute.js";
import cardsRouter from "./routes/cardsRoute.js";
import { isCelebrateError } from "celebrate";

import { requestLogger, errorLogger } from "./middleware/logger.js";

import cors from "cors";

///require("dotenv").config();

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

// Inicia o servidor

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
