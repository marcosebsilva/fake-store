
import { Error } from "mongoose";
export default function (err: Error.ValidationError) {
  const { errors } = err;
  const messages: Array<string> = [];

  for (const error of Object.values(errors)) {
    messages.push(error.message);
  }

  return messages;
}