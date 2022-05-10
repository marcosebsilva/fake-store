import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import IJwtPayload from '../../interfaces/JwtPayload';
import CustomError from '../utils/modules/CustomError';
import statusCode from '../utils/dict/statusCodes.json';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'dummy_key';

const hashPassword = (password: string) => bcrypt.hash(password, 10);

const verifyToken =  (token: string): IJwtPayload => {
  const data = jwt.verify(token, JWT_SECRET);
  return data as IJwtPayload;
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