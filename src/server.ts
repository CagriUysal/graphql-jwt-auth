import express from "express";
import { ApolloServer } from "apollo-server-express";

import config from "./config";
import prisma from "./db";
import typeDefs from "./schema/typeDefs";
import resolvers from "./schema/resolvers";

export const start = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
      return { prisma };
    },
  });
  await server.start();

  server.applyMiddleware({ app });

  app.listen(config.port, () => {
    console.log(
      `Graphql API on http://localhost:${config.port}${server.graphqlPath}`
    );
  });
};
