import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { loadFilesSync } from '@graphql-tools/load-files';

const typesArray = loadFilesSync('**/*', { extensions: ['graphql'] });
const resolversArray = loadFilesSync('**/*', { extensions: ['resolvers.js'] });

const app = express();

const server = new ApolloServer({
  typeDefs: typesArray,
  resolvers: resolversArray,
});

await server.start();

app.use('/graphql', cors(), express.json(), expressMiddleware(server));

app.listen(3000, () => {
  console.log('Running GraphQL server ...');
});
