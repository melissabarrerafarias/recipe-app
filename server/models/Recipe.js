const { Schema, model } = require('mongoose');
const moment = require('moment');// import moment for date format
const FavoritedSchema = require('../models/Favorited'); 

const RecipeSchema = new Schema(
  {
    recipeTitle: {
        type: String, 
        required: "You need to name this recipe!", 
        minlength: 1
    },
    recipeDescription: {
      type: String,
      required: 'You need to leave a description for your tasty recipe!',
      minlength: 1,
      maxlength: 300
    },
    recipeInstructions: {
      type: String, 
      required: 'You need to let others know how to make this recipe!'
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => moment(timestamp).format('MMM Do YY')
    },
    username: {
      type: String,
      required: true
    }, 
    imageUrl: {
      type: String, 
      required: true //for testing in graphql playground either get imageUrl from front end or comment out this line
    },
    favorites: [FavoritedSchema]
  },
  {
    toJSON: {
      getters: true, 
      virtuals: true 
    }
  }
);

RecipeSchema.virtual('favoritedCount').get(function () {
    return this.favorites.length;
});

const Recipe = model('Recipe', RecipeSchema);

module.exports = Recipe;