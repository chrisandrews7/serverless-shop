const { graphql, buildSchema } = require("graphql");

const products = [
  {
    id: 1,
    name: "Cat Print",
    type: {
      name: "Tshirt"
    },
    quantity: 5
  },
  {
    id: 2,
    name: "Dragon Print",
    type: {
      name: "Tshirt"
    },
    quantity: 0
  }
];

const schema = buildSchema(`
  type Product {
    id: ID!
    name: String!
    type: ProductType!
    quantity: Int!
  }

  type ProductType {
    name: String!
  }

  type Query {
    products: [Product]
  }
`);

const resolvers = {
  products: () => products
};

module.exports.query = query => graphql(schema, query, resolvers);

module.exports.getProduct = productId => {
  return products.find(({ id }) => id == productId);
};
