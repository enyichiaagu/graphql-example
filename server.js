import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { loadFilesSync } from '@graphql-tools/load-files';
import { ruruHTML } from 'ruru/server';

const typesArray = loadFilesSync('**/*', { extensions: ['graphql'] });
const resolversArray = loadFilesSync('**/*', { extensions: ['resolvers.js'] });

const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: resolversArray,
});

const app = express();

app.all('/graphql', createHandler({ schema: schema }));

app.get('/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});

app.listen(3000, () => {
  console.log('Running GraphQL server ...');
});
