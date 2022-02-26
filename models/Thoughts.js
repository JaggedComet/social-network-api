const { Schema, model } = require("mongoose");
const reactionSchema = require("./reaction");


const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Schema.Types.ObjectId
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

const thoughtsSchema = new Schema(
  {
    thoughtsText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
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

thoughtsSchema.virtual.get(function () {
  return this.reactions.length;
})

const Thoughts = model("thoughts", thoughtsSchema);

module.exports = Thoughts;
