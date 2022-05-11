import { Request, Response, NextFunction } from "express";
import ICustomError from '../../interfaces/CustomError';


const errorMiddleware = (error: ICustomError , _req: Request, response: Response, _next: NextFunction) => {
  const { message, status } = error;
  response.status(status).json({ message: message });
};

export default errorMiddleware;