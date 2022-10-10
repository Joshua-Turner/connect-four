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
      message: "Game data invalid!",
      game: null,
    };
    ctx.status = 400;
  }
};

const updateGameByIdHandler = async (ctx) => {
  const updatedGame = await updateGameById(ctx.params.id, ctx.request.body);
  ctx.status = updatedGame ? 200 : 404;
  ctx.body = {
    message: "Game Updated!",
    game: updatedGame,
  };
};

const deleteGameHandler = async (ctx) => {
  const deletedGame = await deleteGameById(ctx.params.id);
  ctx.status = deletedGame ? 200 : 404;
  ctx.body = {
    message: deletedGame ? "Game Deleted!" : "Game not found...",
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
