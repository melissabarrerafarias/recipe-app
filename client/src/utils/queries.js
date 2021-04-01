import gql from 'graphql-tag';

export const QUERY_RECIPES = gql`
  query recipes($username: String) {
    recipes(username: $username) {
      _id
      recipeTitle 
      recipeDescription
      createdAt
      username
      favoritedCount
      favorites {
        _id
        createdAt
        username
      }
    }
  }
`;