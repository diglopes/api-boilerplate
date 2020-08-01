const router = require("express").Router();
const helloRoute = require("./v1/helloRoute");

router.use("/v1", helloRoute);

module.exports = router;
