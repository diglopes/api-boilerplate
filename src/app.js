const express = require("express");
const setupMiddlewares = require("./config/setupMiddlewares");
const routes = require("./routes");

function createApp() {
  console.log(">> Starting app...");
  const app = express();
  setupMiddlewares.preRoutes(app);
  app.use("/api", routes);
  setupMiddlewares.postRoutes(app);

  function start(port) {
    return app.listen(port, () => {
      console.log(`>> Server running on port ${port}`);
    });
  }

  return {
    start,
  };
}

module.exports = createApp;
