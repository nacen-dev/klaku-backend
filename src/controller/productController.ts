import { Request, Response } from "express";
import { getAllProducts } from "../service/productService";

export const getAllProductsHandler = async (req: Request, res: Response) => {
  try {
    const queryCategory = req.query.category ? req.query.category : "";
    let products;
    
    products = await getAllProducts(queryCategory as string);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};
