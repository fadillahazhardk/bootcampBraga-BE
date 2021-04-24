const data = require("../data/portfolio.json");

async function routes(fastify, options) {
  fastify.get("/portfolio.html", async (request, reply) => {
    const { rows } = await fastify.pg.query("SELECT * FROM profiles;", []);
    console.log(rows);
    reply.view("/public/portfolio.ejs", {
      ...data,
      items: rows.map((row) => {
        return {
          filter: row.filter,
          imgSrc: row.imgsrc,
          title: row.title,
          summary: row.summary,
          galleryHref: row.galleryhref,
          gallerryTitle: row.gallerytitle,
        };
      }),
    });
  });
}

module.exports = routes;
