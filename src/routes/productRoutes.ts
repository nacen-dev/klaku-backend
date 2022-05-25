import express from 'express';
import { getAllProductsHandler, createNewProductHandler, updateProductByIdHandler, deleteProductByIdHandler } from '../controller/productController';
import { validateResource } from '../middleware/validateResource';
import { verifyProductIdSchema, verifyProductSchema } from '../schema/productSchema';

export const productRouter = express.Router();

productRouter.get("/api/products/", getAllProductsHandler)

productRouter.post("/api/products/new", validateResource(verifyProductSchema), createNewProductHandler);

productRouter.put("/api/products/:productId", 
  validateResource(verifyProductIdSchema), 
  validateResource(verifyProductSchema), 
  updateProductByIdHandler)

productRouter.delete("/api/products/:productId", validateResource(verifyProductIdSchema), deleteProductByIdHandler)