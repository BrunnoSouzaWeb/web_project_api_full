/*
const errorMap = {
  CastError: {
    status: 400,
    message: (entity) => `O ID do ${entity} fornecido é inválido.`, // Mensagem dinâmica
  },
  DocumentNotFoundError: {
    status: 404,
    message: (entity) => `${entity} não encontrado com o ID fornecido.`,
  },
};

export const handleErrorResponse = (err, res, entity = "Recurso") => {
  console.log("dentro do errorhandler");
  console.log("ver-", err);
  console.log("ver-", err.name);
  console.log("ver-", err.statusCode);
  const errorConfig = errorMap[err.name] || {
    status: 500,
    message: () => "Erro interno do servidor.",
  };

  console.log("errorConfig", errorConfig);
  console.log("errorConfig.message", errorConfig.message);
  console.log("typeof errorConfig.message", typeof errorConfig.message);

  const message =
    typeof errorConfig.message === "function"
      ? errorConfig.message(entity)
      : errorConfig.message;

  res.status(errorConfig.status).json({ message, error: err.message });
};
*/

export const urlRegex =
  /^(https?:\/\/)(www\.)?([a-zA-Z0-9\-._~:/?%#[\]@!$&'()*+,;=]+)\/?$/;
