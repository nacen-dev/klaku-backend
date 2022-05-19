import { getModelForClass, prop, Ref } from "@typegoose/typegoose";

export class Product {
  @prop({ required: true, unique: true })
  name: string;

  @prop({ required: true })
  description: string;

  @prop({ required: true })
  image: string;

  @prop()
  size: string;

  @prop()
  color: string;

  @prop({ required: true})
  price: number;
}

export const ProductModel = getModelForClass(Product, {
  schemaOptions: {
    timestamps: true
  }
});
