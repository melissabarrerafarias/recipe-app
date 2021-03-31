const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');// mongoose database connection

const PORT = process.env.PORT || 3001;
const app = express();

// new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers
});

// integrate Apollo server with the Express application as middleware
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}!`);
    // log where we can go to test our GQL API
    console.log(`Test GraphQL queries at http://localhost:${PORT}${server.graphqlPath} :D`);
  });
});