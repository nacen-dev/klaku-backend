import { Cart, CartModel } from "../model/cartModel";

export const createCart = (userId: string) => {
  return CartModel.create({ user: userId });
};

export const getCartByUserId = (userId: string) => {
  return CartModel.findOne({ user: userId });
};

export const updateCartByUserId = (userId: string, cartData: Partial<Cart>) => {
  return CartModel.findOneAndUpdate(
    { user: userId },
    { $set: cartData },
    { new: true }
  );
};
