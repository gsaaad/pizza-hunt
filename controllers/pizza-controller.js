const { Pizza } = require("../models");

const pizzaController = {
  // the function will go in here as methods

  //   GET all pizzas
  getAllPizza(req, res) {
    Pizza.find({})
      .populate({
        path: "comments",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //   GET Pizza by ID
  getPizzaById({ params }, res) {
    Pizza.findOne({ _id: params.id })
      .then((dbPizzaData) => {
        // if no pizza is found, send 404
        if (!dbPizzaData) {
          res
            .status(404)
            .json({ message: "There's no Pizza with this ID! Try again.." });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => {
        console.log(
          err,
          "There was an error in getting Pizza by ID, Try Again!"
        );
        res.status(400).json(err);
      });
  },

  //   POST create Pizza
  createPizza({ body }, res) {
    Pizza.create(body)
      .then((dbPizzaData) => {
        res.json(dbPizzaData);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  //   PUT update pizza by id
  updatePizza({ params, body }, res) {
    // the third parameter, new, returns a new version of the document, and not the original
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res
            .status(404)
            .json({ message: "There's no pizza  with this ID! Try again" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => {
        console.log(err, "There's an error in updating pizza by ID, Try again");
        res.status(400).json(err);
      });
  },
  //   DEL delete update pizza by id
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res
            .status(404)
            .json({ message: "There's no Pizza found with this ID." });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => {
        console.log(err, "There's an error in Deleting Pizza, Try Again");
        res.status(400).json(err);
      });
  },
};

module.exports = pizzaController;
