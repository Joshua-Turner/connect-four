let getConsoleLogMocks;
let restoreMockConsoleLogs;
let db;
let req;
jest.isolateModules(() => {
  const mock = require("./utils/tests/mock");
  getConsoleLogMocks = mock.getConsoleLogMocks;
  restoreMockConsoleLogs = mock.restoreMockConsoleLogs;
  const server = require("./utils/tests/server");
  db = server.db;
  req = server.req;
});

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

describe("GET /swagger", () => {
  const originalEnv = process.env;
  beforeEach(() => {
    process.env = {
      ...originalEnv,
    };
  });

  afterEach(async () => {
    process.env = originalEnv;
  });

  it('Should connect if the NODE_ENV is not "production"', async () => {
    const res = await req.get("/swagger");
    expect(res.statusCode).toBe(200);
  });

  it('Should not connect if the NODE_ENV is "production"', async () => {
    process.env.NODE_ENV = "production";
    const { req: req2 } = require("./utils/tests/server");
    const res = await req2.get("/swagger");
    expect(res.statusCode).toBe(404);
  });
});
