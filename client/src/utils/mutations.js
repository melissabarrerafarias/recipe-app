import gql from "graphql-tag";

export const ADD_RECIPE = gql `
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