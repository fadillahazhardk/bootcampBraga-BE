const { BasicId, BasicItem } = require("../schema");
module.exports = {
  routePrefix: "/api/docs",
  openapi: {
    info: {
      title: "REST API for BE Bootcamp",
      description: "REST API for BE Bootcamp 2021",
      version: "0.0.1",
      contact: {
        name: "Fadillah Azhar Deaudin Kurniawan",
        url: "https://braga.co.id/contact",
        email: "fadillahazhar74@gmail.com",
      },
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    tags: [
      {
        name: "Profile",
        description: "Profile items related routes",
      },
    ],
    components: {
      securitySchemes: {
        Bearer: {
          type: "http",
          scheme: "bearer",
        },
      },
      schemas: { BasicId, BasicItem },
    },
  },
  exposeRoute: true,
};
