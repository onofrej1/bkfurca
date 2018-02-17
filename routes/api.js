var express = require("express");
var router = express.Router();
const mysql = require("mysql");
var models = require("./../models");

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

router.put("/:model/:id", function(req, res, next) {
  let data = req.body;
  let model = getModel(req);

  model
    .findOne({ where: { id: req.params.id } })
    .then(obj =>
      obj
        .update(data, { fields: obj.attributes })
        .then(callback.bind(null, req, res))
    );
});

router.post("/:model", function(req, res, next) {
  let data = req.body;
  let model = getModel(req);

  model.create(data).then(callback.bind(null, req, res));
});

function callback(req, res, obj, err) {
  if (err) {
    return res.json(err);
  } else {
    const model = req.params.model;
    if (model == "Article") {
      return obj.setTags(req.body.tags).then(obj => res.json(obj));
    }

    if (model == "User") {
      return obj.setRoles(req.body.roles).then(obj => res.json(obj));
    }
    return res.json(obj);
  }
}

module.exports = router;
