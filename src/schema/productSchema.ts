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
    size: string(),
    color: string(),
    reviews:  object({
      name: string({required_error: "Reviewer name is required"}),
      comment: string({required_error: "Comment is required"}),
      rating: number({required_error: "Rating is required"})
    }).array(),
    rating: number(),
    price: number({
      required_error: "Price is required",
    }).gte(0),
    category: string({
      required_error: "Category is required",
    }),
    quantity: number({
      required_error: "Quantity is required",
    }).gte(0)
  })
});

export const verifyProductIdSchema = object({
  params: object({
    id: string({
      required_error: "Id is required"
    })
  })
})

export type verifyProductInput = TypeOf<typeof verifyProductSchema>["body"]
export type verifyProductIdInput = TypeOf<typeof verifyProductIdSchema>["params"];