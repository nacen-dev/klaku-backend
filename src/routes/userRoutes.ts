import express from "express";
import { getAllOrdersByUserIdHandler } from "../controller/orderController";
import {
  createUserHandler,
  forgotPasswordHandler,
  getCurrentUserHandler,
  resendLinkHandler,
  resetPasswordHandler,
  verifyUserHandler,
} from "../controller/userController";
import { requireUser } from "../middleware/requireUser";
import { validateResource } from "../middleware/validateResource";
import {
  createUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyUserEmailSchema,
  verifyUserIdSchema,
  verifyUserSchema,
} from "../schema/userSchema";

export const userRouter = express.Router();

userRouter.post(
  "/api/users",
  validateResource(createUserSchema),
  createUserHandler
);

userRouter.post(
  "/api/users/verify/resend/",
  validateResource(verifyUserEmailSchema),
  resendLinkHandler
);

userRouter.get(
  "/api/users/verify/:email/:token",
  validateResource(verifyUserSchema),
  verifyUserHandler
);

userRouter.post(
  "/api/users/forgotPassword",
  validateResource(forgotPasswordSchema),
  forgotPasswordHandler
);

userRouter.post(
  "/api/users/resetPassword/:id/:passwordResetCode",
  validateResource(resetPasswordSchema),
  resetPasswordHandler
);

userRouter.get("/api/users/me", requireUser, getCurrentUserHandler);

userRouter.get(
  "/api/users/orders/:userId",
  requireUser,
  validateResource(verifyUserIdSchema),
  getAllOrdersByUserIdHandler
);
