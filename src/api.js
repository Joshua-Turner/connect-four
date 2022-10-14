const Koa = require("koa");
const parser = require("koa-bodyparser");
const cors = require("@koa/cors");
const logger = require("koa-logger");
const indexRouter = require("./indexRouter");
const gamesRouter = require("./Games/gamesRouter");
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
  const { koaSwagger } = require("koa2-swagger-ui");
  const spec = require("./swagger.json");
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

module.exports = api;
