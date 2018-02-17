var express = require("express");
var router = express.Router();

var models = require("./../models");

router.get("/results/:eventId", function(req, res) {
  models.Result.findAll({
    where: { event_id: req.params.eventId },
    include: "Runner"
  }).then((data, error) => res.send(data));
});

module.exports = router;
