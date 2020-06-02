var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var fileupload = require("express-fileupload");
app.use(fileupload());

var mysql = require("mysql");

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(function (req, res, next) {
  console.log("URL  is :", req.url);
  next();
});

// connection configurations
var dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "EmployeeDB",
});

// connect to database
dbConn.connect();

// default route
app.get("/", function (req, res) {
  return res.send({ error: true, message: "hello" });
});

// Retrieve all users
app.get("/information", function (req, res) {
  dbConn.query("SELECT * FROM employee", function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "Complete Data." });
  });
});

// Retrieve user with id(GET)
app.get("/mydata/:id", function (req, res) {
  let id = req.params.id;

  if (!id) {
    return res.status(400).send({ error: true, message: "Please provide id" });
  }

  dbConn.query("SELECT * FROM employee where EmpId=?", id, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results[0],
      message: "Information by ID.",
    });
  });
});

// Add a new Record(POST)
app.post("/adduser", function (req, res) {
  let fname = req.body.fname;
  let lname = req.body.lname;
  let salary = req.body.salary;
  console.log(fname + " " + lname + " " + salary);
  if (!fname && !lname && !salary) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide Information to be add" });
  }

  dbConn.query(
    "INSERT INTO employee(fname, lname,salary) value(?,?,?) ",
    [fname, lname, salary],
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "Record has been added",
      });
    }
  );
});

//  Update user with id
app.put("/update", function (req, res) {
  let id = req.body.id;
  let fname = req.body.fname;
  let lname = req.body.lname;
  let salary = req.body.salary;
  if (!id || !fname || !lname || !salary) {
    return res.status(400).send({
      error: true,
      message: "Please provide full information with id",
    });
  }

  dbConn.query(
    "UPDATE employee SET fname = ?, lname= ?,salary=? WHERE EmpID = ?",
    [fname, lname, salary, id],
    function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: "data updated" });
    }
  );
});

// Delete user
app.delete("/deleteuser", function (req, res) {
  let id = req.body.id;

  if (!id) {
    return res.status(400).send({ error: true, message: "Please provide id" });
  }
  dbConn.query("DELETE FROM employee WHERE EmpId = ?", [id], function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: "User Data has been deleted",
    });
  });
});

//File Upload
app.post("/upload", function (req, res) {
  const file = req.files.fileup;
  file.mv("./RESTCRUD" + file.name, function (err, result) {
    if (err) throw err;

    res.send({
      success: true,
      message: "File Uploaded",
    });
  });
});

// set port
app.listen(3000, function () {
  console.log("Node app is running on port 3000");
});
module.exports=app;