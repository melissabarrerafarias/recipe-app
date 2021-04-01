const { Schema } = require('mongoose');
const moment = require('moment');// import moment for date formatting

const FavoritedSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => moment(timestamp).format('MMM Do YY')
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

module.exports = FavoritedSchema; 