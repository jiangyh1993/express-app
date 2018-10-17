var express = require("express");
var app = express();

app.use(express.static("public"));

app.use(function(req, res, next) {
  console.log("first middleware");
  next();
});

app.use(function(req, res, next) {
  console.log("second middleware");
  next();
  res.send("ok");
});

// app.get("/", function(req, res, next) {
//   res.send("ok");
// });

app.listen(3000);
