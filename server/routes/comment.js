const express = require("express");
const router = express.Router();

const { create } = require("../controllers/comment.js");

router.post("/create", create);

module.exports = router;
