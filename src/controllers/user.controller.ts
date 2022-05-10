import { Request, Response, NextFunction } from "express";
import userService from '../services/user.service';
import statusCode from '../utils/dict/statusCodes.json';


const register = async(req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  try {
    const result = await userService.register(body);
    res.status(statusCode.CREATED).json(result);
  } catch (error) {
    next(error);
  }
};

const login = async(req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  try {
    const result = await userService.login(body);
    res.status(statusCode.OK).json(result);
  } catch(error) {
    next(error)
  }
};

const getOne = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.getOne(req);
    res.status(statusCode.OK).json(result);
  } catch (error) {
    next(error);
  }
};

const getAll = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.getAll(req);
    res.status(statusCode.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  login,
  register,
  getOne,
  getAll,
}
// const login;
// const updateCoins;