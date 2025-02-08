import * as productsModel from './products.model.js';

export default {
  Query: {
    products: () => {
      return productsModel.getAllProducts();
    },
  },
};
