import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Product } from "./productModel";
import { User } from "./userModel";

export class WishlistItem {
  @prop({required: true, ref: () => Product, unique: true, sparse: true})
  productId: Ref<Product>
}

export class Wishlist {
  @prop({ type: () => [WishlistItem], default: [] })
  items: WishlistItem[];

  @prop({ ref: () => User, required: true })
  user: Ref<User>;
}

export const WishlistModel = getModelForClass(Wishlist);
