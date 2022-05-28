import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "./userModel";

interface CartItems {
  productId: string;
  quantity: number;
}

export class Cart {
  @prop({ required: true, ref: () => User, unique: true })
  user: Ref<User>;

  @prop({ default: [] })
  items: CartItems[];
}

export const CartModel = getModelForClass(Cart);