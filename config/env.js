module.exports = {
  options: {
    confKey: "config", // optional, default: 'config'
    schema: {
      type: "object",
      required: ["PORT"],
      properties: {
        PORT: {
          type: "string",
          default: 3000
        },
      },
    },
    dotenv: {
      path: `${__dirname}/config.env`,
      debug: true,
    },
  },
};
