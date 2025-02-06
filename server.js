import express from 'express';
import { buildSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';
import { ruruHTML } from 'ruru/server';

const schema = buildSchema(`
  type Query {
    description: String
    price: Float
  } 
`);

const root = {
  description: 'Red Shoe',
  price: 42.12,
};

const app = express();

app.post('/graphql', createHandler({ schema: schema, rootValue: root }));

app.get('/graphql', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});

app.listen(3000, () => {
  console.log('Running GraphQL server ...');
});
