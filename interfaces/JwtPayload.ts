import { JwtPayload } from "jsonwebtoken";
import IBaseUser from "./BaseUser";
import IUserInDb from "./UserInDb";

export default interface IJwtPayload extends JwtPayload {
  email: IBaseUser['email'],
  role: IUserInDb['role'],  
}