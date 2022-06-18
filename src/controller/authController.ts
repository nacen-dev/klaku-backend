import { Request, Response } from "express";
import { get } from "lodash";

import { CreateSessionInput } from "../schema/authSchema";
import {
  deleteSessionByUserId,
  findSessionById,
  RefreshTokenObject,
  signAccessToken,
  signRefreshToken,
} from "../service/authService";
import { findUserByEmail, findUserById } from "../service/userService";
import { verifyJwt } from "../utils/jwt";

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

  res.cookie("jwt", refreshToken, {
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
  const refreshToken = get(req, "headers.x-refresh");
  const refreshMessage = "Could not refresh the access token";

  const { payload, expired } = verifyJwt<RefreshTokenObject>(
    refreshToken,
    "refreshTokenPublicKey"
  );

  if (!payload) return res.status(401).send(refreshMessage);

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
  const user = res.locals.user;
  try {
    if (user) {
      await deleteSessionByUserId(user._id);
    }
  } catch (error) {
    return res.sendStatus(500);
  }

  return res.sendStatus(200);
};
