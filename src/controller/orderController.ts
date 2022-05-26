import { Request, Response } from "express";
import { VerifyUserIdInput } from "../schema/userSchema";
import { getAllOrders, getAllOrdersByUserId } from "../service/orderService";

export const getAllOrdersByUserIdHandler = async (req: Request<VerifyUserIdInput>, res: Response) => {
  try {
    const orders = await getAllOrdersByUserId(req.params.userId);
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export const getAllOrdersHandler = async (req: Request, res: Response) => {
  try {
    const orders = await getAllOrders();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json(error)
  }
}