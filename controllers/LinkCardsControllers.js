import * as LinkCardsService from "../services/LinkCardsServices.js";
import HttpError from "../helpers/HttpError.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import LinkCard from "../models/LinkCard.js";

const getAll = async (req, res) => {
  const result = await LinkCardsService.getAllLinkCards();

  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await LinkCardsService.getLinksById(id);

  if (!result) {
    throw HttpError(404, `Card with id ${id} not found`);
  }

  res.json(result);
};

const add = async (req, res) => {
  const result = await LinkCardsService.addLinkCard(req.body);

  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await LinkCardsService.updateCardById(id, req.body);
  if (!result) {
    throw HttpError(404, `Card with id ${id} not found`);
  }

  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  const result = await LinkCardsService.deleteCardById(id);

  if (!result) {
    throw HttpError(404, `Card with id ${id} not found`);
  }

  res.json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
