import mongoose from "mongoose";

import { ApolloServer } from "apollo-server";
import { schema } from "./schema";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/test-db";

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  const server = new ApolloServer({
    schema,
    playground: {
      settings: {
        "editor.cursorShape": "line",
      },
    },
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

start();
