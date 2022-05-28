import { object, string, number, TypeOf } from "zod";

export const verifyCartSchema = object({
  body: object({
    items: object({
      productId: string({ required_error: "Product ID is required" }).regex(
        /^[0-9a-fA-F]{24}$/,
        { message: "Invalid format" }
      ),
      quantity: number({ required_error: "Quantity is required" }).min(1),
    }).array(),
  }).strict(),
});

export type verifyCartInput = TypeOf<typeof verifyCartSchema>["body"];
