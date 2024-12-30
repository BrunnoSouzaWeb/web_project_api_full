import mongoose from "mongoose";
import { urlRegex } from "../utils/errorHandler.js";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Explorer",
  },
  avatar: {
    type: String,
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg" /* aqui2 */,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: "O campo avatar deve ser um link válido.",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "O email deve ser um email válido.",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

const user = mongoose.model("user", userSchema);
export default user;
