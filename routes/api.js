var express = require("express");
var router = express.Router();
const mysql = require("mysql");
var models = require("./../models");

/*var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "furca2",
  port: "3306",
  socketPath: "/var/run/mysqld/mysqld.sock"
});*/

/**
 * RestController
 *
 * @description :: Server-side logic for managing models
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

function getRelations(model) {
  let relations = [];
  const keys = Object.keys(model.associations);

  for (let i in keys) {
    let target = model.associations[keys[i]].target;
    let alias = model.associations[keys[i]].options.as;

    let obj = alias ? { as: alias } : {};
    relations.push(Object.assign({ model: target }, obj));
  }
  return relations;
}

function getModel(req) {
  let name = req.params.model;
  name = name.charAt(0).toUpperCase() + name.slice(1);

  return models[name];
}

router.get("/:model", function(req, res) {
  var model = getModel(req);

  const include = getRelations(model);
  model.findAll({ include }).then(data => {
    res.send(data);
  });
});

router.get("/:model/fields", function(req, res) {
  res.send(getModel(req).attributes);
});

router.put("/:modelName/:id", function(req, res, next) {
  let data = req.body.model;
  let model = getModel(req);

  model
    .findOne({ where: { id: req.params.id } })
    .then(obj => {
      obj.update(data, { fields: obj.attributes });
      return obj;
    })
    .then(obj => savePivotRelations(obj, model, data));
});

router.post("/:modelName", function(req, res, next) {
  let data = req.body.model;
  let model = getModel(req);

  model
    .create(data)
    .then(result => {
      return result;
    })
    .then(obj => savePivotRelations(obj, model, data));
});

function savePivotRelations(obj, model, data) {
  const keys = Object.keys(model.associations);
  for (let i in keys) {
    let assoc = model.associations[keys[i]];
    if (assoc.associationType == "BelongsToMany") {
      let alias = assoc.options.as;
      obj["set" + alias](data[alias]);
      obj.save();
    }
  }
  res.send("ok");
}

function callback(res, err, data) {
  if (err) {
    console.log(err);
    return res.json(err);
  } else {
    //console.log(data);
    return res.json(data);
  }
}

module.exports = router;
