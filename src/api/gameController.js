const { createGame, getGames } = require("../db/Game/GameService");

const getGamesHandler = async (ctx) => {
  ctx.body = await getGames();
  ctx.status = 200;
};

const createGameHandler = async (ctx) => {
  const game = await createGame(ctx.request.body);
  ctx.body = {
    message: "Game Created!",
    game,
  };
  ctx.status = 201;
};

module.exports = {
  getGamesHandler,
  createGameHandler,
};
