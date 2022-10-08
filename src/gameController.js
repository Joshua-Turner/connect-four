const C4 = require("./connectFour");
const gamesDB = [];

const getGames = (ctx) => {
  ctx.body = gamesDB;
  ctx.status = 200;
};

const createGame = (ctx) => {
  gamesDB.push(new C4().gameState);
  ctx.body = "Game Created!";
  ctx.status = 201;
};

module.exports = {
  getGames,
  createGame,
};
