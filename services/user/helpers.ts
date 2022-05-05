import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import IJwtPayload from '../../interfaces/JwtPayload';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'dummy_key';

export const hashPassword = (password: string) => bcrypt.hash(password, 10);

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch(error) {
    return false;
  }
};

export const generateToken = (data: IJwtPayload) => {
  const token = jwt.sign({ data }, JWT_SECRET, {
    expiresIn: '1h',
    algorithm: 'HS256'
  });

  return token;
};