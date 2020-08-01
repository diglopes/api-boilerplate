const createApp = require("./app");
const env = require("./config/env");

async function init() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  try {
    const app = createApp();
    console.log(process.env);
    app.start(env.appPort);
  } catch (error) {
    console.log(error);
  }
}

init();
