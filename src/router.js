const Router = require("koa-router");
const router = new Router();
const { getGames, createGame } = require("./gameController");

router.get("/", getGames);
router.post("/", createGame);

module.exports = router;
