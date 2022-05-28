import { CartModel } from "../model/cartModel";

export const createCart = (userId: string) => {
  return CartModel.create({ user: userId });
};
