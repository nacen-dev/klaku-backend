import { User, UserModel } from "../model/userModel";

export const createUser = (input: Partial<User>) => {
  return UserModel.create(input);
};

export const findUserById = (id: string) => {
  return UserModel.findById(id);
};

export const findUserByEmail = (email: string) => {
  return UserModel.findOne({ email });
};

export const findUserByIdAndEmail = (id: string, email: string) => {
  return UserModel.findOne({ id, email });
};
