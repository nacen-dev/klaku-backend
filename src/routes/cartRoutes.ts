import express from "express";
import { getCartByUserIdHandler } from "../controller/cartController";
import { requireUser } from "../middleware/requireUser";
import { validateResource } from "../middleware/validateResource";
import { verifyUserIdSchema } from "../schema/userSchema";

export const cartRouter = express.Router();

cartRouter.get(
  "/api/cart/:userId",
  requireUser,
  validateResource(verifyUserIdSchema),
  getCartByUserIdHandler
);
