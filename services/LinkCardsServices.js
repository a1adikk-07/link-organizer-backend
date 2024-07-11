import LinkCard from "../models/LinkCard.js";

export const getAllLinkCards = () => LinkCard.find({}, "-createdAt -updatedAt");

export const getLinksById = async (id) => {
  const data = await LinkCard.findById(id);
  return data;
};

export const addLinkCard = (data) => LinkCard.create(data);

export const updateCardById = (id, data) =>
  LinkCard.findByIdAndUpdate(id, data, { new: true, runValidators: true });

export const deleteCardById = (id) => LinkCard.findByIdAndDelete(id);
