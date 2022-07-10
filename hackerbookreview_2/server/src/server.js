import express from 'express';
import cors from 'cors';
import pkg from 'apollo-server-express';
const { ApolloServer } = pkg;
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './typedefs.js';
import resolvers from './resolvers.js';
import loaders from './loader.js';

const PORT = 4000;

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();

app.use(cors());

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
  context: {
    loaders: loaders()
  },
});
await server.start();

server.applyMiddleware({ app, path: '/graphql' });

await new Promise(resolve => app.listen({ port: PORT }, resolve));
console.log(`Go to http://localhost:${PORT}${server.graphqlPath} to run queries!`);
