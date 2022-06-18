import { Request, Response } from "express";
import { get } from "lodash";

import { CreateSessionInput } from "../schema/authSchema";
import {
  deleteSessionById,
  findSessionById,
  RefreshTokenObject,
  signAccessToken,
  signRefreshToken,
} from "../service/authService";
import { findUserByEmail, findUserById } from "../service/userService";
import { verifyJwt } from "../utils/jwt";
import { log } from "../utils/logger";

export const createSessionHandler = async (
  req: Request<{}, {}, CreateSessionInput>,
  res: Response
) => {
  const message = "Invalid email or password";
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(401).send(message);
  }

  if (!user.verified) {
    return res.send("Please verify your email");
  }

  const isValid = await user.validatePassword(password);

  if (!isValid) {
    return res.status(401).send(message);
  }

  const accessToken = signAccessToken(user);

  const refreshToken = await signRefreshToken({ userId: user._id });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    accessToken,
  });
};

export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response
) => {
  const refreshToken = get(req, "cookies.refreshToken");
  if (!refreshToken) return res.sendStatus(401);

  const refreshMessage = "Could not refresh the access token";

  const { payload, expired } = verifyJwt<RefreshTokenObject>(
    refreshToken,
    "refreshTokenPublicKey"
  );

  if (!payload || expired) return res.status(401).send(refreshMessage);

  const session = await findSessionById(payload.session);

  if (!session || !session.valid) {
    return res.status(401).send(refreshMessage);
  }

  const user = await findUserById(String(session.user));

  if (!user) {
    return res.status(401).send(refreshMessage);
  }

  const accessToken = signAccessToken(user);

  return res.send({ accessToken });
};

export const deleteSessionByUserIdHandler = async (
  req: Request,
  res: Response
) => {
  const refreshToken = get(req, "cookies.refreshToken");
  if (!refreshToken) return res.sendStatus(204);

  const { payload } = verifyJwt<RefreshTokenObject>(
    refreshToken,
    "refreshTokenPublicKey"
  );

  if (payload) {
    await deleteSessionById(payload.session);
  }

  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  return res.sendStatus(204);
};
