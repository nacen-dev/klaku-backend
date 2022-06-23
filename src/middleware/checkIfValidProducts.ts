import { NextFunction, Request, Response } from "express";
import { Product } from "../model/productModel";
import { VerifyProductItemsInput } from "../schema/productSchema";
import { getProductById } from "../service/productService";
import { log } from "../utils/logger";

export interface Item extends Product {
  quantity: number;
}

export const checkIfValidProducts = async (
  req: Request<{}, {}, VerifyProductItemsInput>,
  res: Response<{}, { items: Item[] }>,
  next: NextFunction
) => {
  const { items } = req.body;
  const productsData = items.map((item) => getProductById(item.productId));
  const productsQuery = await Promise.all(productsData);
  if (productsQuery.length === 0) return next();
  if (productsQuery.some((product) => product === null)) {
    log.info("invalid products");
    return res.status(404).send("Invalid products provided");
  }
  res.locals.items = productsQuery.map((product, index) => ({
    ...product,
    quantity: items[index].quantity,
  })) as Item[];
  return next();
};
