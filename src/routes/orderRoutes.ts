import express from "express";
import {
  createOrderHandler,
  getAllOrdersByUserIdHandler,
  getAllOrdersHandler,
  getOrderByIdHandler,
  updateOrderHandler,
} from "../controller/orderController";
import { validateResource } from "../middleware/validateResource";
import { requireAdmin } from "../middleware/requireAdmin";
import {
  verifyOrderCreateSchema,
  verifyOrderIdSchema,
  verifyOrderUpdateSchema,
} from "../schema/orderSchema";
import { requireUser } from "../middleware/requireUser";

export const orderRouter = express.Router();

orderRouter.get("/api/orders", requireAdmin, getAllOrdersHandler);

orderRouter.post(
  "/api/orders/create",
  requireUser,
  validateResource(verifyOrderCreateSchema),
  createOrderHandler
);

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
