const router = require("express").Router();
const apiResponse = require("../../utils/apiResponse");
const { Joi, validate } = require("express-validation");

const helloSchema = {
  query: Joi.object({
    name: Joi.required(),
  }),
};

router.route("/hello").get(validate(helloSchema), (req, res) => {
  const { name } = req.query;
  res.json(apiResponse("FETCH", { working: true, msg: "Hello world", name }));
});

module.exports = router;
