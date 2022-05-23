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

export const getProductById = (id: string) => {
  return ProductModel.findById(id);
}

export const deleteProductById = (id: string) => {
  return ProductModel.findByIdAndDelete(id);
}

export const updateProductById = (id: string, data: Partial<Product>) => {
  return ProductModel.findByIdAndUpdate(id, data, { new: true});
}