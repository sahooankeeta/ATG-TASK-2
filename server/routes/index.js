const express = require("express");
const router = express.Router();
router.use("/post", require("./post.js"));
router.use("/comment", require("./comment.js"));
router.use("/user", require("./user.js"));
module.exports = router;
