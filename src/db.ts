import { mongoose } from "@typegoose/typegoose";
import { getGamesCount } from "./Games/gamesService";

const db = () => {
  if (process.env.DB_URL) {
    mongoose
      .connect(process.env.DB_URL, { dbName: "connectfour" })
      .then(async () => {
        const count = await getGamesCount();
        console.log("Successfully connected to database", count);
      })
      .catch((err: Error) => console.log(err));
  }
};

export default db;
