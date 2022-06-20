import express from "express";
import {
  getAllProductsHandler,
  createNewProductHandler,
  updateProductByIdHandler,
  deleteProductByIdHandler,
  getProductByIdHandler,
} from "../controller/productController";
import { requireAdmin } from "../middleware/requireAdmin";
import { validateResource } from "../middleware/validateResource";
import {
  verifyProductIdSchema,
  verifyProductSchema,
} from "../schema/productSchema";

export const productRouter = express.Router();

productRouter.get("/api/products/", getAllProductsHandler);

productRouter.get("/api/products/:productId", getProductByIdHandler);

productRouter.post(
  "/api/products/new",
  requireAdmin,
  validateResource(verifyProductSchema),
  createNewProductHandler
);

productRouter.put(
  "/api/products/:productId",
  requireAdmin,
  validateResource(verifyProductIdSchema),
  validateResource(verifyProductSchema),
  updateProductByIdHandler
);

productRouter.delete(
  "/api/products/:productId",
  requireAdmin,
  validateResource(verifyProductIdSchema),
  deleteProductByIdHandler
);
