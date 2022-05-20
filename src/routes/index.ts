import express from "express";
import { authRouter } from "./authRoutes";
import { productRouter } from "./productRoutes";
import { userRouter } from "./userRoutes";

export const indexRouter = express.Router();

indexRouter.get("/healthcheck", (req, res) => res.sendStatus(200));

indexRouter.use(userRouter);
indexRouter.use(authRouter);
indexRouter.use(productRouter);