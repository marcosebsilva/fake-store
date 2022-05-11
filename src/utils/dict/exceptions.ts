import {
  BAD_REQUEST,
  NOT_FOUND,
  CONFLICT,
  UNAUTHORIZED,
  INTERNAL
} from './statusCodes.json';

const errorDetails = (message: string, status: number, ) => ({status, message });


export default {
  USER_NOT_FOUND: errorDetails("User not found.", NOT_FOUND),
  UNAUTHORIZED_USER: errorDetails("You don't have access to this resource", UNAUTHORIZED),
  MISSING_AUTH_TOKEN: errorDetails("Missing authentication token.", BAD_REQUEST),
  INVALID_USER_OR_PASSWORD: errorDetails("Invalid username or password.", UNAUTHORIZED),
  JWT_MALFORMED: errorDetails("Jwt malformed.", BAD_REQUEST),
  USER_ALREADY_REGISTERED: errorDetails("Email already registered.", CONFLICT),
  VALIDATION_ERROR: (message: Array<string>) => ({message, status: BAD_REQUEST}),
  INTERNAL_ERROR: errorDetails("Interal Error!", INTERNAL),
};