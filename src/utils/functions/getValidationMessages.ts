
import { Error } from "mongoose";
export default function (err: Error.ValidationError) {
  const { errors } = err;
  let messages: Array<string> = [];

  for (const err of Object.values(errors)) {
    messages.push(err.message);
  }

  return messages;
}