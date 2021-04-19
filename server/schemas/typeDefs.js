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
  recipeInstructions: String
  imageUrl: String
  createdAt: String
  username: String
  favoritedCount: Int
  favorites: [Favorited]
}

type Favorited {
  _id: ID
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
  addRecipe(recipeTitle: String!, recipeDescription: String!, recipeInstructions: String!, imageUrl: String): Recipe
  addFavorited(recipeId: ID!): Recipe
  deleteRecipe(recipeId: ID!): Recipe
}
`;

module.exports = typeDefs;