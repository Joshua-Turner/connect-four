const {
  createGame,
  getGameById,
  getGames,
  getGamesCount,
  updateGameById,
  deleteGameById,
} = require("./gamesService");

const getGamesHandler = async (ctx) => {
  ctx.body = await getGames();
  ctx.status = 200;
};

const getGameByIdHandler = async (ctx) => {
  const id = ctx.params.id;
  const game = await getGameById(id);
  ctx.body = {
    message: `Game "${id}" ${game ? "" : "not "}found!`,
    game,
  };
  ctx.status = game ? 200 : 404;
};

const getGamesCountHandler = async (ctx) => {
  ctx.body = await getGamesCount();
  ctx.status = 200;
};

const createGameHandler = async (ctx) => {
  try {
    const game = await createGame(ctx.request.body);
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
  }
};

const updateGameByIdHandler = async (ctx) => {
  const id = ctx.params.id;
  try {
    const updatedGame = await updateGameById(id, ctx.request.body);
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
  }
};

const deleteGameHandler = async (ctx) => {
  const id = ctx.params.id;
  const deletedGame = await deleteGameById(id);
  ctx.status = deletedGame ? 200 : 404;
  ctx.body = {
    message: `Game "${id}" ${deletedGame ? "deleted" : "not found"}!`,
    game: deletedGame,
  };
};

module.exports = {
  createGameHandler,
  getGamesCountHandler,
  getGameByIdHandler,
  getGamesHandler,
  updateGameByIdHandler,
  deleteGameHandler,
};
