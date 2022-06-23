import { Request, Response } from "express";
import { log } from "../utils/logger";
import { sendEmail } from "../utils/mailer";
import { nanoid } from "nanoid";

import {
  CreateUserInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  VerifyUserEmailInput,
  VerifyUserInput,
} from "../schema/userSchema";
import {
  createUser,
  findUserById,
  findUserByEmail,
  findUserByIdAndEmail,
} from "../service/userService";
import { createCart } from "../service/cartService";
import { createWishlist } from "../service/wishlistService";
import {
  createToken,
  deleteToken,
  findToken,
  findTokenByEmail,
} from "../service/tokenService";
import { createConfirmationURL } from "../utils/createConfirmationURL";
import config from "config";

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) => {
  const body = req.body;
  try {
    const user = await createUser(body);
    const token = await createToken(user._id);
    const clientURL = config.get("clientURL");

    await sendEmail({
      from: "klaku@klaku-clothing.vercel.app",
      to: user.email,
      subject: "Account Verification Link",
      text: `Hello ${
        user.firstName
      } Please verify your account by clicking the link: \n ${createConfirmationURL(
        clientURL as string,
        user.email,
        token.token
      )}`,
    });
    await createCart(user._id);
    await createWishlist(user._id);
    return res.status(200).json({
      message: `A verification email has been sent to ${user.email}. It will expire after 24 hours.`,
    });
  } catch (e: any) {
    if (e.code === 11000) {
      return res
        .status(409)
        .send("The account already exists. Please login instead.");
    }
    log.info(e);
    return res
      .status(500)
      .send("An error has occurred, please try again later.");
  }
};

export const verifyUserHandler = async (
  req: Request<{}, {}, VerifyUserInput>,
  res: Response
) => {
  const { email, token } = req.body;
  try {
    const tokenData = await findToken(token);

    if (!tokenData) {
      return res.status(400).json({
        message:
          "Your verification link may have expired. Please click on resend to get a new verification link that will be sent to your email.",
        expired: true,
      });
    }

    const user = await findUserByIdAndEmail(tokenData.userId, email);

    if (!user)
      return res
        .status(401)
        .json({ message: "Unable to verify user.", expired: false });

    if (user.verified)
      return res
        .status(200)
        .json({
          message: "User is already verified. Please login instead.",
          verified: true,
        });

    user.verified = true;

    await user.save();

    await deleteToken(tokenData.userId);

    return res
      .status(200)
      .json({ message: "User successfully verified.", verified: true });
  } catch (error) {
    return res.status(500).json(error);
  }
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
    from: "klaku@klaku-clothing.vercel.app",
    to: user.email,
    subject: "Reset your password",
    text: `Password reset code: ${passwordResetCode}`,
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

export const resendLinkHandler = async (
  req: Request<{}, {}, VerifyUserEmailInput>,
  res: Response
) => {
  const { email } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(200).json({
        message:
          "If the user is registered an email will be sent for verification",
      });
    }

    if (user.verified) {
      return res
        .status(200)
        .json({
          message: "User is already verified. Please login instead.",
          verified: true,
        });
    }

    // Check if token exist
    const token = await findTokenByEmail(email);
    // Delete token if it exist
    if (token) {
      await deleteToken(token.userId);
    }

    // generate new token
    const newToken = await createToken(user._id);

    const clientURL = config.get("clientURL");

    await sendEmail({
      from: "klaku-clothing.vercel.app",
      to: user.email,
      subject: "Account Verification Link",
      text: `Hello ${
        user.firstName
      } Please verify your account by clicking the link: \n ${createConfirmationURL(
        clientURL as string,
        user.email,
        newToken.token
      )}`,
    });

    return res.status(200).json({
      message: `A verification email has been sent to ${user.email}. It will expire after 24 hours. If you did not get an email click on resend verification.`,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
