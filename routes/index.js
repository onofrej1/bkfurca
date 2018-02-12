var express = require("express");
var router = express.Router();
let jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var { verifyPermission } = require("jwt-permissions");

const mysql = require("mysql");
var models = require("./../models");

router.post("/register", function(req, res) {
  let User = models.User;
  let data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  bcrypt.hash(data.password, 10, function(err, hash) {
    User.create(Object.assign(data, { password: hash })).then(u =>
      res.send("user created", u)
    );
  });
  res.send(data);
});

router.post("/login", function(req, res) {
  var UserModel = models.User;
  UserModel.findOne({
    where: { email: req.body.email },
    include: { model: models.Role, as: "Roles" }
  }).then(user => {
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result == true) {
          let token = jwt.sign({ user }, "pwd", {});
          res.json({ error: false, token, user });
        } else {
          res.json({ error: true, errorMessage: "Wrong credentials." });
        }
      });
    } else {
      res.json({ error: true, errorMessage: "Wrong credentials no user." });
    }
  });
});

/*function jwtDecode(t) {
  let token = {};
  token.raw = t;
  token.header = JSON.parse(window.atob(t.split(".")[0]));
  token.payload = JSON.parse(window.atob(t.split(".")[1]));
  return token;
}*/

/*router.get("/getRoles", function(req, res) {
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  jwt.verify(token, "pwd", (error, payload) => {
    if (error) {
      return res.status(403).send({
        error: true
      });
    } else {
      return res.json(payload.roles);
    }
  });
});*/

module.exports = router;
