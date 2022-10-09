const { db, req } = require("./utils/tests/server");
beforeAll(async () => {
  await db.connect();
});

afterEach(async () => {
  await db.clear();
});

afterAll(async () => {
  await db.disconnect();
});

const exampleGame = {
  player1Name: "Reddington",
  player2Name: "Yellowanna",
};

describe("GET /games", () => {
  it("Should return empty array if no games in database", async () => {
    const res = await req.get("/games");
    expect(res.body).toEqual([]);
    expect(res.statusCode).toBe(200);
  });
});

describe("POST /games", () => {
  it("Should return created game", async () => {
    const res = await req.post("/games").send({ ...exampleGame });
    expect(res.body.message).toBe("Game Created!");
    expect(res.body.game.player1Name).toBe(exampleGame.player1Name);
    expect(res.statusCode).toBe(201);
  });
});
