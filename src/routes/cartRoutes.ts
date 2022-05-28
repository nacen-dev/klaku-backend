import express from "express";
import { getCartByUserIdHandler, updateCartByUserIdHandler } from "../controller/cartController";
import { checkIfSameUser } from "../middleware/checkIfSameUser";
import { requireUser } from "../middleware/requireUser";
import { validateResource } from "../middleware/validateResource";
import { verifyCartSchema } from "../schema/cartSchema";
import { verifyUserIdSchema } from "../schema/userSchema";

export const cartRouter = express.Router();

cartRouter.get(
  "/api/cart/:userId",
  requireUser,
  checkIfSameUser,
  validateResource(verifyUserIdSchema),
  getCartByUserIdHandler
);

cartRouter.put(
  "/api/cart/:userId",
  requireUser,
  checkIfSameUser,
  validateResource(verifyUserIdSchema),
  validateResource(verifyCartSchema),
  updateCartByUserIdHandler
);
