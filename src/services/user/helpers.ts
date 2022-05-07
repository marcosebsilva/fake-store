import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import IJwtPayload from '../../../interfaces/JwtPayload';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'dummy_key';

const hashPassword = (password: string) => bcrypt.hash(password, 10);

const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch(error) {
    return false;
  }
};

const verifyPassword = (expected: string, actual:string ) => bcrypt.compareSync(actual, expected);

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