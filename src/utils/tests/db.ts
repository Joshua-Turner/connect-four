import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { Game } from "../../Games/Game";

let mongoServer: MongoMemoryServer;
export const connect = async (): Promise<void> => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, mongooseOpts as mongoose.ConnectOptions);
};

export const clear = async (): Promise<void> => {
  if (mongoServer) {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
};

export const disconnect = async (): Promise<void> => {
  if (mongoServer) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  }
};

export const modelToResponse = <ModelClass = Game>(
  value: ModelClass
): ModelClass => {
  return JSON.parse(JSON.stringify(value));
};
