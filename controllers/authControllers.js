import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import * as authServices from "../services/authServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

import HttpError from "../helpers/HttpError.js";

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await authServices.signup({
    ...req.body,
    password: hashPassword,
  });

  const { _id: id } = newUser;
  
  const token = jwt.sign({id}, JWT_SECRET, { expiresIn: "12h" });
  await authServices.updateUser({ _id: id }, { token });

  res.status(201).json({
    user: {
      username: newUser.username,
      email: newUser.email,
    },
    token
  });
};

const singin = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Password invalid");
  }

  const { _id: id, username } = user;

  const payload = {
    id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "12h" });

  await authServices.updateUser({ _id: id }, { token });

  res.json({
    token,
    user: {username, email}
  });
};

const getCurrent = async (req, res) => {
  const { username, email } = req.user;

  res.json({
    user: {
      username,
      email,
    }
  });
};

const signout = async (req, res) => {
  const { _id } = req.user;

  await authServices.updateUser({ _id }, { token: "" });

  res.json({
    message: "Signout success",
  });
};

export default {
  signup: ctrlWrapper(signup),
  singin: ctrlWrapper(singin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
};
