import { DocumentType } from "@typegoose/typegoose";
import { omit } from "lodash";
import { SessionModel } from "../model/sessionModel";
import { privateFields, User } from "../model/userModel";
import { signJwt } from "../utils/jwt";

type UserId = { userId: string };
export type RefreshTokenObject = { session: string };

export const createSession = async ({ userId }: UserId) => {
  return SessionModel.create({ user: userId });
};

export const signRefreshToken = async ({ userId }: UserId) => {
  const session = await createSession({ userId });

  const refreshToken = signJwt(
    { session: session._id },
    "refreshTokenPrivateKey",
    {
      expiresIn: "1y",
    }
  );

  return refreshToken;
};

export const signAccessToken = (user: DocumentType<User>) => {
  const payload = omit(user.toJSON(), privateFields);

  const accessToken = signJwt(payload, "accessTokenPrivateKey", {
    expiresIn: "15s",
  });

  return accessToken;
};

export const findSessionById = (id: string) => {
  return SessionModel.findById(id);
};

export const deleteSessionById = (id: string) => {
  return SessionModel.deleteOne({_id: id});
}

export const findSessionByUserId = (userId: string) => {
  return SessionModel.findOne({ user: userId });
};

