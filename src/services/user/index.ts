import User from "../../models/user";
import statusCode from '../../utils/dict/statusCodes.json';
import CustomError from "../../utils/modules/CustomError";
import helpers from "./helpers";
import bcrypt from 'bcrypt';
import IBaseUser from "../../../interfaces/BaseUser";
import { Error } from "mongoose";


export const register = async(body: IBaseUser, UserModel: any = User) => {
  try {
    const newUser = new UserModel(body);
    const result = await newUser.save();
    const token = helpers.generateToken({
      email: result.email,
      role: result.role
    })
    return { token };
  } catch (error: any) {
    if (error instanceof Error.ValidationError) {
      throw new CustomError(error, statusCode.BAD_REQUEST);
    } else {
      throw new CustomError('Email already in registered.', statusCode.CONFLICT);
    }
  }
};

export const login = async(body: IBaseUser, UserModel = User) => {
  const foundUser = await UserModel.findOne({ email: body.email });
  if(!foundUser) throw new CustomError('User not found.', statusCode.NOT_FOUND);

  const isPasswordValid = helpers.verifyPassword(body.password, foundUser.password);
  if (!isPasswordValid) throw new CustomError('Wrong password.', statusCode.UNAUTHORIZED);

  const token = helpers.generateToken({email: foundUser.email, role: foundUser.role});

  return { token };
};

export default {
  register,
  login
}