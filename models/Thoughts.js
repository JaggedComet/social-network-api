const { Schema, model } = require("mongoose");
const reactionSchema = require("./reaction");
const userSchema = require("./user");

const thoughtsSchema = new Schema(
  {
    thoughtsText: {
      type: String,
      required: true,
      length: [1, 280],
    },
    createdAt: {
      type: Date,
      default: "find dayjs to do this",
      getter: "???",
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

// reactionSchema
//   .virtual('reaction')
//   // Getter
//   .get(function () {
//     return `color: ${this.color}`;
//   });

const Thoughts = model("thoughts", thoughtsSchema);

module.exports = Thoughts;
