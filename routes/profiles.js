const { BasicId, BasicMessage, BasicItem } = require("../schema");

async function routes(fastify, options) {
  //GET ALL PORTOFOLIO
  fastify.get(
    "/",
    {
      schema: {
        tags: ["Profile"],
        response: {
          "5xx": { ...BasicMessage, description: "Failed response" },
        },
      },
    },
    async (req, reply) => {
      try {
        const { rows: returnVal } = await fastify.pg.query(
          `SELECT * FROM profiles;`,
          []
        );
        return returnVal;
      } catch (err) {
        return err;
      }
    }
  );

  //CREATE PORTOFOLIO METHOD
  fastify.post(
    "/",
    {
      schema: {
        tags: ["Profile"],
        response: {
          "2xx": { ...BasicMessage, description: "Successful items addition" },
          "5xx": { ...BasicMessage, description: "Failed response" },
        },
        body: BasicItem,
      },
    },
    async (req, reply) => {
      try {
        const {
          filter,
          imgSrc,
          title,
          summary,
          galleryHref,
          galleryTitle,
        } = req.body;

        const returnVal = await fastify.pg.query(
          ` INSERT INTO profiles (filter, imgSrc, title, summary, galleryHref, galleryTitle)
            VALUES 
                ($1, $2, $3, $4, $5, $6)
            RETURNING id ;`,
          [filter, imgSrc, title, summary, galleryHref, galleryTitle]
        );
        console.log(returnVal);

        return { message: "Berhasil Membuat Item Portofolio!" };
      } catch (err) {
        return err;
      }
    }
  );

  //UPDATE ONE PORTOFOLIO
  fastify.put(
    "/:id",
    {
      schema: {
        tags: ["Profile"],
        response: {
          "2xx": { ...BasicMessage, description: "Successful item uodate" },
          "5xx": { ...BasicMessage, description: "Failed response" },
        },
        body: BasicItem,
        params: BasicId,
      },
    },
    async (req, reply) => {
      try {
        const {
          filter,
          imgSrc,
          title,
          summary,
          galleryHref,
          galleryTitle,
        } = req.body;

        const returnVal = await fastify.pg.query(
          ` UPDATE profiles
            SET
                filter = $1, imgSrc = $2, title = $3, summary = $4, galleryHref = $5, galleryTitle = $6
            WHERE id = $7;`,
          [
            filter,
            imgSrc,
            title,
            summary,
            galleryHref,
            galleryTitle,
            req.params.id,
          ]
        );
        console.log(returnVal);

        return { message: "Item Portofolio Berhasil Diperbaharui." };
      } catch (err) {
        return err;
      }
    }
  );

  //GET ONE PORTOFOLIO
  fastify.get(
    "/:id",
    {
      schema: { tags: ["Profile"], params: BasicId },
    },
    async (req, reply) => {
      const {
        rows: returnVal,
      } = await fastify.pg.query(`SELECT * FROM profiles WHERE id=$1;`, [
        req.params.id,
      ]);
      return returnVal;
    }
  );

  //DELETE PORTOFOLIO
  fastify.delete(
    "/:id",
    {
      schema: {
        tags: ["Profile"],
        response: {
          "2xx": { ...BasicMessage, description: "Successful item deletion" },
          "5xx": { ...BasicMessage, description: "Failed response" },
        },
        params: BasicId,
      },
    },
    async (req, reply) => {
      try {
        const returnVal = await fastify.pg.query(
          `DELETE FROM profiles WHERE id=$1;`,
          [req.params.id]
        );
        let message = "Sukses menghapus item!";
        if (returnVal.rowCount === 0) message = "Item portofolio dengan ID tersebut tidak ada."
        return { message};
      } catch (err) {
        return err;
      }
    }
  );
}

module.exports = routes;
