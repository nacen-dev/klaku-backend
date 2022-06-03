import { nanoid } from "nanoid";
import { TokenModel } from "../model/tokenModel";

export const createToken = (userId: string) => {
  const token = nanoid();
  return TokenModel.create({ userId: userId, token: token });
};

export const findToken = (token: string) => {
  return TokenModel.findOne({ token: token });
};
