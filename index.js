const dotenv = require("dotenv");

// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });

//REGISTER PLUGIN
fastify.register(require("fastify-static"), require("./config/static").public);
fastify.register(require("fastify-static"), require("./config/static").assets);
fastify.register(require("fastify-static"), require("./config/static").forms);

//
const config = dotenv.config({
  path: "./config/config.env",
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
    await fastify.listen(process.env.PORT, "0.0.0.0");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
