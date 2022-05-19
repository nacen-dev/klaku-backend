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
): T | null {
  const publicKey = Buffer.from(config.get<string>(keyName), "base64").toString(
    "ascii"
  );

  try {
    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (e) {
    return null;
  }
}
