import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "./userModel";

export class Token {
  @prop({ required: true, ref: () => User})
  userId: Ref<User>;
  @prop({ required: true })
  token: string;
}

export const TokenModel = getModelForClass(Token, {
  schemaOptions: {
    expires: 86400000,
    timestamps: true,
  },
});
