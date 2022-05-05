import IBaseUser from './BaseUser';

interface Coins {
  name: string,
  amount: number
}

export default interface IUserInDb extends IBaseUser{
  coins: Coins[],
  role: string
}
