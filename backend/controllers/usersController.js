////import { celebrate, Joi } from "celebrate";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/user.js";
///import { error } from "winston";

//import pkg from 'winston';
//const { error } = pkg;

///import { handleErrorResponse } from "../utils/errorHandler.js";

export const listAllUsers = (req, res, next) => {
  user
    .find()
    .then((users) => {
      if (!users) {
        const error = new Error("Ocorreu um erro no servidor");
        error.statusCode = 500;
        throw error;
      }

      res.status(200).json(users);
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
   antes era assim
export const getUserById = (req, res) => {
  const { userId } = req.params.userId;

  user
    .findById(userId)
    .orFail()
    .then((userData) => {
      res.status(200).json(userData);
    })
    .catch((err) => {
      handleErrorResponse(err, res, "user");
    });
};

*/

// User.findById(req.user.id)    CAIO

export const getUserById = (req, res, next) => {
  const userId = req.user._id;

  console.log("dentro do getUserById");
  console.log(userId);

  user
    .findById(userId)
    .orFail(() => {
      const error = new Error("Esse usuário não existe");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.log("catch erro");
      console.log(err.statusCode);
      console.log(err);
      console.log("indo para o next");

      next(err);
    });
  //  .catch(next);
};

/*
   ANTES ERA ASSIM
export const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  user
    .create({ name, about, avatar })
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((err) => {
      handleErrorResponse(err, res, "user");
    });
};
*/

/*
export const createUser = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().optional().min(2).max(30),
    about: Joi.string().optional().min(2).max(30),
    avatar: Joi.string().optional().uri(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  });
  */

// Validação dos dados da requisição
/*
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details });
  }
*/

export const createUser = (req, res, next) => {
  console.log("Dados validados:", req.body);
  console.log("dentro do create user");

  const { name, about, avatar, email, password } = req.body; // Pegue os dados validados do corpo da requisição

  // Verificar se o email já está registrado
  user
    .findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        //return res.status(400).json({ error: "Este email já está registrado" });
        const error = new Error("Este email já está registrado");
        error.statusCode = 400;
        throw error;
      }

      // Gerar salt e hash da senha
      return bcrypt.genSalt().then((salt) =>
        bcrypt.hash(password, salt).then((hashedPassword) => {
          // Criar o novo usuário
          return user.create({
            name,
            about,
            avatar,
            email,
            password: hashedPassword,
          });
        })
      );
    })
    .then((newUser) => {
      // Retornar o novo usuário criado
      console.log("saindo  do create_use");
      res.status(201).json(newUser);
    })
    .catch((err) => {
      console.log("catch erro");
      console.log(err.statusCode);
      console.log(err);
      console.log("indo para o next");

      next(err);
    });
};

/*    como era antes

export const updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  user
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true }                // Retorna o documento atualizado
    )
    .orFail()
    .then((newUser) => {
      res.status(200).json(newUser);
    })
    .catch((err) => {
      handleErrorResponse(err, res, "user");
    });
};
*/

export const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;

  user
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true } // Retorna o documento atualizado
    )
    .orFail(() => {
      const error = new Error("Usuário não existe");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.log("catch erro");
      console.log(err.statusCode);
      console.log(err);
      console.log("indo para o next");

      next(err);
    });
};

/*    como era antes
export const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  user
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true }
    )
    .orFail()
    .then((newUser) => {
      res.status(200).json(newUser);
    })
    .catch((err) => {
      handleErrorResponse(err, res, "user");
    });
};
*/

export const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  //console.log("avatar._id", avatar._id);   undefined
  //console.log("body._id", req.body._id);   não funciona
  console.log("user._id", req.user._id); ///sim funciona

  ///////req.user._id = "6786f6275c5742d3d91e88f9";

  console.log("novo user._id", req.user._id); ///sim funciona

  user
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true }
    )
    .orFail(() => {
      const error = new Error("Esse usuário não existeeeeeee");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.log("catch erro");
      console.log(err.statusCode);
      console.log(err);
      console.log("indo para o next");

      next(err);
    });
};

export const login = async (req, res, next) => {
  console.log("dentro do login backend");

  try {
    const { email, password } = req.body;

    const userLogin = await user.findOne({ email }).select("+password");

    if (!userLogin) {
      const error = new Error("E-mail ou senha incorretos");
      error.statusCode = 401;
      throw error;
    }

    const matched = await bcrypt.compare(password, userLogin.password);
    if (!matched) {
      const error = new Error("E-mail ou senha inco");
      error.statusCode = 401;
      throw error;
    }

    const payload = { _id: userLogin._id };
    console.log("Payload do token:", payload); // Para debugging

    const token = jwt.sign(
      // { _id: user._id },
      { _id: userLogin._id }, // Aqui está a correção
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "7d" }
    );

    const decoded = jwt.decode(token);
    console.log("Decoded token:", decoded);

    console.log("dentro do login", token);

    console.log("dentro do login", { token });

    console.log("saindo do login backend");

    return res.status(200).json({ token });
  } catch (err) {
    console.log("catch erro");
    console.log(err.statusCode);
    console.log(err);
    console.log("indo para o next");

    next(err);
  }
};
