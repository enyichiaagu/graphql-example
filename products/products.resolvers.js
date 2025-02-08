import * as productsModel from './products.model.js';

export default {
  Query: {
    products: () => {
      return productsModel.getAllProducts();
    },
    productsByPrice: (_, args) => {
      return productsModel.getProductsByPrice(args.min, args.max);
    },
    product: (_, args) => {
      return productsModel.getProductById(args.id);
    },
  },
  Mutation: {
    addNewProduct: (_, args) => {
      return productsModel.addNewProduct(args.id, args.description, args.price);
    },
  },
};
