import express from "express";

import LinkCardsControllers from "../controllers/LinkCardsControllers.js";

import {
  createLinkCardsSchema,
  updateLinkCardsSchema,
} from "../schemas/LinkCardsSchemas.js";

import validateBody from "../decorators/validateBody.js";

import isValidId from "../middlewares/isValidId.js";

import authenticate from "../middlewares/authenticate.js";

const LinkCardsRouter = express.Router();

LinkCardsRouter.use(authenticate);

LinkCardsRouter.get("/", LinkCardsControllers.getAll);

LinkCardsRouter.get("/:id", isValidId, LinkCardsControllers.getById);

LinkCardsRouter.post(
  "/",
  validateBody(createLinkCardsSchema),
  LinkCardsControllers.add
);

LinkCardsRouter.put(
  "/:id",
  isValidId,
  validateBody(updateLinkCardsSchema),
  LinkCardsControllers.updateById
);

LinkCardsRouter.delete("/:id", isValidId, LinkCardsControllers.deleteById);

export default LinkCardsRouter;
