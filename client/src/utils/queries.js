import gql from 'graphql-tag';

export const QUERY_RECIPES = gql`
  query recipes($username: String) {
    recipes(username: $username) {
      _id
      recipeTitle 
      recipeDescription
      imageUrl
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

export const QUERY_RECIPE = gql `
  query recipe($id: ID!) {
    recipe(_id: $id) {
      _id
      recipeTitle 
      recipeDescription
      imageUrl
      createdAt
      username
      favoritedCount
      favorites {
        _id
        username
      }
    }
  }
`