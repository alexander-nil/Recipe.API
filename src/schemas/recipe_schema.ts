import mongoose, { Schema } from "mongoose";

export const Recipe = mongoose.model(
  "recipes",
  new Schema({
    name: {
      type: String,
    },
    category: {
      type: String,
    },
    ingredients: {
      type: Array,
    },
    created: {
      type: Number,
    },
    amountOfTimeNeeded: {
      type: String,
    },
    portions: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    image: {
      type: String,
    },
    imageUrl: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "images",
    },
  })
);

export const GetRecipes = async <T>() => {
  const query = Recipe.where({});
  const result = await query.find().populate("imageUrl");
  return result as T;
};
export interface IRecipe {
  name: string;
  category: string;
  ingredients: string[];
  created: number;
  amountOfTimeNeeded: string;
  portions: string;
  createdBy: string;
  image: string;
  imageUrl: IImage;
}

export interface IImage {
  name: string;
  file: string;
  blob: Blob;
}
export const CreateRecipe = async (recipe: IRecipe) => {
  const query = Recipe.create(recipe);
  return await query;
};
