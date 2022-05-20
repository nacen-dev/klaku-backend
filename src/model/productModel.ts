import { getModelForClass, prop, Ref } from "@typegoose/typegoose";

class Review {
  @prop({required: true})
  name: string;

  @prop({required: true})
  comment: string;

  @prop({min: 0, max: 5})
  rating: number;
}

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

  @prop({ required: true})
  category: string;

  @prop({min: 0, max: 5})
  rating: number;

  @prop({required: true})
  quantity: number;  

  @prop()
  review: Review;
}

export const ProductModel = getModelForClass(Product, {
  schemaOptions: {
    timestamps: true
  }
});
