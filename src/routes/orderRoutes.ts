import express from "express";
import {
  getAllOrdersByUserIdHandler,
  getAllOrdersHandler,
} from "../controller/orderController";
import { validateResource } from "../middleware/validateResource";
import { verifyUserIdSchema } from "../schema/userSchema";
import { requireUser } from "../middleware/requireUser";

export const orderRouter = express.Router();

orderRouter.get("/api/orders", requireUser, getAllOrdersHandler);
