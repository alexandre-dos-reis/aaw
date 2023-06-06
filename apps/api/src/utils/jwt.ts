import jwt from "jsonwebtoken";
import { ENV } from "./env";

export const jwtEncode = (payload: string | object | Buffer) => {
  return jwt.sign(payload, ENV.JWT_SECRET);
};

export const jwtDecode = (token: string) => {
  return jwt.decode(token);
};
