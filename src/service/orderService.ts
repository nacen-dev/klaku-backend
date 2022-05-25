import { OrderModel } from "../model/orderModel"

export const getAllOrdersByUserId = (userId: string) => {
  console.log(userId);
  return OrderModel.find({user: userId});
}