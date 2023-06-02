import mongoose, { MongooseError, Schema } from "mongoose";

export const ShoppingList = mongoose.model(
  "shopping_lists",
  new Schema({
    list: {
      type: Array,
    },
  })
);

export const Product = mongoose.model(
  "product",
  new Schema({
    name: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    salesPrice: {
      type: Number,
    },
    checked: {
      type: Boolean,
      required: false,
    },
  })
);

export const GetShoppingList = async <T>() => {
  const query = ShoppingList.where({ _id: "648f573043044174269f71b1" });
  const result = await query.findOne();
  console.log("result: ", result);
  return result as T;
};
export interface IProduct {
  id: string;
  name: string;
  imageUrl: string;
  salesPrice: number;
}

export interface IShoppingList {
  _id: string;
  list: IProduct[];
}
export const AddToList = async (product: IProduct) => {
  const shoppingList = await GetShoppingList<IShoppingList>();
  console.log("the id: ", shoppingList._id);
  const result = ShoppingList.updateOne(
    {
      _id: shoppingList._id,
    },
    { $push: { list: product } }
  );
  return result;
};

export const UpdateCheckedShoppingList = async (
  product: IProduct & { checked: boolean }
) => {
  const shoppingList = await GetShoppingList<IShoppingList>();
  const result = ShoppingList.updateOne(
    { "list.id": product.id },
    {
      $set: {
        "list.$.checked": product.checked,
      },
    }
  );
  return result;
};
