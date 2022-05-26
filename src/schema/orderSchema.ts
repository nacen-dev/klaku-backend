import { object, string, TypeOf, date, enum as zodEnum } from "zod";

export const verifyOrderIdSchema = object({
  params: object({
    orderId: string({ required_error: "Order Id is required" }).regex(
      /^[0-9a-fA-F]{24}$/,
      { message: "Invalid format" }
    ),
  }),
});

export const verifyOrderUpdateSchema = object({
  body: object({
    paidAt: date().optional(),
    orderStatus: zodEnum([
      "To Pay",
      "To Ship",
      "To Receive",
      "Completed",
      "Cancelled",
      "Return/Refund",
    ]),
  }),
});

export type VerifyOrderIdInput = TypeOf<typeof verifyOrderIdSchema>["params"];
export type VerifyOrderUpdateInput = TypeOf<typeof verifyOrderUpdateSchema>["body"]
