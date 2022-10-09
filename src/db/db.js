const mongoose = require("mongoose");
const { getGamesCount } = require("./Game/GameService");

module.exports = () =>
  mongoose
    .connect(process.env.DB_URL, { dbName: "connectfour" })
    .then(async () => {
      const count = await getGamesCount();
      console.log("Successfully connected to database", count);
    })
    .catch((err) => console.log(err));
