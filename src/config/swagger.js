const swaggerJsDoc = require("swagger-jsdoc");
const env = require("./env");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "API Boilerplate",
      description: "Boilerplate to create amazing APIs",
      contact: {
        name: "Diego Lopes",
      },
    },
    host: `${env.appHost}:${env.appPort}`,
    basePath: "/api/v1",
    schemes: ["http"],
    tags: [
      {
        name: "Get started",
        description: "Everything that you need to get started",
      },
    ],
  },
  apis: ["./src/routes/**/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
