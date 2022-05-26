import { NextFunction, Request, Response } from "express";
import { UserModel } from "../model/userModel";

export const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (!user) return res.sendStatus(403);
  try {
    const userData = await UserModel.findById(user._id);
    if (userData?.isAdmin) return next();
  } catch (error) {
    return res.sendStatus(403);
  }
  return res.sendStatus(403);
};
