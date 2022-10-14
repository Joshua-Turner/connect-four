import Game from "./Game";

export const createGame = async (game: any) => {
  return await Game.create(game);
};

export const getGameById = async (id: string) => {
  return await Game.findById(id);
};

export const getGames = async () => {
  return await Game.find({});
};

export const getGamesCount = async () => {
  return await Game.countDocuments({});
};

export const updateGameById = async (id: string, game: any) => {
  return await Game.findByIdAndUpdate(id, game, {
    returnDocument: "after",
    new: true,
    runValidators: true,
  });
};

export const deleteGameById = async (id: string) => {
  return await Game.findByIdAndDelete(id);
};
