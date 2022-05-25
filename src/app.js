const express = require("express"); //load express moduleconst app = express()
const app = express();

const middleware = require("../src/routes");

app.use("/strava", middleware);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

module.exports = app;
