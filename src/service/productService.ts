import { ProductModel } from "../model/productModel"

export const getAllProducts = (category?: string) => {
  if (category) {
    return ProductModel.find({category: category})
  }
  return ProductModel.find();
}