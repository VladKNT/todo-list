import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import http from 'http';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

const typeDefs = mergeTypes(fileLoader('/todo-list/src/server/schema'));
const resolvers = mergeResolvers(fileLoader('/todo-list/src/server/resolvers'));

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: `http://localhost:3000/graphql`,
    settings: {
      'editor.theme': 'dark',
      'editor.cursorShape': 'line'
    }
  }
});

server.applyMiddleware({
  app
});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(3000, () => {
  console.info('Apollo Server on http://localhost:3000/graphql');
});
