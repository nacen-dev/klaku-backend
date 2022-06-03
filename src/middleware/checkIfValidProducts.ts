import { NextFunction, Request, Response } from "express";
import { VerifyProductItemsInput } from "../schema/productSchema";
import { getProductById } from "../service/productService";

export const checkIfValidProducts = async (
  req: Request<{}, {}, VerifyProductItemsInput>,
  res: Response,
  next: NextFunction
) => {
  const { items } = req.body;
  const productsData = items.map((item) => getProductById(item.productId));
  const productsQuery = await Promise.all(productsData);
  if (productsQuery.length === 0) return next();
  if (productsQuery.some((product) => product === null)) {
    console.log("invalid products");
    return res.status(404).send("Invalid products provided");
  }
  res.locals.items = productsQuery.map((product, index) => ({
    ...product,
    quantity: items[index].quantity,
  }));
  return next();
};
