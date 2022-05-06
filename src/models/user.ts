import { model, Schema, Types } from "mongoose";
import IUserInDb from '../../interfaces/UserInDb';
import { hashPassword } from "../services/user/helpers";
import regex from "../utils/dict/regex";
import statusCodes from '../utils/dict/statusCodes.json';

const userSchema = new Schema<IUserInDb>({
  name: {
    type: String,
    required: [true, 'Name field is required.'],
    minlength: [4, 'Name field is too short.'],
    trim: true
  },
  coins: {
    type: [],
  },
  email: {
    type: String,
    required: [true, 'Email field is required.'],
    unique: true,
    match: [regex.VALID_EMAIL, 'Invalid email field.'],
    trim: true,
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'user'],
      message: "You can't register a '{VALUE}' role."
    },
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Password field is required.'],
    minlength: [8, 'Weak password.']
  }
});

userSchema.post('validate', async function() {
  this.password = await hashPassword(this.password);
});


const User = model<IUserInDb>('User', userSchema);

export default User;