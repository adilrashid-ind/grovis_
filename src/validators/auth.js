const { check, validationResult } = require("express-validator");

exports.validateSignUpRequests = [
  check("firstName").notEmpty().withMessage("First Name is Required"),
  check("lastName").notEmpty().withMessage("Last Name is Required"),
  check("email").isEmail().withMessage("valid email  is Required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password Must Be 6 digit"),
];

exports.validateSignInRequests = [
  check("email").isEmail().withMessage("valid email  is Required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password Must Be 6 digit"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
