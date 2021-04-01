const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID
  username: String
  recipes: [Recipe]
}

type Recipe {
  _id: ID
  recipeTitle: String
  recipeDescription: String
  createdAt: String
  username: String
}

type Query {
  currentUser: User
  users: [User]
  user(username: String!): User
  recipes(username: String): [Recipe]
  recipe(_id: ID!): Recipe
}

type Auth {
  token: ID!
  user: User
}

type Mutation {
  login(username: String!, password: String!): Auth
  addUser(username: String!, password: String!): Auth
  addRecipe(recipeTitle: String!, recipeDescription: String!): Recipe
}
`;

module.exports = typeDefs;