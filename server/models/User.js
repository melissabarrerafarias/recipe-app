const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 5
        },
        recipes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Recipe'
            }
        ],
    },
    {
        toJSON: {
            virtuals: true
        }
    }
); 

// pre-save middleware to create password
UserSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
  });
  
  //compare entered password to hashed password
  UserSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
  };
  
  const User = model('User', UserSchema);
  
  module.exports = User;