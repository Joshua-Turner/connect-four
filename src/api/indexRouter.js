const Router = require("koa-router");
const indexRouter = new Router();

indexRouter.get("/", (ctx) => {
  ctx.body = "Connect Four JS Running!";
  ctx.status = 200;
});

module.exports = indexRouter;
