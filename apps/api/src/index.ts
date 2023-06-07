import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import { appOptions } from "~/config/app-options";
import { prismaPlugin } from "~/plugins";
import { reactAdminModule } from "~/modules/react-admin";
import { authModule } from "./modules/auth";
import { userPlugin } from "./plugins/user-plugin";
import { privateRoutePlugin } from "./plugins/private-routes-plugin";
import { cookieOptions } from "./config/cookie-options";
import { corsOptions } from "./config/cors-options";
import { ENV } from "./utils/env";

const app = Fastify(appOptions);

app.register(cors, corsOptions);
app.register(cookie, cookieOptions);
app.register(userPlugin);
app.register(privateRoutePlugin);
app.register(prismaPlugin);
app.register(authModule, { prefix: "/auth" });
app.register(reactAdminModule, { prefix: "/ra" });

const main = async () => {
  try {
    await app.listen({ port: 3002, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

// Gracefull shutdown
["SIGINT", "SIGTERM"].forEach((s) => {
  process.on(s, async () => {
    await app.close();
    process.exit(0);
  });
});

main();
