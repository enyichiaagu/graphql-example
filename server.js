import express from 'express';
import { buildSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';
import { ruruHTML } from 'ruru/server';

const schema = buildSchema(`
  type Query {
    products: [Product]
    orders: [Order]
  }

  type Product {
    id: ID!
    description: String!
    reviews: [Review]
    price: Float!
  }

  type Review {
    rating: Int!
    comment: String
  }

  type Order {
    date: String!
    subtotal: Float!
    items: [OrderItem]
  }

  type OrderItem {
    product: Product!
    quantity: Int!
  }
`);

const root = {
  products: [
    { id: 'redshoe', description: 'Red Shoe', price: 42.12 },
    { id: 'bluejean', description: 'Blue Jeans', price: 55.55 },
  ],
  orders: [
    {
      date: '2005-05-50',
      subtotal: 90.22,
      items: [
        {
          product: { id: 'redshoe', description: 'Old Red Shoe', price: 45.11 },
          quantity: 2,
        },
      ],
    },
  ],
};

const app = express();

app.all('/graphql', createHandler({ schema: schema, rootValue: root }));

app.get('/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});

app.listen(3000, () => {
  console.log('Running GraphQL server ...');
});
