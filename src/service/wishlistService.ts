import { Ref } from "@typegoose/typegoose";
import { Product } from "../model/productModel";
import { Wishlist, WishlistModel } from "../model/wishlistModel";

export const createWishlist = (userId: string) => {
  return WishlistModel.create({ user: userId });
};

export const updateWishlist = (userId: string, items: Ref<Product>) => {
  return WishlistModel.findOneAndUpdate(
    { user: userId },
    { items: items },
    { new: true, upsert: true }
  );
};

export const getWishlist = (userId: string) => {
  return WishlistModel.findOne({ user: userId }).populate("items");
};
