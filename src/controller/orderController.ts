import { Ref } from "@typegoose/typegoose";
import { Request, Response } from "express";
import { OrderItem } from "../model/orderModel";
import { ItemInterface } from "../model/productModel";
import { User } from "../model/userModel";
import {
  VerifyOrderCreateInput,
  VerifyOrderIdInput,
  VerifyOrderUpdateInput,
} from "../schema/orderSchema";
import {
  createOrder,
  getAllOrders,
  getAllOrdersByUserId,
  getOrderById,
  updateOrder,
} from "../service/orderService";

export const getAllOrdersByUserIdHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const orders = await getAllOrdersByUserId(res.locals.user._id);
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getOrderByIdHandler = async (
  req: Request<VerifyOrderIdInput>,
  res: Response
) => {
  try {
    const order = await getOrderById(req.params.orderId);
    if (order && res.locals.user._id !== order.user) return res.sendStatus(403);
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json(error);
  }
};

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
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createOrderHandler = async (
  req: Request<{}, {}, VerifyOrderCreateInput>,
  res: Response
) => {
  const orderData = req.body;
  const SHIPPING_PRICE = 2.5;
  const TAX_PRICE = 0.12;
  const items: ItemInterface[] = res.locals.items;

  try {
    const orderedItemsPrice = res.locals.items.reduce(
      (total: number, item: ItemInterface) => {
        return total + (item.price as number) * item.quantity;
      },
      0
    );

    const totalPrice =
      orderedItemsPrice + SHIPPING_PRICE + TAX_PRICE * orderedItemsPrice;

    const orderItems: OrderItem[] = items.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
    }));

    const order = await createOrder({
      user: res.locals.user._id as Ref<User>,
      items: orderItems,
      shippingAddress: orderData.shippingAddress,
      shippingPrice: SHIPPING_PRICE,
      status: orderData.status,
      taxPrice: TAX_PRICE,
      totalPrice: totalPrice,
    });
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json(error);
  }
};
