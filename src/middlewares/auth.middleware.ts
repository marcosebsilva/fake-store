import { NextFunction, Response } from "express";
import auth_service from "../services/auth.service";
import statusCodes from '../utils/dict/statusCodes.json';
import CustomError from "../utils/modules/CustomError";
import ICustomRequest from '../../interfaces/CustomRequest';

export default async (req: ICustomRequest, _res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new CustomError("Missing access token.",statusCodes.BAD_REQUEST)

    const normalizedToken = authorization.replace(/bearer/i, "").trim();

    const user = auth_service.verifyToken(normalizedToken);

    req.email = user.data.email;
    req.role = user.data.role;
    next();
  } catch (error) {
    next(error);
  }
};