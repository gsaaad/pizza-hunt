// import Model and Schema
const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// create Schema
const PizzaSchema = new Schema(
  {
    // the name of the pizza
    pizzaName: {
      type: String,
      // require and trim!
      required: true,
      trim: true,
    },
    //   the name of the user
    createdBy: {
      type: String,
      // require and trim!
      required: true,
      trim: true,
    },
    //   time of creation
    createdAt: {
      type: Date,
      default: Date.now,
      // add GET option, this formats date from timestamp to something more readable
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    //   Size of pizza
    size: {
      type: String,
      required: true,
      enum: ["Personal", "Small", "Medium", "Large", "Extra Large"],
      default: "Large",
    },
    //   has these toppings
    toppings: [],
    // has these comments, Type is objectID, and we'll refer to this id using the Comment Model
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    // let mongoose model that getters and virtuals are used!
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

PizzaSchema.virtual("commentCount").get(function () {
  // return this.comments.length;
  // now we want to return comments length and replies!
  return this.comments.reduce(
    (total, comment) => total + comment.replies.length + 1,
    0
  );
  // using the reduce method, we have an accumulator and currentValue
});

// create Model
const Pizza = model("Pizza", PizzaSchema);
// export
module.exports = Pizza;
