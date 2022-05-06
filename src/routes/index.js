const express = require("express");
const router = express.Router();
const auth = require("./stravaauth")

router.get("/stravaauth", auth);
module.exports = router;
