import { Request, Response, NextFunction } from "express";
import authService from '../services/user_service';
import statusCode from '../utils/dict/statusCodes.json';


const register = async(req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  try {
    const result = await authService.register(body);
    res.status(statusCode.CREATED).json(result);
  } catch (error) {
    next(error);
  }
};

const login = async(req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  try {
    const result = await authService.login(body);
    res.status(statusCode.OK).json(result);
  } catch(error) {
    next(error)
  }
};

const getOne = async(req: Request, res: Response, next: NextFunction) => {
  throw "failing";
};

const getAll = async(req: Request, res: Response, next: NextFunction) => {
  throw "failing";
};

export default {
  login,
  register,
  getOne,
  getAll,
}
// const login;
// const updateCoins;