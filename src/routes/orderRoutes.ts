import express from "express";
import {
  getAllOrdersByUserIdHandler,
  getAllOrdersHandler,
  updateOrderHandler,
} from "../controller/orderController";
import { validateResource } from "../middleware/validateResource";
import { verifyUserIdSchema } from "../schema/userSchema";
import { requireAdmin } from "../middleware/requireAdmin";

export const orderRouter = express.Router();

orderRouter.get("/api/orders", requireAdmin, getAllOrdersHandler);

orderRouter.put("/api/orders/:orderId", requireAdmin, updateOrderHandler);