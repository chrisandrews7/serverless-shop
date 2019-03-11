"use strict";

const { query, getProduct } = require("./repository");

module.exports.graphql = (event, context, callback) =>
  query(event.body)
    .then(res =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(res)
      })
    )
    .catch(err => callback(err));

module.exports.getStock = (event, context, callback) => {
  const product = getProduct(event.productId);

  callback(null, {
    productId: product.id,
    quantity: product.quantity
  });
};

module.exports.dispatchOrder = (event, context, callback) => {
  callback(null, {
    status: "Dispatched",
    order: "NewOrder1",
    customerId: event.customerId,
    productId: event.productId
  });
};

module.exports.orderStock = (event, context, callback) => {
  callback(null, {
    productId: event.productId,
    status: "Ordered",
    quantityOrdered: 10
  });
};
