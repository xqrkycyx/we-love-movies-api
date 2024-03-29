const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

// TODO: Add your routes here

// --------------------------------------------------------
// NESTED ROUTES
// REQ 5(c) - reviews & 5(d) theaters
// Refer back to Module 4-6 (Advanced Tips):
// Example was nesting the '/pastes' router within the '/users' router, i.e., '/users/:userId/pastes')
// Lesson instruction: "Add the following BEFORE ANY OTHER routes:"
router.use("/:movieId([0-9]+)/reviews", controller.movieExists, reviewsRouter); // controller.movieExists in front of reviews router to enable 404 response if movieId doesn't exist
router.use(
  "/:movieId([0-9]+)/theaters",
  controller.movieExists,
  theatersRouter
);
// --------------------------------------------------------

router.route("/:movieId([0-9]+)").get(controller.read).all(methodNotAllowed);
router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
