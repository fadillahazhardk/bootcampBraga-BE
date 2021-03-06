async function routes(fastify, options) {
  fastify.get("/mantap", async (request, reply) => {
    reply.send({ halo: "mantap" });
  });
  fastify.get("/table/create", async (req, reply) => {
    const client = await fastify.pg.connect();
    const returnVal = await fastify.pg /*client*/
      .query(
        `CREATE TABLE ${req.query.name} (
                     ID SERIAL PRIMARY KEY,
                     filter varchar(255),
                     imgSrc varchar(255),
                     title varchar(255),
                     summary varchar(255),
                     galleryHref varchar(255),
                     galleryTitle varchar(255)
                 );`,
        []
      );
    /*client.release()*/
    return returnVal;
  });
}

module.exports = routes;
