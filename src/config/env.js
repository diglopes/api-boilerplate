const { config } = require("dotenv");
const path = process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev";
config({ path });

module.exports = {
  environment: process.env.NODE_ENV,
  appPort: process.env.APP_PORT || 3000,
};
