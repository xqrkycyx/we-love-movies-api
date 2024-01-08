const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  // TODO: Add your code here.
  const movie = await service.read(request.params.movieId);
  if (movie) {
    response.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

async function read(request, response) {
  // TODO: Add your code here

  try {
    const { movie: data } = response.locals;
    response.json({ data });
  } catch (error) {
    next(error);
  }
}

async function list(request, response, next) {
  // TODO: Add your code here.

  try {
    const is_showing = request.query.is_showing;
    const data = await service.list(is_showing);
    response.json({ data });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  movieExists, // Normally don't export this middleware, but it's needed by movies.router.js to ensure movie exists on NESTED ROUTES /movies/:id/reviews & movies/:id/theaters
};
