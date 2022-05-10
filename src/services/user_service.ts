import User from "../models/user";
import statusCode from '../utils/dict/statusCodes.json';
import CustomError from "../utils/modules/CustomError";
import auth from "./auth_service";
import IBaseUser from "../../interfaces/BaseUser";
import { Error } from "mongoose";

const ADMIN_ROLE = 'admin';


export const register = async(body: IBaseUser, UserModel: any = User) => {
  try {
    const newUser = new UserModel(body);
    const result = await newUser.save();
    const token = auth.generateToken({
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

  await auth.verifyPassword(foundUser.password, body.password);

  const token = auth.generateToken({email: foundUser.email, role: foundUser.role});

  return { token };
};

export const getAll = async (token: string) => {
  try {
    const tokenPayload = await auth.verifyToken(token);
    if (tokenPayload.role !== ADMIN_ROLE) throw "You don't have access to this resource.";

    const result = await User.find({});
    return result;
    
  } catch (error:any) {
    console.log("cai no erro");
    // throw new CustomError(error, statusCode.UNAUTHORIZED);
  }

};
export const getOne = async (token: string) => {

};

export default {
  register,
  login,
  getOne,
  getAll,
}