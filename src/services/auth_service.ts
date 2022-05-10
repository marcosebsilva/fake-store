import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import IJwtPayload from '../../interfaces/JwtPayload';
import CustomError from '../utils/modules/CustomError';
import statusCode from '../utils/dict/statusCodes.json';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'dummy_key';

const hashPassword = (password: string) => bcrypt.hash(password, 10);

const verifyToken =  (token: string): IJwtPayload => {
  try {
    const data = jwt.verify(token, JWT_SECRET);
    return data as IJwtPayload;
  } catch (error) {
    throw new CustomError("JWT malformed.", statusCode.BAD_REQUEST);
  }
};

const verifyPassword = async (expected: string, actual:string ) => {
  const isPasswordValid = await bcrypt.compareSync(actual, expected);
  if (!isPasswordValid) {
    throw new CustomError('Wrong password.', statusCode.UNAUTHORIZED);
  }
};

const generateToken = (data: IJwtPayload) => {
  const token = jwt.sign({ data }, JWT_SECRET, {
    expiresIn: '1h',
    algorithm: 'HS256'
  });

  return token;
};


export default {
  hashPassword,
  verifyToken,
  verifyPassword,
  generateToken
}