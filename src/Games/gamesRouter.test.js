const {
  getConsoleLogMocks,
  restoreMockConsoleLogs,
} = require("../utils/tests/mock");
const { db, req } = require("../utils/tests/server");
const { createGame, getGamesCount, getGameById } = require("./gamesService");

let consoleLogMocks;
beforeAll(async () => {
  consoleLogMocks = getConsoleLogMocks();
  await db.connect();
});

afterEach(async () => {
  await db.clear();
});

afterAll(async () => {
  await db.disconnect();
  restoreMockConsoleLogs(consoleLogMocks);
});

const exampleGameId = "test";
const exampleGame = {
  player1Name: "Reddington",
  player2Name: "Yellowanna",
};

const addExampleGame = async (id = exampleGameId) => {
  return await createGame({
    ...exampleGame,
    _id: id,
  });
};

const baseUrl = "/games";
const baseUrlWithId = (id = exampleGameId) => {
  return `${baseUrl}/${id}`;
};

describe("GET /games", () => {
  it("Should return empty array if no games in database", async () => {
    const res = await req.get(baseUrl);
    expect(res.body).toEqual([]);
    expect(res.statusCode).toBe(200);
  });

  it("Should return array of games", async () => {
    const games = [
      await addExampleGame("game1"),
      await addExampleGame("game2"),
    ];
    const res = await req.get(baseUrl);
    expect(JSON.stringify(res.body)).toEqual(JSON.stringify(games));
    expect(res.statusCode).toBe(200);
  });
});

describe("GET /games/:id", () => {
  it("Should return matching game", async () => {
    const matchingGame = await addExampleGame();
    const res = await req.get(baseUrlWithId());
    expect(res.body.message).toBe(`Game "${exampleGameId}" found!`);
    expect(matchingGame).toEqual(expect.objectContaining(res.body.game));
    expect(res.statusCode).toBe(200);
  });

  it("Should return 404 if game not found", async () => {
    const res = await req.get(baseUrlWithId());
    expect(res.body.message).toBe(`Game "${exampleGameId}" not found!`);
    expect(res.body.game).toBeNull();
    expect(res.statusCode).toBe(404);
  });
});

describe("GET /games/count", () => {
  it("Should return length of games collection", async () => {
    const expectCount = async (expectedCount) => {
      const res = await req.get(`${baseUrl}/count`);
      expect(res.body.message).toBe(`There are "${expectedCount}" games!`);
      expect(res.body.count).toBe(expectedCount);
      expect(res.statusCode).toBe(200);
    };
    await expectCount(0);
    await addExampleGame("1");
    await addExampleGame("2");
    await expectCount(2);
  });
});

describe("POST /games", () => {
  it("Should return created game", async () => {
    const res = await req.post(baseUrl).send({ ...exampleGame });
    const expectedGame = await getGameById(res.body.game._id);
    expect(res.body.message).toBe("Game created!");
    expect(expectedGame).toEqual(expect.objectContaining(res.body.game));
    expect(res.statusCode).toBe(201);
  });

  it("Should return error message if game is invalid", async () => {
    const res = await req.post(baseUrl).send({ _id: [] });
    expect(res.body.error?.message).toBe("Game data invalid!");
    expect(res.statusCode).toBe(400);
  });
});

describe("PUT /games:id", () => {
  it("Should return updated game", async () => {
    const originalGame = await addExampleGame();
    const updatedPlayer1Name = "Blueton";
    const res = await req
      .put(baseUrlWithId())
      .send({ player1Name: updatedPlayer1Name });
    const updatedGame = await getGameById(originalGame._id);

    expect(res.body.message).toBe(`Game "${exampleGameId}" updated!`);
    expect(res.body.game?.player1Name).toBe(updatedPlayer1Name);
    expect(originalGame.player1Name).not.toBe(updatedPlayer1Name);
    expect(updatedGame?.player1Name).toBe(updatedPlayer1Name);
    expect(res.statusCode).toBe(200);
  });

  it("Should return 404 if game not found", async () => {
    const res = await req.put(baseUrlWithId()).send({ ...exampleGame });
    expect(res.body.message).toBe(`Game "${exampleGameId}" not found!`);
    expect(res.body.game).toBeNull();
    expect(res.statusCode).toBe(404);
  });

  it("Should return error message if game invalid", async () => {
    const res = await req.put(baseUrlWithId()).send({ _id: [] });
    expect(res.body.error?.message).toBe("Game data invalid!");
    expect(res.statusCode).toBe(400);
  });
});

describe("DELETE /games/:id", () => {
  let gameToDelete;
  beforeEach(async () => {
    gameToDelete = await addExampleGame();
  });

  it("Should delete the game", async () => {
    const res = await req.del(baseUrlWithId());
    expect(res.body.message).toBe(`Game "${exampleGameId}" deleted!`);
    expect(gameToDelete).toEqual(expect.objectContaining(res.body.game));
    expect(res.statusCode).toBe(200);
    expect(await getGamesCount()).toBe(0);
  });

  it("Should return 404 if game not found", async () => {
    const nonExistentId = "nonExistent";
    const res = await req.delete(baseUrlWithId(nonExistentId));
    expect(res.body.message).toBe(`Game "${nonExistentId}" not found!`);
    expect(res.body.game).toBeNull();
    expect(res.statusCode).toBe(404);
    expect(await getGamesCount()).toBe(1);
  });
});
