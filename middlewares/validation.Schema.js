
const {body} = require("express-validator")

const validationSchema = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("title is require")
      .isLength({ min: 2 }),
    body("price").notEmpty().withMessage("price is empty"),
  ];
};

module.exports = validationSchema;