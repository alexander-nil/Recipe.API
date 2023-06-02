import mongoose, { Schema } from "mongoose";

export const Category = mongoose.model(
  "categories",
  new Schema({
    category: {
      type: String,
      required: true,
    },
  })
);

export const GetCategories = async () => {
  const query = Category.where({});
  const result = await query.find();
  return result;
};

export const CreateCategory = async (category: string) => {
  const query = Category.create({ category: category });
  return await query;
};
