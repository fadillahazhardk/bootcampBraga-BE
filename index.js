// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
const fastifyEnv = require("fastify-env");

fastify.register(require("fastify-multipart"), { attachFieldsToBody: true });

//REGISTER PLUGIN
require("dotenv").config(require("./config/env").options.dotenv);
fastify.register(fastifyEnv, require("./config/env").options);
fastify.register(require("fastify-postgres"), {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
fastify.register(require("fastify-static"), require("./config/static").public);
fastify.register(require("fastify-static"), require("./config/static").assets);
fastify.register(require("fastify-static"), require("./config/static").forms);
fastify.register(require("fastify-swagger"), require("./config/swagger"));
fastify.register(require("point-of-view"), {
  engine: {
    ejs: require("ejs"),
  },
});
fastify.register(require("fastify-jwt"), require("./config/jwt"));
fastify.register(require("fastify-helmet"), require("./config/helmet"));
fastify.register(require("fastify-cors"), require("./config/cors"));

// Declare a route
fastify.decorate("authenticate", async function (req, reply) {
  try {
    console.log(req.headers);
    await req.jwtVerify();
    console.log("masuk");
  } catch (err) {
    reply.send(err);
  }
});
fastify.register(require("./routes/static"));
fastify.register(require("./routes/ssr"));
fastify.register(require("./routes/profiles"), { prefix: "/api/profiles" });
fastify.register(require("./routes/auth"), { prefix: "/api/auth" });
fastify.register(require("./routes/mail"), { prefix: "/api/mail" });

// fastify.register(require("./routes/api"));

// Run the server!
fastify.ready((err) => {
  if (err) throw err;
  fastify.swagger();
});
const start = async () => {
  try {
    await fastify.listen(process.env.PORT, "0.0.0.0");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
