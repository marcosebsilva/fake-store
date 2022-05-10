export default class CustomError {
  name: string;
  message:  Array<string> | string;
  statusCode: number;
  constructor(message:  Array<string> | string, statusCode: number) {
    this.name = 'CustomError';
    this.message = message;
    this.statusCode = statusCode;
  }
}