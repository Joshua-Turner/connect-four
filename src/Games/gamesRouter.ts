import Router from "koa-router";
import {
  createGameHandler,
  deleteGameHandler,
  getGameByIdHandler,
  getGamesCountHandler,
  getGamesHandler,
  updateGameByIdHandler,
} from "./gamesController";

const gamesRouter = new Router({
  prefix: "/games",
});
gamesRouter
  .get("/", getGamesHandler)
  .post("/", createGameHandler)
  .get("/count", getGamesCountHandler)
  .get("/:id", getGameByIdHandler)
  .put("/:id", updateGameByIdHandler)
  .del("/:id", deleteGameHandler);

export default gamesRouter;
