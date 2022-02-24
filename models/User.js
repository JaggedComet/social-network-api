const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');
const thoughtsSchema = require('./thoughts');


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})$/, 'Please fill a valid email address']
      },
    },
    thoughts: [{type: Schema.Types.ObjectId, ref: "thought"}],
    friends: [{type: Schema.Types.ObjectId, ref: "user"}],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

userSchema
  .virtual("friendcount")
  .get(function () {
    return friends.length;
});


const User = model('user', userSchema);

module.exports = Student;
