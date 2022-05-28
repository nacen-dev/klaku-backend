import { object, string, number, TypeOf } from "zod";

export const verifyProductSchema = object({
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
    price: number({
      required_error: "Price is required",
    }).gte(0),
    category: string({
      required_error: "Category is required",
    }),
    stock: number({
      required_error: "Stock is required",
    })
      .int({ message: "Stock must be an integer" })
      .gte(0, { message: "Stock must be greater than or equal to 0" }),
    size: string().optional(),
    color: string().optional(),
    reviews: object({
      name: string({ required_error: "Reviewer name is required" }),
      comment: string({ required_error: "Comment is required" }),
      rating: number({ required_error: "Rating is required" })
        .positive({ message: "Rating must be less than or equal to 5" })
        .lte(5, { message: "Rating must be less than or equal to 5" }),
    })
      .array()
      .optional(),
    rating: number()
      .positive({ message: "Rating must be less than or equal to 5" })
      .lte(5, { message: "Rating must be less than or equal to 5" })
      .optional(),
  }),
});

export const verifyProductIdSchema = object({
  params: object({
    productId: string({
      required_error: "Id is required",
    }),
  }),
});

export type verifyProductInput = TypeOf<typeof verifyProductSchema>["body"];
export type verifyProductIdInput = TypeOf<
  typeof verifyProductIdSchema
>["params"];
