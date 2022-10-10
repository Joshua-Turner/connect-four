const {
  getConsoleLogMocks,
  restoreMockConsoleLogs,
} = require("./utils/tests/mock");
const { db, req } = require("./utils/tests/server");

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

describe("GET /", () => {
  it("Should return connection object if server running", async () => {
    const res = await req.get("/");
    expect(res.body).toEqual({
      status: "Connect Four JS Running!",
    });
    expect(res.statusCode).toBe(200);
  });
});
