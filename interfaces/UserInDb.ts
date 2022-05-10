import { Types } from 'mongoose';
import IBaseUser from './BaseUser';


export default interface IUserInDb extends IBaseUser{
  coins: number,
  role: string,
  _id: Types.ObjectId,
}
