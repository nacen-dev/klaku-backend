import { object, string, number, TypeOf } from "zod";

export const verifyCartSchema = object({
  body: object({
    items: object({
      productId: string({required_error: "Product ID is required"}),
      quantity: number({required_error: "Quantity is required"})
    }).array()
  }).strict()
})

export type verifyCartInput = TypeOf<typeof verifyCartSchema>["body"];