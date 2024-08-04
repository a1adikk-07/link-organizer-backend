import LinkCard from "../models/LinkCard.js";

export const getAllLinkCards = (filter = {}, setting = {}) =>
  LinkCard.find(filter, "-createdAt -updatedAt", setting).populate(
    "owner",
    "username email"
  );

export const countLinkCards = (filter) => LinkCard.countDocuments(filter);

export const addLinkCard = (data) => LinkCard.create(data);

export const getLinksByFilter = (filter) => LinkCard.findOne(filter);

export const updateCardByFilter = (filter, data) =>
  LinkCard.findOneAndUpdate(filter, data);

export const deleteCardByFilter = (filter) => LinkCard.findOneAndDelete(filter);
