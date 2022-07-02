const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// reply schema ABOVE comment schema
const ReplySchema = new Schema(
  {
    // setting the custom ID to avoid confusion with PARENT ID (comment)
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    // we added a default Types Object Id

    replyBody: {
      type: String,
    },
    writtenBy: {
      type: String,
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    //   get: (createdAtVal) => dateFormat(createdAtVal),
    // },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  // add toJSON  for both schema

  {
    toJSON: {
      getters: true,
    },
  }
);
const CommentSchema = new Schema(
  {
    writtenBy: {
      type: String,
    },
    commentBody: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // add replies to comments, and point to ReplySchema
    replies: [ReplySchema],
  },
  // add toJSON  for both schema
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

CommentSchema.virtual("replyCount").get(function () {
  return this.replies.length;
});
const comment = model("Comment", CommentSchema);

module.exports = comment;
