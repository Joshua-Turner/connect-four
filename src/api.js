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
    console.error("server error", err, ctx);
  })
  .use(indexRouter.routes())
  .use(indexRouter.allowedMethods())
  .use(gamesRouter.routes())
  .use(gamesRouter.allowedMethods());

// add swagger ui koa

module.exports = api;
