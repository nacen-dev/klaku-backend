import { Request, Response } from "express";
import { VerifyUserIdInput } from "../schema/userSchema";
import { getCartByUserId } from "../service/cartService";

export const getCartByUserIdHandler = async (
  req: Request<VerifyUserIdInput>,
  res: Response
) => {
  try {
    const userId = req.params.userId;

    if (userId !== res.locals.user._id)
      return res
        .status(403)
        .json({ error: "Requested user's cart does not match the user that is currently logged in" });

    const cart = await getCartByUserId(userId);
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json(error);
  }
};
