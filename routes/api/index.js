const router = require("express").Router();
const pizzaRoutes = require("./pizza-routes");

// add prefix of pizzas for API ROUTES for pizza

router.use("/pizzas", pizzaRoutes);

module.exports = router;
