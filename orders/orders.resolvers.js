import * as ordersModel from './orders.model.js';

export default {
  Query: {
    orders: () => {
      return ordersModel.getAllOrders();
    },
  },
};
