import express from "express";
import { paymentHandler } from "../controller/stripeController";
import { checkIfValidProducts } from "../middleware/checkIfValidProducts";
import { validateResource } from "../middleware/validateResource";
import { verifyProductItemsSchema } from '../schema/productSchema'

export const stripeRouter = express.Router();

stripeRouter.post(
  "/api/payment/",
  validateResource(verifyProductItemsSchema),
  checkIfValidProducts,
  paymentHandler
);
