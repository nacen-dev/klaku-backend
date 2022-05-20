import { object, string, number, TypeOf } from "zod";

export const createNewProductSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    description: string({
      required_error: "Description is required",
    }),
    image: string({
      required_error: "Image is required",
    }),
    price: string({
      required_error: "Price is required",
    }),
    category: string({
      required_error: "Category is required",
    }),
    quantity: number({
      required_error: "Quantity is required",
    }).gte(0)
  })
});