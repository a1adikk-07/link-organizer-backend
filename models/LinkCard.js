import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSetting } from "./hooks.js";

const linkCardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    firstLinkName: {
      type: String,
      required: true,
    },
    firstLink: {
      type: String,
      required: true,
    },
    secondLinkName: {
      type: String,
    },
    secondLink: {
      type: String,
    },
    thirdLinkName: {
      type: String,
    },
    thirdLink: {
      type: String,
    },
    fourthLinkName: {
      type: String,
    },
    fourthLink: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

linkCardSchema.post("save", handleSaveError);

linkCardSchema.pre("findOneAndUpdate", setUpdateSetting);

linkCardSchema.post("findOneAndUpdate", handleSaveError);

const LinkCard = model("link-card", linkCardSchema);

export default LinkCard;
