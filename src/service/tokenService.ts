import { nanoid } from "nanoid";
import { Token, TokenModel } from "../model/tokenModel";

export const createToken = (userId: string) => {
  const token = nanoid();
  return TokenModel.create({ userId: userId, token: token });
};