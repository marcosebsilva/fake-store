import User from "../models/user";
import statusCode from '../utils/dict/statusCodes.json';
import CustomError from "../utils/modules/CustomError";
import auth from "./auth_service";
import IBaseUser from "../../interfaces/BaseUser";
import { Error } from "mongoose";
import ICustomRequest from "../../interfaces/CustomRequest";
import getValidationMessages from "../utils/functions/getValidationMessages";
import IUserInDb from "../../interfaces/UserInDb";
const ADMIN_ROLE = 'admin';


export const register = async(body: IBaseUser, UserModel: any = User): Promise<{token: string}> => {
  try {
    const newUser = new UserModel(body);
    const result = await newUser.save();
    const token = auth.generateToken({
      email: result.email,
      role: result.role
    })

    return { token };
  } catch (error: any) {
    const DUPLICATE_KEY_ERROR_CODE = 11000;
    if (error instanceof Error.ValidationError) {
      const messages = getValidationMessages(error);
      throw new CustomError(messages, statusCode.BAD_REQUEST);
    }
    
    if(error.code === DUPLICATE_KEY_ERROR_CODE){
      throw new CustomError("Email already in registered.", statusCode.CONFLICT);
    }
    
    throw new CustomError("Internal error!", statusCode.INTERNAL_ERROR);
  }
};

export const login = async(body: IBaseUser, UserModel = User): Promise<{token: string}> => {
  const foundUser = await UserModel.findOne({ email: body.email });
  if(!foundUser) throw new CustomError("User not found.", statusCode.NOT_FOUND);

  await auth.verifyPassword(foundUser.password, body.password);
  const token = auth.generateToken({email: foundUser.email, role: foundUser.role});

  return { token };
};

export const getAll = async (req: ICustomRequest ) => {
  try {
    if (req.role !== ADMIN_ROLE) throw "You don't have access to this resource.";
    const user = await User.find({});
    return user;
  } catch (error:any) {
    throw new CustomError(error, statusCode.UNAUTHORIZED);
  }

};
export const getOne = async (req: ICustomRequest): Promise<IUserInDb | null> => {
  const user = await User.findOne({email: req.email});

  if (!user) throw new CustomError("User not found.", statusCode.NOT_FOUND);

  return user;
};

export default {
  register,
  login,
  getOne,
  getAll,
}