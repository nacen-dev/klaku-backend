import { Request, Response } from "express";
import { get } from "lodash";

import { CreateSessionInput } from "../schema/authSchema";
import {
  findSessionById,
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
    return res.status(401).json({ message: message });
  }

  if (!user.verified) {
    return res.send("Please verify your email");
  }

  const isValid = await user.validatePassword(password);

  if (!isValid) {
    return res.status(401).json({ message: message });
  }

  const accessToken = signAccessToken(user);

  const refreshToken = await signRefreshToken({ userId: user._id });

  return res.status(200).json({
    accessToken,
    refreshToken,
  });
};

export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response
) => {
  const refreshToken = get(req, "headers.x-refresh");
  const refreshMessage = "Could not refresh the access token";

  const decoded = verifyJwt<{ session: string }>(
    refreshToken,
    "refreshTokenPublicKey"
  );

  if (!decoded) return res.status(401).send(refreshMessage);

  const session = await findSessionById(decoded.session);

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
