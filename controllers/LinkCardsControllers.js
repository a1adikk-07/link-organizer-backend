import * as LinkCardsService from "../services/LinkCardsServices.js";
import HttpError from "../helpers/HttpError.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import LinkCard from "../models/LinkCard.js";

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await LinkCardsService.getAllLinkCards(
    { owner },
    { skip, limit }
  );
  const total = await LinkCardsService.countLinkCards({ owner });

  res.json({
    result,
    total,
  });
};

const getById = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await LinkCardsService.getLinksByFilter({ owner, _id: id });

  if (!result) {
    throw HttpError(404, `Card with id ${id} not found`);
  }

  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await LinkCardsService.addLinkCard({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { _id: owner } = req.user;

  const { id } = req.params;
  const result = await LinkCardsService.updateCardByFilter(
    { owner, _id: id },
    req.body
  );
  if (!result) {
    throw HttpError(404, `Card with id ${id} not found`);
  }

  res.json(result);
};

const deleteById = async (req, res) => {
  const { _id: owner } = req.user;

  const { id } = req.params;

  const result = await LinkCardsService.deleteCardByFilter({ owner, _id: id });

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

//  {
// "title": "Dubliat",
// "firstNameLink": "lesson",
// "firstLink": "https://www.edu.goit.global/uk/learn/11043889/2439558/2439561/lessons",
// "secondNameLink": "repository",
// "secondLink": "https://github.com/a1adikk-07/link-organizer-backend"
// }
