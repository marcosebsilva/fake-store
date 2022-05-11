import { Request, Response, NextFunction } from "express";
import productService from '../services/product.service';
import statusCode from '../utils/dict/statusCodes.json';

const getAll = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const users = await productService.getAll();
    response.status(statusCode.OK).json(users);
  } catch (error) {
    next(error);
  }
};

const getOne = async (request: Request, response: Response, next: NextFunction) => {
  const { id } = request.params;
  try {
    const users = await productService.getOne(id);
    response.status(statusCode.OK).json(users);
  } catch (error) {
    next(error);
  }
};

const addOne = async (request: Request, response: Response, next: NextFunction) => {
  try {
    await productService.addOne(request);
    response.sendStatus(statusCode.OK);
  } catch (error) {
    next(error);
  }
};


export default {
  getAll,
  getOne,
  addOne,
}
