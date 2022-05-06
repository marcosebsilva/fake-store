import { Error } from "mongoose";

export default class CustomError {
  name: string;
  error: Error.ValidationError | string;
  statusCode: number;
  constructor(error: Error.ValidationError | string, statusCode: number) {
    this.name = 'CustomError';
    this.error = error;
    this.statusCode = statusCode;
  }
}