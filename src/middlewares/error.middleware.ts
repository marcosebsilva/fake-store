import CustomError from "../utils/modules/CustomError";
import { Request, Response, NextFunction } from "express";

const errorMiddleware = (err: CustomError , _req: Request, res: Response, _next: NextFunction) => {
  let responseJson;
  if (Array.isArray(err.message)) {
    responseJson = { messages: [...err.message] };
  } else {
    responseJson = { message: [err.message] }
  }
  res.status(err.statusCode).json(responseJson);
};

export default errorMiddleware;