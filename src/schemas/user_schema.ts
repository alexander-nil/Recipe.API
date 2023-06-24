import mongoose, { Schema } from "mongoose";

export const User = mongoose.model(
  "users",
  new Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: Buffer,
      required: true,
    },
    salt: {
      type: Buffer,
      required: true,
    },
    wsClientId: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
  })
);

export interface IUser {
  _id: string;
  username: string;
  password: ArrayBufferView;
  salt: string;
  wsClientId?: string;
  email?: string;
}

export const GetUserByUsername = async (username: string) => {
  const query = User.where({ username: username });
  const result = await query.find();
  return result;
};

export const GetUserById = async (_id: string) => {
  const query = User.where({ _id: _id });
  const result = await query.find();
  return result;
};

export const CreateUser = async (user: IUser) => {
  console.log("creating user: ", user);
  const query = User.create(user);
  return await query;
};
