var express = require("express");
var router = express.Router();

var multer = require("multer");

var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    const path = req.body.path;
    callback(null, path);
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now());
  }
});
var upload = multer({ storage: storage }).any();

router.post("/upload", function(req, res) {
  upload(req, res, function(err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    const path = req.body.path;
    let files = dirTree(path, {});
    res.send(files);
  });
});

function dirTree(filename) {
  var fs = require("fs");
  var path = require("path");

  var stats = fs.lstatSync(filename),
    info = {
      path: filename,
      src: filename.split("public/")[1],
      name: path.basename(filename)
    };

  if (stats.isDirectory()) {
    info.type = "folder";
    info.children = fs.readdirSync(filename).map(function(child) {
      return dirTree(filename + "/" + child);
    });
  } else {
    info.type = "file";
  }

  return info;
}

router.post("/files", function(req, res, next) {
  const publicFolder = "./public/media";
  const path = req.body.path;
  let files = dirTree(path, {});

  res.send(files);
});

module.exports = router;
