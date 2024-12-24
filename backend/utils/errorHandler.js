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
  const errorConfig = errorMap[err.name] || {
    status: 500,
    message: () => "Erro interno do servidor.",
  };

  const message =
    typeof errorConfig.message === "function"
      ? errorConfig.message(entity)
      : errorConfig.message;

  res.status(errorConfig.status).json({ message, error: err.message });
};

export const urlRegex =
  /^(https?:\/\/)(www\.)?([a-zA-Z0-9\-._~:/?%#[\]@!$&'()*+,;=]+)\/?$/;
