const express = require("express");
const { signup, signin, userProfile } = require("../controller/auth");
const {
  validateSignUpRequests,
  isRequestValidated,
  validateSignInRequests,
} = require("../validators/auth");
const router = express.Router();

router.post("/signup", validateSignUpRequests, isRequestValidated, signup);
router.post("/signin", validateSignInRequests, isRequestValidated, signin);

module.exports = router;
