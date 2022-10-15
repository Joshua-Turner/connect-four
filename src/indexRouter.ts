import Router from "koa-router";

const indexRouter = new Router();
indexRouter.get("/", (ctx) => {
  ctx.body = {
    status: "Connect Four JS Running!",
  };
  ctx.status = 200;
});

export default indexRouter;
