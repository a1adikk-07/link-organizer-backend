import yargs from "yargs";

import * as linkCardsService from "./links/index.js";

const invokeAction = async ({ action, id, ...data }) => {
  switch (action) {
    case "list":
      const AllLinks = await linkCardsService.getAllLinks();
      return console.log(AllLinks);
    case "getById":
      const linksCard = await linkCardsService.getLinksById(id);
      return console.log(linksCard);
    case "add":
      const newLinkCard = await linkCardsService.addLinkCard(data);
      return console.log(newLinkCard);
    case "updateById":
      const updateCard = await linkCardsService.updateCardById(id, data);
      return console.log(updateCard);
    case "deleteById":
      const deleteCard = await linkCardsService.deleteCardById(id);
      return console.log(deleteCard);
    default:
      console.log("Unknown action");
  }
};

const { argv } = yargs(process.argv.slice(2));
invokeAction(argv);
