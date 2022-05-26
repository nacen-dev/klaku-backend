import express from "express";
import {
  getAllOrdersByUserIdHandler,
  getAllOrdersHandler,
  updateOrderHandler,
} from "../controller/orderController";
import { validateResource } from "../middleware/validateResource";
import { requireAdmin } from "../middleware/requireAdmin";
import { verifyOrderUpdateSchema } from "../schema/orderSchema";

export const orderRouter = express.Router();

orderRouter.get("/api/orders", requireAdmin, getAllOrdersHandler);

orderRouter.put(
  "/api/orders/:orderId",
  requireAdmin,
  validateResource(verifyOrderUpdateSchema),
  updateOrderHandler
);
