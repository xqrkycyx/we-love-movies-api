const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  // TODO: Add your code here.

  next({});
}

async function read(request, response) {
  // TODO: Add your code here
  response.json({ data: "" });
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
};
