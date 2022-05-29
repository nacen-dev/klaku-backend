import { Ref } from "@typegoose/typegoose";
import { Request, Response } from "express";
import { Product } from "../model/productModel";
import { VerifyProductItemsInput } from "../schema/productSchema";
import { updateWishlist } from "../service/wishlistService";

export const updateWishlistHandler = async (
  req: Request<{}, {}, VerifyProductItemsInput>,
  res: Response
) => {
  const user = res.locals.user;
  const data = req.body;
  try {
    const wishlist = await updateWishlist(
      user._id,
      data.items as unknown as Ref<Product>
    );
    return res.status(200).json(wishlist);
  } catch (error) {
    return res.status(500).json(error);
  }
};
