import CustomError from "../utils/modules/CustomError";
import { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";

const errorMiddleware = (err: CustomError , _req: Request, res: Response, _next: NextFunction) => {
  let responseJson: Object;
  if (err.error instanceof Error.ValidationError) {
    const { errors } = err.error;
    const errorMessages = Object.keys(errors).map((error) => errors[error].message);
    responseJson = { messages: errorMessages };
  } else {
    responseJson = { message: [err.error] }
  }
  res.status(err.statusCode).json(responseJson);
};

export default errorMiddleware;