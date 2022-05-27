import { object, string, TypeOf, enum as zodEnum, number } from "zod";

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
    status: zodEnum(["To Receive", "Completed"]),
  }),
});

export const verifyOrderCreateSchema = object({
  body: object({
    orderItems: object(
      {
        quantity: number({
          required_error: "Product quantity is required",
        }).gte(1),
        product: string({ required_error: "Product id is required" }).regex(
          /^[0-9a-fA-F]{24}$/,
          { message: "Invalid format" }
        ),
      },
      { required_error: "Order Item is required" }
    )
      .array()
      .nonempty(),
    shippingAddress: object(
      {
        fullName: string({ required_error: "Full name is required" }),
        address: string({ required_error: "Address is required" }),
        city: string({ required_error: "City is required" }),
        postalCode: string({ required_error: "Postal Code is required" }),
        country: string({ required_error: "Country is required" }),
      },
      { required_error: "Shipping Address is required" }
    ),
    status: zodEnum(["To Pay", "To Ship"]),
  }).strict(),
});

export type VerifyOrderIdInput = TypeOf<typeof verifyOrderIdSchema>["params"];
export type VerifyOrderUpdateInput = TypeOf<
  typeof verifyOrderUpdateSchema
>["body"];
export type VerifyOrderCreateInput = TypeOf<
  typeof verifyOrderCreateSchema
>["body"];
