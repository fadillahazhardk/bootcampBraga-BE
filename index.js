// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
const path = require("path");

//REGISTER PLUGIN
fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
  prefix: "/", // optional: default '/'
});

// Declare a route

//SSR
fastify.get("/", function (req, reply) {
  return reply.sendFile("index.html"); // serving path.join(__dirname, 'public', 'index.html') directly
});

//API
fastify.get("/api", async (request, reply) => {
  return { hello: "world" };
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
