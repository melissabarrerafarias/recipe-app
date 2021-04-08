const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');// mongoose database connection
const { authMiddleware } = require('./utils/auth');
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 3001;
const app = express();

// new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

// integrate Apollo server with the Express application as middleware
server.applyMiddleware({ app });

app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));


// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}!`);
    // log where we can go to test our GQL API
    console.log(`Test GraphQL queries at http://localhost:${PORT}${server.graphqlPath} :D`);
  });
});