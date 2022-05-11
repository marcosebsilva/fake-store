import { NextFunction, Response } from "express";
import auth_service from "../services/auth.service";
import exceptions from "../utils/dict/exceptions";
import ICustomRequest from '../../interfaces/CustomRequest';

export default async (request: ICustomRequest, _response: Response, next: NextFunction) => {
  try {
    const { authorization } = request.headers;
    if (!authorization) throw exceptions.MISSING_AUTH_TOKEN;

    const normalizedToken = authorization.replace(/bearer/i, "").trim();

    const user = auth_service.verifyToken(normalizedToken);

    request.email = user.data.email;
    request.role = user.data.role;
    next();
  } catch (error) {
    next(error);
  }
};