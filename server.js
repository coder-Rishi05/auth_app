const cookieParser = require("cookie-parser");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();
const userModel = require("./models/userModel");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { h: "hello" });
});

app.post("/create", (req, res) => {
  let { userName, email, password, age } = req.body;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, async function (err, hash) {
      let ceratedUser = await userModel.create({
        userName,
        email,
        password: hash,
        age,
      });
      let token = jwt.sign({ email }, "heyThere");
      res.cookie("token", token);
      res.send(ceratedUser);
    });
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return res.send("Something went wrong");
  }
  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (result) {
      let token = jwt.sign({ email: user.email }, "heyThere");
      res.cookie("token", token);
      res.send("you can login");
    } else res.send("you can'nt login");
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

app.listen(3001, () => {
  console.log(`server running at : `, 3001);
});
