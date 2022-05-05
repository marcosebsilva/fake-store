import IBaseUser from "./BaseUser";
import IUserInDb from "./UserInDb";

export default interface IJwtPayload {
  email: IBaseUser['email'],
  role: IUserInDb['role'],  
}