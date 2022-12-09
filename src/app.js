const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// origin: "https://onetouch-vectorux.herokuapp.com/",
const corsOptions = {
  origin: true,
  // origin: "https://one-touch-gyy5.onrender.com/",

  credentials: true,
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log("cookies", req.headers?.cookie);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );

  req.setHeader("cookie", req.headers?.cookie);
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(bodyParser.json());

const AuthRoute = require("./routes/auth");
const getStudentInfo = require("./routes/getStudentInfo");
const mailSendRoute = require("./routes/mailsend");
const simpleRoute = require("./routes/simple_routes");
// app.get("/", (req, res) => {
//   res.send("hello");
// });
app.use("/api", AuthRoute);
app.use("/api/student", getStudentInfo);
app.use("/api/mailsend", mailSendRoute);
app.use("/api/simple", simpleRoute);

app.use("/uploads", express.static(path.join("uploads")));

require("./db/conn");

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV == "production") {
  const path = require("path");
  app.use(express.static(path.join("client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("client/build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
