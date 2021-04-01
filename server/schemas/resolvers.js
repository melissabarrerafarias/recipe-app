const { User, Recipe } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
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
      return user;
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
      return user;
    }
  }
};

module.exports = resolvers;