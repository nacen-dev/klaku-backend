import { Ref } from "@typegoose/typegoose";
import { nanoid } from "nanoid";
import { TokenModel } from "../model/tokenModel";
import { User } from "../model/userModel";

export const createToken = (userId: Ref<User>) => {
  const token = nanoid();
  return TokenModel.create({ userId: userId, token: token });
};

export const findToken = (token: string) => {
  return TokenModel.findOne({ token: token });
};

export const findTokenByEmail = (email: string) => {
  return TokenModel.findOne({ email: email });
};

export const deleteToken = (userId: Ref<User>) => {
  return TokenModel.deleteOne({ userId: userId });
};
