const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(fileUpload());
app.use(cookieParser());

app.use(cors());

app.use(express.static("public"));

// db-connection
require("./app/config/dbConfig");

// routes
app.use(require("./app/routes/route.auth"));


app.use("/blog", require("./app/routes/route.blog"));
app.use("/user", require("./app/routes/route.user"));

app.use(require("./app/middlewares/middleware.verifyJWT"));
app.use(require("./app/middlewares/middlware.isAdmin"));

app.get("/", (req, res) => {
  res.send("Hello World");
});



app.listen(3000, () => {
  console.log("Server on port 3000");
});
