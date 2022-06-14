import jwt from "jsonwebtoken";
import config from "config";

type PrivateKey = "accessTokenPrivateKey" | "refreshTokenPrivateKey";
type PublicKey = "accessTokenPublicKey" | "refreshTokenPublicKey";

export function signJwt(
  object: Object,
  keyName: PrivateKey,
  options?: jwt.SignOptions | undefined
) {
  const signingKey = Buffer.from(
    config.get<string>(keyName),
    "base64"
  ).toString("ascii");

  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt<T>(
  token: string,
  keyName: PublicKey
): { payload: T | null; expired: boolean } {
  const publicKey = Buffer.from(config.get<string>(keyName), "base64").toString(
    "ascii"
  );

  try {
    const decoded = jwt.verify(token, publicKey);
    return { payload: decoded as T, expired: false };
  } catch (e) {
    return { payload: null, expired: true };
  }
}
