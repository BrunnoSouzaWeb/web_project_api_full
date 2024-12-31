import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import usersRouter from "./routes/usersRoute.js";
import cardsRouter from "./routes/cardsRoute.js";

import cors from "cors";

const { port = 3000 } = process.env;
const app = express();

app.use(cors());
app.options("*", cors());

// Configuração do body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/aroundb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware de autenticação temporária
/*
app.use((req, res, next) => {
  req.user = {
    _id: "67491beb043ddbcacdf0734d",
  };
  next();
});
*/

app.use(usersRouter);
app.use(cardsRouter);

// rotas inexistentes
app.use((req, res) => {
  res.status(404).json({ message: "A solicitação não foi encontrada" });
});

// tratamento de erros
app.use((err, res) => {
  console.error("Erro no servidor:", err.stack); // Loga o erro no console
  res.status(500).json({ message: "Ocorreu um erro no servidor" });
});

// Inicia o servidor

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
