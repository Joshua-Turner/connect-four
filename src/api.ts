import cors from "@koa/cors";
import Koa from "koa";
import parser from "koa-bodyparser";
import logger from "koa-logger";
import { koaSwagger } from "koa2-swagger-ui";
import gamesRouter from "./Games/gamesRouter";
import indexRouter from "./indexRouter";
import spec from "./swagger.json";

const api = new Koa();
api
  .use(parser())
  .use(cors())
  .use(logger())
  .on("error", (err, ctx) => {
    console.error("❌ SERVER ERROR:", err, ctx);
  })
  .use(indexRouter.routes())
  .use(indexRouter.allowedMethods())
  .use(gamesRouter.routes())
  .use(gamesRouter.allowedMethods());

if (process.env.NODE_ENV !== "production") {
  api.use(
    koaSwagger({
      routePrefix: "/swagger",
      swaggerOptions: {
        spec,
        jsonEditor: true,
      },
    })
  );
}

export default api;
