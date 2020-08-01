const router = require("express").Router();
const apiResponse = require("../../utils/apiResponse");
const { Joi, validate } = require("express-validation");

const helloSchema = {
  query: Joi.object({
    name: Joi.required(),
  }),
};

/**
 * @swagger
 * /hello:
 *   get:
 *     description: Hello from application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Your name
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Ok
 *       400:
 *         description: Bad request
 */
router.route("/hello").get(validate(helloSchema), (req, res) => {
  const { name } = req.query;
  res.json(apiResponse("FETCH", { working: true, msg: "Hello world", name }));
});

module.exports = router;
