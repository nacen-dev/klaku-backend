import { Ref } from "@typegoose/typegoose";
import { Request, Response } from "express";
import { Order, OrderItem } from "../model/orderModel";
import { User } from "../model/userModel";
import {
  VerifyOrderCreateInput,
  VerifyOrderIdInput,
  VerifyOrderUpdateInput,
} from "../schema/orderSchema";
import { VerifyUserIdInput } from "../schema/userSchema";
import {
  createOrder,
  getAllOrders,
  getAllOrdersByUserId,
  getOrderById,
  updateOrder,
} from "../service/orderService";
import { getProductById } from "../service/productService";

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

  try {
    const orderItemsPromise = orderData.orderItems.map((orderItem) =>
      getProductById(orderItem.product)
    );
    const orderItemsData = await Promise.all(orderItemsPromise);

    if (orderItemsData.some((orderItem) => orderItem === null))
      return res.status(404).send("Invalid products provided");

    const orderItems = orderItemsData.map((orderItem, index) => ({
      name: orderItem?.name,
      quantity: orderData.orderItems[index].quantity,
      image: orderItem?.image,
      price: orderItem?.price,
      size: orderItem?.size,
      color: orderItem?.color,
      product: orderItem?._id,
    }));

    const orderedItemsPrice = orderItems.reduce((total, orderItem) => {
      return total + (orderItem.price as number) * orderItem.quantity;
    }, 0);

    const totalPrice =
      orderedItemsPrice + SHIPPING_PRICE + TAX_PRICE * orderedItemsPrice;

    const order = await createOrder({
      user: res.locals.user._id as Ref<User>,
      orderItems: orderItems as OrderItem[],
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
