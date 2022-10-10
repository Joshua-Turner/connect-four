const mongoose = require("mongoose");
const db = require("../utils/tests/db");
const {
  createGame,
  getGameById,
  getGames,
  getGamesCount,
  updateGameById,
  deleteGameById,
} = require("./gamesService");

const exampleGame = {
  player1Name: "Reddington",
  player2Name: "Yellowanna",
  currentPlayerIndex: 0,
  lastMoveColumnIndex: undefined,
  winnder: undefined,
  gameState: "[]",
};

beforeAll(async () => {
  await db.connect();
});

afterEach(async () => {
  await db.clear();
});

afterAll(async () => {
  await db.disconnect();
});

describe("createGame", () => {
  it("Should add valid game to collection", async () => {
    const result = await createGame({ ...exampleGame });
    const expectedGame = await getGameById(result._id);
    expect(result._id).toEqual(expectedGame._id);
  });

  it("Should throw a ValidationError if missing a required field", async () => {
    expect.assertions(1);
    const newGame = { ...exampleGame, gameState: " " };
    const attempt = async () => {
      await createGame(newGame);
    };
    await expect(attempt).rejects.toThrow(mongoose.Error.ValidationError);
  });
});

describe("getGameById", () => {
  it("Should return matching game", async () => {
    const expectedGame = await createGame({ ...exampleGame });
    const result = await getGameById(expectedGame._id);
    expect(result._id).toEqual(expectedGame._id);
  });

  it('Should return "null" if no matching game', async () => {
    const result = await getGameById("nonExistent");
    expect(result).toBeNull();
  });
});

describe("getGames", () => {
  it("Should return all games", async () => {
    const game1 = await createGame({ ...exampleGame });
    const game2 = await createGame({ ...exampleGame });
    const games = await getGames();
    expect(games.length).toBe(2);
    const gameIds = games.map(({ _id }) => _id);
    expect(gameIds.includes(game1._id)).toBe(true);
    expect(gameIds.includes(game2._id)).toBe(true);
  });

  it("Should return empty array if there are no games", async () => {
    const games = await getGames();
    expect(games).toEqual([]);
  });
});

describe("getGamesCount", () => {
  it("Should return count of games collection", async () => {
    expect(await getGamesCount()).toBe(0);
    await createGame([{ ...exampleGame }, { ...exampleGame }]);
    expect(await getGamesCount()).toBe(2);
  });
});

describe("updateGameById", () => {
  let originalGame;
  beforeEach(async () => {
    originalGame = await createGame({ ...exampleGame });
  });

  it("Should return updated game", async () => {
    const newPlayer1Name = "Blue";
    const updateGameResult = await updateGameById(originalGame._id, {
      player1Name: newPlayer1Name,
    });
    const expectedUpdatedGame = await getGameById(originalGame._id);
    expect(updateGameResult._id).toEqual(originalGame._id);
    expect(updateGameResult.player1Name).toEqual(newPlayer1Name);
    expect(updateGameResult.player1Name).toEqual(
      expectedUpdatedGame.player1Name
    );
  });

  it("Should return original game with no updates if update invalid", async () => {
    const update = await updateGameById(originalGame._id, {
      player1Name: undefined,
    });
    const game = await getGameById(originalGame._id);
    expect(update.player1Name).toBe(exampleGame.player1Name);
    expect(game.player1Name).toBe(exampleGame.player1Name);
  });

  it('Should return "null" if no matching game to update', async () => {
    const update = await updateGameById("nonExistent", {
      player1Name: "woops",
    });
    expect(update).toBeNull();
  });
});

describe("deleteGameById", () => {
  let game;
  beforeEach(async () => {
    game = await createGame({ ...exampleGame });
  });

  it("Should delete matching game", async () => {
    await deleteGameById(game._id);
    const result = await getGameById(game._id);
    expect(result).toBe(null);
  });

  it("Should return deleted game or null if no matching game to delete", async () => {
    const deletedGame = await deleteGameById(game._id);
    expect(deletedGame._id).toEqual(game._id);
    const result = await deleteGameById(game._id);
    expect(result).toBeNull();
  });
});
