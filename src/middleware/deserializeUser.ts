import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../utils/jwt";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = (req.headers.authorization || "").replace(
    /^Bearer\s/,
    ""
  );

  if (!accessToken) return next();

  const { payload } = verifyJwt(accessToken, "accessTokenPublicKey");

  if (payload) {
    res.locals.user = payload;
  }

  return next();
};
