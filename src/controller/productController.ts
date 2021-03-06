import { Request, Response } from "express";
import { verifyProductInput, verifyProductIdInput } from "../schema/productSchema";
import { createNewProduct, deleteProductById, getAllProducts, getProductById, updateProductById } from "../service/productService";

export const getAllProductsHandler = async (req: Request, res: Response) => {
  try {
    const queryCategory = req.query.category ? req.query.category : "";
    const products = await getAllProducts(queryCategory as string);

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createNewProductHandler = async (req: Request<{}, {}, verifyProductInput>, res: Response) => {
  const body = req.body;
  try { 
    const product = await createNewProduct(body);
    return res.status(200).json(product);
  } catch(error) {
    return res.status(500).json(error)
  }
}

export const getProductByIdHandler = async (req: Request<verifyProductIdInput>, res: Response) => {
  const productId = req.params.productId;
  try {
    const product = await getProductById(productId);
    return res.status(200).json(product);;
  } catch(error) {
    return res.status(500).json(error);
  }
}

export const updateProductByIdHandler = async (req: Request<verifyProductIdInput, {}, verifyProductInput>, res: Response) => {
  const productId = req.params.productId;
  const productData = req.body;
  
  try {
    const product = await updateProductById(productId, productData);
    return res.status(200).json(product);
  } catch(error) {
    return res.status(500).json(error);
  }
}

export const deleteProductByIdHandler = async (req: Request<verifyProductIdInput>, res: Response) => {
  const productId = req.params.productId;
  try {
    const product = await deleteProductById(productId);
    if (product) return res.status(204).end();
    return res.status(404).json({message: "Product does not exist"});
  } catch (error) {
    return res.status(500).json(error);
  }
}