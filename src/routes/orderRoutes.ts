import express from 'express';
import { getAllOrdersByUserIdHandler } from '../controller/orderController';
import { validateResource } from '../middleware/validateResource';
import { verifyUserIdSchema } from '../schema/userSchema';

export const orderRouter = express.Router();

orderRouter.get("/api/orders/user/:userId", validateResource(verifyUserIdSchema), getAllOrdersByUserIdHandler)