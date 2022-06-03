import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Product } from "./productModel";
import { User } from "./userModel";

export class OrderItem {
  @prop({ required: true })
  quantity: number;

  @prop({ required: true, ref: () => Product })
  productId: Ref<Product>;
}

class ShippingAddress {
  @prop({ required: true })
  fullName: string;

  @prop({ required: true })
  address: string;
  @prop({ required: true })
  city: string;
  @prop({ required: true })
  postalCode: string;
  @prop({ required: true })
  country: string;
}

type OrderStatus =
  | "To Pay"
  | "To Ship"
  | "To Receive"
  | "Completed"
  | "Cancelled"
  | "Return/Refund";

export class Order {
  @prop({ required: true })
  status: OrderStatus;

  @prop({ required: true, type: () => OrderItem })
  items: OrderItem[];

  @prop({ required: true })
  taxPrice: number;

  @prop({ required: true })
  shippingAddress: ShippingAddress;

  @prop({ required: true })
  shippingPrice: number;

  @prop({ required: true })
  totalPrice: number;

  @prop({ ref: () => User, required: true })
  user: Ref<User>;
}

export const OrderModel = getModelForClass(Order, {
  schemaOptions: {
    timestamps: true,
  },
});
