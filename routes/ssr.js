const data = require("../data/portfolio.json");

async function routes(fastify, options) {
  fastify.get("/portfolio.html", async (request, reply) => {
    // const { rows } = await fastify.pg.query("SELECT * FROM profiles;", []);

    reply.view("/public/portfolio.ejs", {
      ...data
        });
  });
}

module.exports = routes;
