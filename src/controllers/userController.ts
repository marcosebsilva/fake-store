import { Request, Response, NextFunction } from "express";
import authService from '../services/user';


const register = async(req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  try {
    const result = await authService.register(body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const login = async(req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  try {
    const result = await authService.login(body);
    res.status(200).json(result);
  } catch(error) {
    next(error)
  }
};

export default {
  login,
  register
}
// const login;
// const updateCoins;