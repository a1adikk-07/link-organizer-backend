import Joi from "joi";
import { emailRegepxp } from "../constants/user-constants.js";

export const userSignupSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().pattern(emailRegepxp).required(),
  password: Joi.string().min(8).required(),
});

export const userSignInSchema = Joi.object({
  email: Joi.string().pattern(emailRegepxp).required(),
  password: Joi.string().min(8).required(),
});
