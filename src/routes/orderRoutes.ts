import express from "express";
import {
  getAllOrdersByUserIdHandler,
  getAllOrdersHandler,
  getOrderByIdHandler,
  updateOrderHandler,
} from "../controller/orderController";
import { validateResource } from "../middleware/validateResource";
import { requireAdmin } from "../middleware/requireAdmin";
import {
  verifyOrderIdSchema,
  verifyOrderUpdateSchema,
} from "../schema/orderSchema";
import { requireUser } from "../middleware/requireUser";

export const orderRouter = express.Router();

orderRouter.get("/api/orders", requireAdmin, getAllOrdersHandler);

orderRouter.put(
  "/api/orders/:orderId",
  requireAdmin,
  validateResource(verifyOrderUpdateSchema),
  updateOrderHandler
);

orderRouter.get(
  "/api/orders/:orderId",
  requireUser,
  validateResource(verifyOrderIdSchema),
  getOrderByIdHandler
);
