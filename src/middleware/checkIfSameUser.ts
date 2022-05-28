import { NextFunction, Request, Response } from "express";
import { VerifyUserIdInput } from "../schema/userSchema";

export const checkIfSameUser = (
  req: Request<VerifyUserIdInput>,
  res: Response,
  next: NextFunction
) => {
  if (req.params.userId !== res.locals.user._id)
    return res.status(403).json({
      message:
        "Requesting user is not the same with the current user logged in",
    });
  return next();
};
