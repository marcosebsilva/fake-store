import User from "../models/user.model";
import auth from "./auth.service";
import IBaseUser from "../../interfaces/BaseUser";
import { Error, Model } from "mongoose";
import ICustomRequest from "../../interfaces/CustomRequest";
import getValidationMessages from "../utils/functions/getValidationMessages";
import IUserInDb from "../../interfaces/UserInDb";
import exceptions from "../utils/dict/exceptions";
const ADMIN_ROLE = 'admin';
const USER_ROLE = 'user';


export const register = async(user: IBaseUser, UserModel: Model<IUserInDb> = User) => {
  try {
    const newUser = new UserModel(user);
    const queryResult = await newUser.save();
    const token = auth.generateToken({
      email: queryResult.email,
      role: queryResult.role
    })

    return { token };
  } catch (error: any) {
    const DUPLICATE_KEY_ERROR_CODE = 11000;

    if (error instanceof Error.ValidationError) {
      const messages = getValidationMessages(error);
      throw exceptions.VALIDATION_ERROR(messages);
    }
    
    if(error.code === DUPLICATE_KEY_ERROR_CODE){
      throw exceptions.USER_ALREADY_REGISTERED
    }
    
    throw exceptions.INTERNAL_ERROR;
  }
};
export const login = async(user: IBaseUser, UserModel = User) => {
  const foundUser = await UserModel.findOne({
    email: user.email
  });

  if (!foundUser) throw exceptions.USER_NOT_FOUND;

  await auth.verifyPassword(foundUser.password, user.password);

  const token = auth.generateToken({
    email: foundUser.email,
    role: foundUser.role
  });

  return { token };
};
export const find = async (request: ICustomRequest ) => {
  if (request.role === ADMIN_ROLE) {
    const result = await User.find({});
    return {users: result};
  } 
  
  if (request.role === USER_ROLE) {
    const result = await User.findOne({email: request.email});
    if (!result) throw exceptions.USER_NOT_FOUND;
    return result;
  }
};
export const updateCoinAmount = async (request: ICustomRequest) => {
  const user = await User.findOne({
    email: request.email
  });

  if (!user) throw exceptions.USER_NOT_FOUND

  if (request.role !== ADMIN_ROLE) {
    throw exceptions.UNAUTHORIZED_USER;
  }

  await user.updateOne({
    coins: request.body.amount
  });
};

export default {
  register,
  updateCoinAmount,
  login,
  find,
}