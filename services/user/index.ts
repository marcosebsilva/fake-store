import User from "../../models/user";
import statusCode from '../../utils/dict/statusCodes.json';
import CustomError from "../../utils/modules/CustomError";
import { generateToken, verifyToken } from "./helpers";
import ILogin from "../../interfaces/BaseUser";
import bcrypt from 'bcrypt';
import IBaseUser from "../../interfaces/BaseUser";


export const register = async(body: IBaseUser) => {
  const error = new User(body).validateSync();
  if (error) throw new CustomError(error, statusCode.BAD_REQUEST);

  try {
    const result = await new User(body).save();
    const token = generateToken({
      email: result.email,
      role: result.role
    })
    return {
      token
    }
  } catch (error: any) {
    throw new CustomError(error, statusCode.CONFLICT);
  }
};

export const login = async(body: ILogin ) => {
  const foundUser = await User.findOne({ email: body.email });
  if(!foundUser) throw new CustomError('User not found.', statusCode.BAD_REQUEST);

  const isPasswordValid = bcrypt.compareSync(body.password, foundUser.password);
  if (!isPasswordValid) throw new CustomError('Wrong password.', statusCode.BAD_REQUEST);

  const token = generateToken({email: foundUser.email, role: foundUser.role});

  return { token };
};

export default {
  register,
  login
}