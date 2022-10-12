const Router = require("koa-router");
const gamesRouter = new Router({
  prefix: "/games",
});
const {
  createGameHandler,
  getGamesCountHandler,
  getGameByIdHandler,
  getGamesHandler,
  updateGameByIdHandler,
  deleteGameHandler,
} = require("./gamesController");

gamesRouter.get("/", getGamesHandler);
gamesRouter.post("/", createGameHandler);
gamesRouter.get("/count", getGamesCountHandler);
gamesRouter.get("/:id", getGameByIdHandler);
gamesRouter.put("/:id", updateGameByIdHandler);
gamesRouter.del("/:id", deleteGameHandler);

module.exports = gamesRouter;
