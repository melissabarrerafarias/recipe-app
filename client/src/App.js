import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './pages/Home';
import UploadRecipe from './pages/UploadRecipe'; 
import Header from './components/Header';
import Login from './pages/Login'; 
import SignUp from './pages/Signup';

const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Router>
        <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/upload" component={UploadRecipe} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
