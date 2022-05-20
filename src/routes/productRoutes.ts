import express from 'express';
import { getAllProductsHandler } from '../controller/productController';

export const productRouter = express.Router();

productRouter.get("/api/products/", getAllProductsHandler) 