const Koa = require("koa");
const parser = require("koa-bodyparser");
const cors = require("@koa/cors");
const indexRouter = require("./indexRouter");
const gamesRouter = require("./gamesRouter");
const api = new Koa();

api
  .use(parser())
  .use(cors())
  .use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get("X-Response-Time");
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
  })
  .use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set("X-Response-Time", `${ms}ms`);
  })
  .on("error", (err, ctx) => {
    console.error("server error", err, ctx);
  })
  .use(indexRouter.routes())
  .use(indexRouter.allowedMethods())
  .use(gamesRouter.routes())
  .use(gamesRouter.allowedMethods());

// add swagger ui koa

module.exports = api;
