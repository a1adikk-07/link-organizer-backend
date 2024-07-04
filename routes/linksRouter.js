import express from "express";
import LinkCardsControllers from "../controllers/LinkCardsControllers.js";

const LinkCardsRouter = express.Router();

LinkCardsRouter.get("/", LinkCardsControllers.getAll);

LinkCardsRouter.get("/:id", LinkCardsControllers.getById);

LinkCardsRouter.post("/", LinkCardsControllers.add);

LinkCardsRouter.put("/:id", LinkCardsControllers.updateById);

LinkCardsRouter.delete("/:id", LinkCardsControllers);

export default LinkCardsRouter;
