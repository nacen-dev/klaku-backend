import { Request, Response } from "express";
import { log } from "../utils/logger";
import { sendEmail } from "../utils/mailer";
import { nanoid } from "nanoid";

import {
  CreateUserInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  VerifyUserInput,
} from "../schema/userSchema";
import {
  createUser,
  findUserById,
  findUserByEmail,
} from "../service/userService";
import { createCart } from "../service/cartService";

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) => {
  const body = req.body;
  try {
    const user = await createUser(body);
    await sendEmail({
      from: "test@nacen.dev",
      to: user.email,
      subject: "Please verify your account",
      text: `Verification Code: ${user.verificationCode}. Id: ${user._id}`,
    });
    await createCart(user._id);
    return res.send("User successfully created");
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(409).send("Account already exists.");
    }
    return res.status(500).send(e);
  }
};

export const verifyUserHandler = async (
  req: Request<VerifyUserInput>,
  res: Response
) => {
  const id = req.params.id;
  const verificationCode = req.params.verificationCode;

  const user = await findUserById(id);
  if (!user) {
    return res.send("Could not verify user.");
  }

  if (user.verified) {
    return res.send("User is already verified.");
  }

  if (user.verificationCode === verificationCode) {
    user.verified = true;

    await user.save();

    return res.send("User successfully verified.");
  }

  return res.send("Could not verify user");
};

export const forgotPasswordHandler = async (
  req: Request<{}, {}, ForgotPasswordInput>,
  res: Response
) => {
  const message =
    "If a user with that email is registered you will receive a password reset email";

  const { email } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    log.debug(`User with email ${email} does not exist`);
    return res.send(message);
  }

  if (!user.verified) {
    return res.send("User is not verified");
  }

  const passwordResetCode = nanoid();

  user.passwordResetCode = passwordResetCode;

  await user.save();

  await sendEmail({
    to: user.email,
    from: "test@example.com",
    subject: "Reset your password",
    text: `Password reset code: ${passwordResetCode} ID: ${user.id}`,
  });

  log.debug(`Password reset email sent to ${user.email}`);

  return res.send(message);
};

export const resetPasswordHandler = async (
  req: Request<ResetPasswordInput["params"], {}, ResetPasswordInput["body"]>,
  res: Response
) => {
  const { id, passwordResetCode } = req.params;
  const { password } = req.body;

  const user = await findUserById(id);

  if (
    !user ||
    !user.passwordResetCode ||
    user.passwordResetCode !== passwordResetCode
  ) {
    return res.status(400).send("Could not reset user's password");
  }

  user.passwordResetCode = null;

  user.password = password;

  await user.save();

  return res.send("Successfully updated user password");
};

export const getCurrentUserHandler = async (req: Request, res: Response) => {
  return res.send(res.locals.user);
};
