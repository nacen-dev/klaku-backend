import { OrderModel } from "../model/orderModel"

export const getAllOrdersByUserId = (userId: string) => {
  return OrderModel.find({user: userId});
}

export const getAllOrders = () => {
  return OrderModel.find();
}

export const updateOrder = (orderId: string) => {
  return OrderModel.findByIdAndUpdate(orderId);
}