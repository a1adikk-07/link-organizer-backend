import Joi from "joi";

export const createLinkCardsSchema = Joi.object({
  title: Joi.string().required(),
  firstLinkName: Joi.string().required(),
  firstLink: Joi.string().required(),
  secondLinkName: Joi.string(),
  secondLink: Joi.string(),
  thirdLinkName: Joi.string(),
  thirdLink: Joi.string(),
  favorite: Joi.boolean(),
});

export const updateLinkCardsSchema = Joi.object({
  title: Joi.string(),
  firstLinkName: Joi.string(),
  firstLink: Joi.string(),
  secondLinkName: Joi.string(),
  secondLink: Joi.string(),
  thirdLinkName: Joi.string(),
  thirdLink: Joi.string(),
  favorite: Joi.boolean(),
});
