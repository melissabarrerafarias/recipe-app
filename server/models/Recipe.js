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
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => moment(timestamp).format('MMM Do YY')
    },
    username: {
      type: String,
      required: true
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