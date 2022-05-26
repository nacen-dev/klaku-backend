import { object, string, TypeOf, undefined as zodUndefined } from "zod";

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: "Full name is required",
    }),
    lastName: string({
      required_error: "Full name is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password is too short, minimum password length is 6 characters"),
    passwordConfirmation: string({
      required_error: "Password confirmation is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
  query: object({}).optional(),
  params: object({}).optional()
}).strict();

export const verifyUserSchema = object({
  params: object({
    id: string(),
    verificationCode: string(),
  }),
});

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }),
});

export const resetPasswordSchema = object({
  params: object({
    id: string(),
    passwordResetCode: string(),
  }),
  body: object({
    password: string({
      required_error: "Password is required",
    }).min(6, "Password is too short, minimum password length is 6 characters"),
    passwordConfirmation: string({
      required_error: "Password confirmation is required",
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export const verifyUserIdSchema = object({
  params: object({
    userId: string({ required_error: "Id is required" }).regex(
      /^[0-9a-fA-F]{24}$/,
      { message: "Invalid format" }
    ),
  }),
});

export type VerifyUserIdInput = TypeOf<typeof verifyUserIdSchema>["params"];
export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>["params"];
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>["body"];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
