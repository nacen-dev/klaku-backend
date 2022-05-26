import { object, string, number, TypeOf } from "zod";

export const verifyOrderIdSchema = object({
  params: object({
    orderId: string({ required_error: "Order Id is required" }).regex(
      /^[0-9a-fA-F]{24}$/,
      { message: "Invalid format" }
    ),
  }),
});


export type VerifyOrderIdInput = TypeOf<typeof verifyOrderIdSchema>["params"];
