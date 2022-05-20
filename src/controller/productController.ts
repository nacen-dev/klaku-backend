import { Request, Response } from "express";
import { createNewProduct, getAllProducts } from "../service/productService";

export const getAllProductsHandler = async (req: Request, res: Response) => {
  try {
    const queryCategory = req.query.category ? req.query.category : "";
    const products = await getAllProducts(queryCategory as string);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createNewProductHandler = async (req: Request, res: Response) => {
  const body = req.body;
  try { 
    const product = await createNewProduct(body);
    return res.send("Product successfully created")
  } catch(error) {
    res.status(500).json(error)
  }
}