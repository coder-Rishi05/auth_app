const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.cookie("name", "rishi");
  res.send("done");
});

app.listen(3001, () => {
  console.log(`server running at : `, 3001);
});
