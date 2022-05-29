import express from "express";
import { updateWishlistHandler } from "../controller/wishlistController";
import { checkIfValidProducts } from "../middleware/checkIfValidProducts";
import { requireUser } from "../middleware/requireUser";
import { validateResource } from "../middleware/validateResource";
import { verifyProductItemsSchema } from "../schema/productSchema";

export const wishlistRouter = express.Router();

wishlistRouter.put(
  "/api/wishlist",
  requireUser,
  validateResource(verifyProductItemsSchema),
  checkIfValidProducts,
  updateWishlistHandler
);
