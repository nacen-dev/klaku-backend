import { Request, Response } from "express";
import { Cart } from "../model/cartModel";
import { verifyCartInput } from "../schema/cartSchema";
import { VerifyUserIdInput } from "../schema/userSchema";
import { getCartByUserId, updateCartByUserId } from "../service/cartService";
import { getProductById } from "../service/productService";

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
    const productsData = cartData.items.map((item) =>
      getProductById(item.productId)
    );
    const productsInCart = await Promise.all(productsData);

    // Check if every product in cart is a valid product
    if (!productsInCart.every((product) => product !== null)) {
      return res.status(404).send("Invalid products provided");
    }

    // Check if there is enough stock before updating cart data

    const checkIfEnoughStock = !productsInCart
      .map((product, index) => {
        return product && product.stock >= cartData.items[index].quantity;
      })
      .some((product) => product === false);

    if (!checkIfEnoughStock) {
      return res.status(400).json({ error: "Not enough stock" });
    }

    const cart = await updateCartByUserId(
      userId,
      cartData as unknown as Partial<Cart>
    );

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json(error);
  }
};
