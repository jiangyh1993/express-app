var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var multer = require("multer");

var app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var createFolder = function(folder) {
  try {
    fs.accessSync(folder);
  } catch (e) {
    fs.mkdirSync(folder);
  }
};
var uploadFolder = "./upload/";
createFolder(uploadFolder);

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage });

app.get("/", function(req, res) {
  console.dir(req.query);
  res.send("home page: ");
});

app.get("/form", function(req, res) {
  var form = fs.readFileSync("./form.html", { encoding: "utf8" });
  res.send(form);
});

app.get("/profile/:id", function(req, res) {
  res.send("you request id is: " + req.params.id);
});

app.post("/", function(req, res) {
  console.dir(req.body);
  res.send("ok");
});

app.post("/upload", upload.single("yuhui"), function(req, res) {
  console.dir(req.file);
  res.send({ ret_code: 0 });
});

app.listen(3000);
console.log("listening to port 3000");
