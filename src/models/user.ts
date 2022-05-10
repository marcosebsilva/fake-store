import { model, Schema, Types } from "mongoose";
import IUserInDb from '../../interfaces/UserInDb';
import auth from "../services/auth_service";
import regex from "../utils/dict/regex";

const userSchema = new Schema<IUserInDb>({
  _id: {
    type: Schema.Types.ObjectId,
    select: false,
    auto: true,
  },
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
  },
}, { versionKey: false });

userSchema.post('validate', async function() {
  this.password = await auth.hashPassword(this.password);
});


const User = model<IUserInDb>('User', userSchema);

export default User;