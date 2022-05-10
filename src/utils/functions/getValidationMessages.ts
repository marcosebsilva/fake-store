
import { Error } from "mongoose";
export default function (err: Error.ValidationError) {
  const { errors } = err;
  const messages: Array<string> = [];

  for (const err of Object.values(errors)) {
    messages.push(err.message);
  }

  return messages;
}