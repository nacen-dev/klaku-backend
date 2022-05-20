import express from 'express';
import { getAllProductsHandler, createNewProductHandler } from '../controller/productController';
import { validateResource } from '../middleware/validateResource';
import { createNewProductSchema } from '../schema/productSchema';

export const productRouter = express.Router();

productRouter.get("/api/products/", getAllProductsHandler)

productRouter.post("/api/products/new", validateResource(createNewProductSchema), createNewProductHandler);