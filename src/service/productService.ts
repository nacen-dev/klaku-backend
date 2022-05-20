import { Product, ProductModel } from "../model/productModel"

export const getAllProducts = (category?: string) => {
  if (category) {
    return ProductModel.find({category: category})
  }
  return ProductModel.find();
}

export const createNewProduct = (product: Partial<Product>) => {
  return ProductModel.create(product);
}