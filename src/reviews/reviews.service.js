const db = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const tableName = "reviews";

// Requirement 5(c): Use helper/util method to join a nest a bunch of fields under a 'critic' property on each of response.data items:
// NOTE: This refers back to Module 10-9: "Joins w/Knex"
// https://overview.thinkful.com/curriculum/BACK_END-501/be-backend-web-development/be-node-express-and-postgres/be-joins-with-knex
const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

async function destroy(reviewId) {
  // TODO: Write your code here
}

async function list(movie_id) {
  // TODO: Write your code here
  //
  // Requirement 5(c): Original query (before adding 'critic' nested object to each review):
  // return db(tableName).select("*").where({ movie_id: movie_id });
  //
  // Requirement 5(c): Updated query to pull in the critic fields and then nest them using the mapProperties util method
  // NOTE: This refers back to Module 10-9: "Joins w/Knex"
  // https://overview.thinkful.com/curriculum/BACK_END-501/be-backend-web-development/be-node-express-and-postgres/be-joins-with-knex
  return db("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "r.movie_id": movie_id })
    .then((reviews) => {
      return reviews.map((review) => addCritic(review));
    });
}

async function read(reviewId) {
  // TODO: Write your code here
}

async function readCritic(critic_id) {
  return db("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return db(tableName)
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}

module.exports = {
  destroy,
  list,
  read,
  update,
};
