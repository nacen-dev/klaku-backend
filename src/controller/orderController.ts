import { Request, Response } from "express";
import {
  VerifyOrderIdInput,
  VerifyOrderUpdateInput,
} from "../schema/orderSchema";
import { VerifyUserIdInput } from "../schema/userSchema";
import { getAllOrders, getAllOrdersByUserId, getOrderById, updateOrder } from "../service/orderService";

export const getAllOrdersByUserIdHandler = async (
  req: Request<VerifyUserIdInput>,
  res: Response
) => {
  try {
    const orders = await getAllOrdersByUserId(req.params.userId);
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getOrderByIdHandler = async (req: Request<VerifyOrderIdInput>, res: Response) => {
  try {
    const order = await getOrderById(req.params.orderId);
    if (order && res.locals.user._id !== order.user) return res.sendStatus(403)
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export const getAllOrdersHandler = async (req: Request, res: Response) => {
  try {
    const orders = await getAllOrders();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateOrderHandler = async (
  req: Request<VerifyOrderIdInput, {}, VerifyOrderUpdateInput>,
  res: Response
) => {
  const orderId = req.params.orderId;
  const updateData = req.body;
  try {
    const order = await updateOrder(orderId, updateData);
    res.status(200).json(order);
  } catch (error) {
    return res.status(500).json(error);
  }
};
