import { Request, Response } from "express";
import { Cart } from "../model/cartModel";
import { verifyCartInput } from "../schema/cartSchema";
import { VerifyUserIdInput } from "../schema/userSchema";
import { getCartByUserId, updateCartByUserId } from "../service/cartService";

export const getCartByUserIdHandler = async (
  req: Request<VerifyUserIdInput>,
  res: Response
) => {
  try {
    const userId = req.params.userId;
    const cart = await getCartByUserId(userId);

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateCartByUserIdHandler = async (
  req: Request<VerifyUserIdInput, {}, verifyCartInput>,
  res: Response
) => {
  try {
    const userId = req.params.userId;
    const cartData = req.body;
    const cart = await updateCartByUserId(
      userId,
      cartData as unknown as Partial<Cart>
    );
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json(error);
  }
};
