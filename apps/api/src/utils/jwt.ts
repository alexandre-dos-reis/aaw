import jwt, { JwtPayload } from "jsonwebtoken";
import { ENV } from "./env";

export const jwtEncode = (payload: string | object | Buffer) => {
  return jwt.sign(payload, ENV.JWT_SECRET);
};

export const jwtVerify = <TPayload extends {} = {}>(token: string) => {
  return jwt.verify(token, ENV.JWT_SECRET) as TPayload & JwtPayload;
};
