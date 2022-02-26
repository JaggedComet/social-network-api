const { Schema, model } = require('mongoose');



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
        validator: function (email) {
          return /^([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})$/.test(email);
        },
        message: "This is not a valid email, please fill in a valid email address."
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
    return this.friends.length;
});


const User = model('user', userSchema);

module.exports = User;
