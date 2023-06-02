import mongoose, { Schema } from "mongoose";

export const Image = mongoose.model(
  "images",
  new Schema({
    file: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  })
);

export const GetImages = async <T>() => {
  const query = Image.where({});
  const result = await query.find();
  return result as T;
};

export const UploadImage = async (name: string, file: string) => {
  const query = Image.create({ name, file });
  return await query;
};
