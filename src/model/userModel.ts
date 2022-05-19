import {
  DocumentType,
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
  Severity,
} from "@typegoose/typegoose";
import argon2 from "argon2";
import { nanoid } from "nanoid";
import { log } from "../utils/logger";

export const privateFields = [
  "password",
  "__v",
  "verificationCode",
  "passwordResetCode",
  "verified"
]

@pre<User>("save", async function () {
  if (this.isModified("password")) {
    const hash = await argon2.hash(this.password);
    this.password = hash;
  }
  return;
})
@index({ email: 1 })
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class User {
  @prop({ lowercase: true, required: true, unique: true })
  email: string;

  @prop({ required: true })
  firstName: string;

  @prop({ required: true })
  lastName: string;

  @prop({ required: true })
  password: string;

  @prop()
  passwordResetCode: string | null;

  @prop({ required: true, default: () => nanoid() })
  verificationCode: string;

  @prop({ default: false })
  verified: boolean;

  async validatePassword(this: DocumentType<User>, inputPassword: string) {
    try {
      return await argon2.verify(this.password, inputPassword);
    } catch (e) {
      log.error(e, "Could not validate password");
      return false;
    }
  }
}

export const UserModel = getModelForClass(User);
