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

describe("GET /", () => {
  it("Should return connection object if server running", async () => {
    const res = await req.get("/");
    expect(res.body).toEqual({
      status: "Connect Four JS Running!",
    });
    expect(res.statusCode).toBe(200);
  });
});
