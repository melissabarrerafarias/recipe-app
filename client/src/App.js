import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './pages/Home';
import UploadRecipe from './pages/UploadRecipe'

const client = new ApolloClient({
  uri: '/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/upload" component={UploadRecipe} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
