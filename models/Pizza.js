// import Model and Schema
const { Schema, model } = require("mongoose");

// create Schema
const PizzaSchema = new Schema({
  // the name of the pizza
  pizzaName: {
    type: String,
  },
  //   the name of the user
  createdBy: {
    type: String,
  },
  //   time of creation
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //   Size of pizza
  size: {
    type: String,
    default: "large",
  },
  //   has these toppings
  toppings: [],
});

// create Model
const Pizza = model("Pizza", PizzaSchema);
// export
module.exports = Pizza;
