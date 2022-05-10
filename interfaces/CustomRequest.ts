import {Request} from 'express';


export default interface ICustomRequest extends Request {
  email?: string,
  role?: string,
}
