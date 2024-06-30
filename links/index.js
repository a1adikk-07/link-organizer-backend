import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const linksPath = path.resolve("links", "links.json");

const updCards = (linkCards) =>
  fs.writeFile(linksPath, JSON.stringify(linkCards, null, 2));

export const getAllLinks = async () => {
  const data = await fs.readFile(linksPath);
  return JSON.parse(data);
};

export const getLinksById = async (id) => {
  const linkCards = await getAllLinks();
  const result = linkCards.find((item) => item.id === id);

  return result || "Sorry, but card not found";
};

export const addLinkCard = async (data) => {
  const linkCards = await getAllLinks();
  const newCard = {
    id: nanoid(),
    ...data,
  };
  linkCards.push(newCard);
  await updCards(linkCards);

  return newCard;
};

export const updateCardById = async (id, data) => {
  const linkCards = await getAllLinks();
  const index = linkCards.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  linkCards[index] = { ...linkCards[index], ...data };
  await updCards(linkCards);

  return linkCards[index];
};

export const deleteCardById = async (id) => {
  const linkCards = await getAllLinks();
  const index = linkCards.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = linkCards.splice(index, 1);
  await updCards(linkCards);

  return result;
};
