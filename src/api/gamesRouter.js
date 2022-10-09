const Router = require("koa-router");
const gamesRouter = new Router({
  prefix: "/games",
});
const { getGamesHandler, createGameHandler } = require("./gameController");

gamesRouter.get("/", getGamesHandler);
gamesRouter.post("/", createGameHandler);

module.exports = gamesRouter;
