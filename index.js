let express = require("express");
let port = 8004;
let app = express();
let path = require("path");
let fs = require("fs");

// let db = require('./cofig/mongoose');

let mongoose = require("mongoose");
const connectionString =
  "mongodb+srv://janak_khokhar:janak123456@cluster0.3kzcmtj.mongodb.net/batch";
mongoose
  .connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Database connected."))
  .catch((err) => console.log(err));
let Student = require("./models/Student");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());

// image
app.use("/upload", express.static(path.join(__dirname, "upload")));
// end

app.use("/", require("./routes"));
app.use("/post", require("./routes/post"));

app.listen(port, function (err) {
  if (err) {
    console.log("db not conntect");
  }
  console.log("db running sunccess");
});
