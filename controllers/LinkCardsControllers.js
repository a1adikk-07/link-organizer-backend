import * as LinkCardsService from "../services/LinkCardsServices.js";
import HttpError from "../helpers/HttpError.js";
import {
  createLinkCardsSchema,
  updateLinkCardsSchema,
} from "../schemas/LinkCardsSchemas.js";

const getAll = async (req, res) => {
  try {
    const result = await LinkCardsService.getAllLinkCards();

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await LinkCardsService.getLinksById({ id });

    if (!result) {
      throw HttpError(404, `Card with id ${id} not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = createLinkCardsSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = LinkCardsService.addLinkCard(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { error } = createLinkCardsSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { id } = req.params;
    const result = await LinkCardsService.updateCardById(id, req.body);
    if (!result) {
      throw HttpError(404, `Card with id ${id} not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await LinkCardsService.deleteCardById(id);

    if (!result) {
      throw HttpError(404, `Card with id ${id} not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
};
