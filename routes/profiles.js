const schema = require("../schema");
const { BasicId, BasicMessage, BasicItem } = require("../schema");

async function routes(fastify, options) {
  fastify.get("/", async (req, reply) => {
    const { rows: returnVal } = await fastify.pg.query(
      `SELECT * FROM profiles;`,
      []
    );
    reply.send(returnVal);
  });
  fastify.get("/:id", { schema: { params: BasicId } }, async (req, reply) => {
    const {
      rows: returnVal,
    } = await fastify.pg.query(`SELECT * FROM profiles WHERE id=$1;`, [
      req.params.id,
    ]);
    return returnVal;
  });
}

module.exports = routes;
