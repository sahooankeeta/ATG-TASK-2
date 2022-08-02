const express = require("express");
const router = express.Router();

const { signin, signup, forgetPassword } = require("../controllers/user.js");

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/forgetPassword", forgetPassword);
module.exports = router;
