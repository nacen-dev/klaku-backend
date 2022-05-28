import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Product } from "./productModel";
import { User } from "./userModel";

export class CartItem {
  @prop({ required: true, ref: () => Product, unique: true })
  productId: Product;

  @prop({ required: true, min: 1 })
  quantity: number;
}

export class Cart {
  @prop({ required: true, ref: () => User, unique: true })
  user: Ref<User>;

  @prop({ default: [] })
  items: CartItem[];
}

export const CartModel = getModelForClass(Cart);
