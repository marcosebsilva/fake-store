import { Types } from 'mongoose';
import IBaseUser from './BaseUser';

interface Coins {
  name: string,
  amount: number
}

export default interface IUserInDb extends IBaseUser{
  coins: Types.Array<Coins>,
  role: string,
  _id: Types.ObjectId,
}
