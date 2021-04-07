const { User, Recipe } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const { cloudinary } = require('../utils/cloudinary') 

const resolvers = {
  Query: {
    currentUser: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('recipes')

        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },
    users: async () => {//find all users
      return User.find()
        .select('-__v -password')//hides __v and password from result 
        .populate('recipes')//fills in recipe array of User 
    },
    user: async (parent, { username }) => {//find one user
      return User.findOne({ username })//find user by their username
        .select('-__v -password')
        .populate('recipes');
    },
    recipes: async (parent, { username }) => {
      const params = username ? { username } : {};
      
      return Recipe.find(params).sort({ createdAt: -1 });//return recipes in descending order
    },
    recipe: async (parent, { _id }) => {
      return Recipe.findOne({ _id });//find single recipe by id
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);//uses whatever is passed in as args to create User
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });//find one user by username
      if (!user) {//if user does not exist throw auth error
        throw new AuthenticationError('Sorry bud! You got the incorrect credentials.');
      }
      const correctPw = await user.isCorrectPassword(password);//use bcrypt to check if password is correct 
      if (!correctPw) {//if password is not correct throw auth error
        throw new AuthenticationError('Woah there... your credentials are not matching the ones in our database!');
      }
      const token = signToken(user);
      return { token, user };
    },
    addRecipe: async (parent, args, context) => {
      console.log(args.imageUrl);
      if (context.user) {

        try {
          const imageStr = args.imageUrl; 
          const uploadedResponse = await cloudinary.uploader.upload(imageStr, {
            upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET
          })
          console.log(uploadedResponse); 
        } catch (err) {
          console.log(err)
        }
        
        const recipe = await Recipe.create({ ...args, username: context.user.username });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { recipes: recipe._id } },
          { new: true }
        );

        return recipe;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addFavorited: async (parent, { recipeId }, context) => {
      if (context.user) {
        const updatedRecipe = await Recipe.findOneAndUpdate(
          { _id: recipeId },
          { $push: { favorites: { username: context.user.username } } },
          { new: true, runValidators: true }
        );
        return updatedRecipe;
      }
      throw new AuthenticationError('You need to be logged in!')
    },
    deleteRecipe: async (parent, { recipeId }, context) => {
      if (context.user) {
        const deletedRecipe = await Recipe.findOneAndRemove(
          { _id: recipeId },
          { new: true }
        );
        return deletedRecipe;
      }
      throw new AuthenticationError("You need to be logged in to delete!");
    },
  }
};

module.exports = resolvers;