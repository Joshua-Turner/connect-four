const { Game } = require("./Game");

const createGame = async (game) => {
  return await Game.create(game);
};

const getGameById = async (id) => {
  return await Game.findById(id);
};

const getGames = async () => {
  return await Game.find({});
};

const getGamesCount = async () => {
  return await Game.countDocuments({});
};

const updateGameById = async (id, game) => {
  return await Game.findByIdAndUpdate(id, game, {
    returnDocument: "after",
    new: true,
    runValidators: true,
  });
};

const deleteGameById = async (id) => {
  return await Game.findByIdAndDelete(id);
};

module.exports = {
  createGame,
  getGameById,
  getGames,
  getGamesCount,
  updateGameById,
  deleteGameById,
};
