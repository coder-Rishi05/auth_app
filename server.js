const cookieParser = require("cookie-parser");
const express = require("express");
const bcrypt = require("bcrypt");

const app = express();

app.use(cookieParser());
app.get("/", (req, res) => {
  res.cookie("name", "rishi");
  res.send("done");
});
app.get("/read", (req, res) => {
  console.log(req.cookies);
  res.send("read page");
});

app.listen(3001, () => {
  console.log(`server running at : `, 3001);
});
