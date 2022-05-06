import { model, Schema } from "mongoose";
import IUserInDb from '../../interfaces/UserInDb';
import { hashPassword } from "../services/user/helpers";
import regex from "../utils/dict/regex";

const userSchema = new Schema<IUserInDb>({
  name: {
    type: String,
    required: [true, 'Name field is required.'],
    minlength: [4, 'Name field is too short.'],
    trim: true
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

userSchema.pre('validate', async function () {
  const userExists = await User.findOne({ email: this.email });
  if (userExists) {
    this.invalidate('email', 'Email already registered.');
  }
});

userSchema.pre('save', async function() {
  this.password = await hashPassword(this.password);
});


const User = model<IUserInDb>('User', userSchema);

export default User;