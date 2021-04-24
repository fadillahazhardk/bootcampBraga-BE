// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
const fastifyEnv = require("fastify-env");

//REGISTER PLUGIN
require("dotenv").config(require("./config/env").options.dotenv);
fastify.register(fastifyEnv, require("./config/env").options);
fastify.register(require("fastify-postgres"), {
  connectionString: process.env.PGSTRING,
  ssl: { rejectUnauthorized: false },
});
fastify.register(require("fastify-static"), require("./config/static").public);
fastify.register(require("fastify-static"), require("./config/static").assets);
fastify.register(require("fastify-static"), require("./config/static").forms);
fastify.register(require("point-of-view"), {
  engine: {
    ejs: require("ejs"),
  },
});

// Declare a route
fastify.register(require("./routes/static"));
fastify.register(require("./routes/ssr"));
fastify.register(require("./routes/api"));

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
