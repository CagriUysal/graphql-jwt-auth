import express from "express";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";

import config from "./config";
import prisma from "./db";
import typeDefs from "./schema/typeDefs";
import resolvers from "./schema/resolvers";
import { refreshToken } from "./utils/auth";

export const start = async () => {
  const app = express();

  app.disable("x-powered-by");

  app.use(cookieParser());

  app.post("/refresh_token", refreshToken);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
      return { req, res, prisma };
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
