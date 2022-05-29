import { NextFunction, Request, Response } from "express";
import { VerifyProductItemsInput } from "../schema/productSchema";
import { getProductById } from "../service/productService";

export const checkIfValidProducts = async (
  req: Request<{}, {}, VerifyProductItemsInput>,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const productsData = data.items.map((item) => getProductById(item.productId));
  const productsQuery = await Promise.all(productsData);
  if (productsQuery.length === 0) return next();
  if (!productsQuery.every((product) => product !== null)) {
    console.log("invalid products")
    return res.status(404).send("Invalid products provided");
  }
  return next();
};
