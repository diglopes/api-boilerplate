const xssFilter = require("x-xss-protection");
const bodyParser = require("express").json;
const cors = require("cors");
const logger = require("morgan");
const helmet = require("helmet");
const swaggerUI = require("swagger-ui-express");
const swaggerDocs = require("./swagger");
const limiter = require("../middlewares/limiter");
const error = require("../middlewares/error");

const setupMiddlewares = {
  preRoutes: function (app) {
    app.use(limiter);
    app.use(xssFilter());
    app.use(helmet());
    app.use(cors());
    app.use(bodyParser());
    app.use(logger("dev"));
    app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
  },
  postRoutes: function (app) {
    app.use(error.converter);
    app.use(error.notFound);
    app.use(error.handler);
  },
};

module.exports = setupMiddlewares;
