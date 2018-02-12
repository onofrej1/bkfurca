/*
router.post("/:table/savexx", function(req, res, next) {
  let data = req.body.model;
  let table = req.params.table;

  getColumns(table, function(err, result) {
    let columns = result.map(col => col.Field);
    saveData(table, data, columns);
  });

  res.send({ status: "ok" });
});

function saveData(table, data, columns) {
  console.log(data);
  let divider = "";
  let values = "";
  let query = "";
  let pivot = {};
  for (let key in data) {
    let value = data[key];
    if (value instanceof Array) {
      pivot[data[key]] = value;
      connection.query('delete from '+key+' where', function(err, rows) {
        console.log("many error", err);
      });
      for (let i in value) {
        query =
          "insert into " + key + " values (" + data.id + "," + value[i] + ")";
        console.log(query);*/
        /*connection.query(query, function(err, rows) {
          console.log("many error", err);
        });
      }
      continue;
    }
    if (columns.indexOf(key) !== -1) {
      values += divider + " " + key + "='" + data[key] + "'";
      divider = ",";
    }
  }
  if (data.id) {
    query = "update " + table + " set " + values + " where id=" + data.id;
  } else {
    query = "insert into " + table + " set " + values;
  }
  console.log(query);

  connection.query(query, function(err, rows) {
    console.log(err);
  });
}
*/

/*router.get("/:table", function(req, res, next) {
  let table = req.params.table;

  getData(table, function(err, data) {
    res.send(data);
  });
});*/

/*router.get("/:table/columns", function(req, res, next) {
  let table = req.params.table;

  getColumns(table, function(err, data) {
    console.log(err);
    let columns = data.map(col => col.Field);
    res.send(columns);
  });
});*/

function getData(table, callback) {
  connection.query("SELECT * FROM " + table, function(err, rows) {
    callback(err, rows);
  });
}

function getColumns(table, callback) {
  return [];
  connection.query("SHOW COLUMNS FROM " + table, function(err, rows) {
    callback(err, rows);
  });
}
