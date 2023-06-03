import Fastify from "fastify";
import cors from "@fastify/cors";
import { appOptions } from "~/config/app-options";
import { prismaPlugin } from "~/plugins";
import { reactAdminModule } from "~/modules/react-admin";
import { authRouter } from "./modules/auth/router";

const app = Fastify(appOptions);

app.register(cors, {
  origin: "*",
});
app.register(prismaPlugin);
app.register(authRouter, { prefix: "/auth" });
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
