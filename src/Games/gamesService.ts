import { Game, GameModel } from "./Game";

export const createGame = async (game: Game): Promise<Game | null> => {
  return await GameModel.create(game);
};

export const getGameById = async (id: string): Promise<Game | null> => {
  return await GameModel.findById(id);
};

export const getGames = async (): Promise<Game[]> => {
  return await GameModel.find({});
};

export const getGamesCount = async (): Promise<number> => {
  return await GameModel.countDocuments({});
};

export const updateGameById = async (
  id: string,
  game: Partial<Game>
): Promise<Game | null> => {
  return await GameModel.findByIdAndUpdate(id, game, {
    returnDocument: "after",
    new: true,
    runValidators: true,
  });
};

export const deleteGameById = async (id: string): Promise<Game | null> => {
  return await GameModel.findByIdAndDelete(id);
};
