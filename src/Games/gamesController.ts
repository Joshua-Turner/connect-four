import Koa from "koa";
import { Game } from "./Game";
import {
  createGame,
  deleteGameById,
  getGameById,
  getGames,
  getGamesCount,
  updateGameById,
} from "./gamesService";

export const getGamesHandler: Koa.Middleware = async (ctx) => {
  ctx.body = await getGames();
  ctx.status = 200;
};

export const getGameByIdHandler: Koa.Middleware = async (ctx) => {
  const id = ctx.params.id;
  const game = await getGameById(id);
  ctx.body = {
    message: `Game "${id}" ${game ? "" : "not "}found!`,
    game,
  };
  ctx.status = game ? 200 : 404;
};

export const getGamesCountHandler: Koa.Middleware = async (ctx) => {
  const count = await getGamesCount();
  ctx.body = {
    message: `There are "${count}" games!`,
    count,
  };
  ctx.status = 200;
};

export const createGameHandler: Koa.Middleware = async (ctx) => {
  try {
    const game = await createGame(ctx.request.body as unknown as Game);
    ctx.body = {
      message: "Game created!",
      game,
    };
    ctx.status = 201;
  } catch (err) {
    ctx.body = {
      error: { message: "Game data invalid!" },
    };
    ctx.status = 400;
    ctx.app.emit("error", err, ctx);
  }
};

export const updateGameByIdHandler: Koa.Middleware = async (ctx) => {
  const id = ctx.params.id;
  try {
    const updatedGame = await updateGameById(
      id,
      ctx.request.body as Partial<Game>
    );
    ctx.status = updatedGame ? 200 : 404;
    ctx.body = {
      message: `Game "${id}" ${updatedGame ? "updated" : "not found"}!`,
      game: updatedGame,
    };
  } catch (err) {
    ctx.body = {
      error: { message: "Game data invalid!" },
    };
    ctx.status = 400;
    ctx.app.emit("error", err, ctx);
  }
};

export const deleteGameHandler: Koa.Middleware = async (ctx) => {
  const id = ctx.params.id;
  const deletedGame = await deleteGameById(id);
  ctx.status = deletedGame ? 200 : 404;
  ctx.body = {
    message: `Game "${id}" ${deletedGame ? "deleted" : "not found"}!`,
    game: deletedGame,
  };
};
