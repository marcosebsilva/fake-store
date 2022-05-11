import { Types } from "mongoose";

export default interface IProductInDb {
  name: string,
  price: number,
  _id: Types.ObjectId,
}