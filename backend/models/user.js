import mongoose from "mongoose";
import { urlRegex } from "../utils/errorHandler.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: "O campo avatar deve ser um link válido.",
    },
  },
});

const user = mongoose.model("user", userSchema);
export default user;
