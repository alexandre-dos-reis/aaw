import { FastifyCookieOptions } from "@fastify/cookie";
import { ENV } from "~/utils/env";

export const cookieOptions: FastifyCookieOptions = {
  secret: ENV.COOKIE_SECRET,
  parseOptions: {
    signed: true,
    domain: ENV.COOKIE_DOMAIN,
    sameSite: "none",
    maxAge: 604800,
    path: "/",
    httpOnly: true,
    secure: true,
  },
};
