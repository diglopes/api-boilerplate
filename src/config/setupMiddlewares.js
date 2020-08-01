const limiter = require("../middlewares/limiter");
const cors = require("cors");
const bodyParser = require("express").json;
const xssFilter = require("x-xss-protection");
const logger = require("morgan");
const helmet = require("helmet");
const error = require("../middlewares/error");

const setupMiddlewares = {
  preRoutes: function (app) {
    app.use(limiter);
    app.use(xssFilter());
    app.use(helmet());
    app.use(cors());
    app.use(bodyParser());
    app.use(logger("dev"));
  },
  postRoutes: function (app) {
    app.use(error.converter);
    app.use(error.notFound);
    app.use(error.handler);
  },
};

module.exports = setupMiddlewares;
