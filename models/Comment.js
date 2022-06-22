const { Schema, model } = require("mongoose");

const CommentSchema = new Schema({
  writtenBy: {
    type: String,
  },
  commmentBody: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const comment = model("Comment", CommentSchema);

module.exports = comment;
