async function routes(fastify, options) {
  fastify.get("/", async (request, reply) => {
    reply.sendFile("index.html");
  });
}

module.exports = routes;
