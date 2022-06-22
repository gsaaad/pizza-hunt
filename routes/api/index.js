const router = require("express").Router();
const CommentsRoutes = require("./comment-routes");
const pizzaRoutes = require("./pizza-routes");

// add prefix of pizzas for API ROUTES for pizza

router.use("/comments", CommentsRoutes);
router.use("/pizzas", pizzaRoutes);

module.exports = router;
