import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import { appOptions } from "~/config/app-options";
import { prismaPlugin } from "~/plugins";
import { reactAdminModule } from "~/modules/react-admin";
import { authModule } from "./modules/auth";
import { userPlugin } from "./plugins/user-plugin";
import { privateRoutePlugin } from "./plugins/private-routes-plugin";

const app = Fastify(appOptions);

app.register(cors, {
  credentials: true,
  origin: "http://127.0.0.1:5173",
});

// https://stackoverflow.com/questions/66004037/cookies-with-cors
// https://cors-errors.info/faq#cdc8

app.register(cookie);
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
