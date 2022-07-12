import express from 'express';
import { ApolloServer }  from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './typedefs';
import resolvers from './resolvers';
import loaders from './loader';

const PORT = 4000;

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();

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

server.applyMiddleware({ app, path: '/graphql', cors: true });

await new Promise(resolve => app.listen({ port: PORT }, resolve));
console.log(`Go to http://localhost:${PORT}${server.graphqlPath} to run queries!`);
