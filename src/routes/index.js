const express = require("express");
const router = express.Router();
const auth = require("./stravaauth");
const login = require("./stravalogin");

router.get("/stravaauth", auth);
router.get("/stravalogin", login);

module.exports = router;
