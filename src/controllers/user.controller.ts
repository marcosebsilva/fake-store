import { Request, Response, NextFunction } from "express";
import userService from '../services/user.service';
import statusCode from '../utils/dict/statusCodes.json';


const register = async(request: Request, response: Response, next: NextFunction) => {
  const { body } = request;
  try {
    const result = await userService.register(body);
    response.status(statusCode.CREATED).json(result);
  } catch (error) {
    next(error);
  }
};

const login = async(request: Request, response: Response, next: NextFunction) => {
  const { body } = request;
  try {
    const result = await userService.login(body);
    response.status(statusCode.OK).json(result);
  } catch(error) {
    next(error)
  }
};

const find = async(request: Request, response: Response, next: NextFunction) => {
  try {
    const result = await userService.find(request);
    response.status(statusCode.OK).json(result);
  } catch (error) {
    next(error);
  }
};

const updateCoinAmount = async(request: Request, response: Response, next: NextFunction) => {
  try {
    await userService.updateCoinAmount(request);
    response.sendStatus(statusCode.OK)
  } catch (error) {
    next(error);
  }
};

export default {
  login,
  updateCoinAmount,
  register,
  find,
}