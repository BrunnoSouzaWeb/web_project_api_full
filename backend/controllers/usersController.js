import user from "../models/user.js";
import { handleErrorResponse } from "../utils/errorHandler.js";

export const listAllUsers = (req, res) => {
  user
    .find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      handleErrorResponse(err, res, "user");
    });
};

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

export const createUser = (req, res) => {
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

export const updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  user
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
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
