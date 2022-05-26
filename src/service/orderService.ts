import { Order, OrderModel } from "../model/orderModel"

export const getAllOrdersByUserId = (userId: string) => {
  return OrderModel.find({user: userId});
}

export const getOrderById = (orderId: string) => {
  return OrderModel.findById(orderId);
}

export const getAllOrders = () => {
  return OrderModel.find();
}

export const updateOrder = (orderId: string, data: Partial<Order>) => {
  return OrderModel.findByIdAndUpdate(orderId, data, { new: true});
}