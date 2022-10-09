const Router = require("koa-router");
const router = new Router();
const { getGamesHandler, createGameHandler } = require("./gameController");

router.get("/", getGamesHandler);
router.post("/", createGameHandler);

module.exports = router;
