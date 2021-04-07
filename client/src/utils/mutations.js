import gql from "graphql-tag";

export const ADD_RECIPE = gql`
mutation addRecipe($recipeTitle: String!, $recipeDescription: String!) {
    addRecipe(recipeTitle: $recipeTitle, recipeDescription: $recipeDescription) {
      _id
      recipeTitle
      recipeDescription
      createdAt
      username
    }
  }
`

export const ADD_USER = gql`
mutation addUser($username: String!, $password: String!) {
  addUser(username: $username, password: $password) {
    token
    user {
      _id
    }
  }
}
`

export const LOGIN = gql ` 
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`