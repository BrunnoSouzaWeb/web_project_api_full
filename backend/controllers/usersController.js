import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/user.js";

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
      next(err);
    });
};

export const getUserById = (req, res, next) => {
  const userId = req.user._id;

  user
    .findById(userId)
    .orFail(() => {
      const error = new Error("Esse usuário não existe");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      next(err);
    });
};

export const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  user
    .findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        const error = new Error("Este email já está registrado");
        error.statusCode = 400;
        throw error;
      }

      return bcrypt.genSalt().then((salt) =>
        bcrypt.hash(password, salt).then((hashedPassword) => {
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
      res.status(201).json(newUser);
    })
    .catch((err) => {
      next(err);
    });
};

export const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;

  user
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true }
    )
    .orFail(() => {
      const error = new Error("Usuário não existe");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      next(err);
    });
};

export const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  user
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true }
    )
    .orFail(() => {
      const error = new Error("Esse usuário não existe");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      next(err);
    });
};

export const login = async (req, res, next) => {
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
      const error = new Error("E-mail ou senha incorreto");
      error.statusCode = 401;
      throw error;
    }

    const payload = { _id: userLogin._id };

    const token = jwt.sign(
      { _id: userLogin._id },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "7d" }
    );

    const decoded = jwt.decode(token);

    return res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};
