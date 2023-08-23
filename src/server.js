const express = require("express");
const bodyParser = require("body-parser");

const signupRouter = require("../routes/signup");
const loginRouter = require("../routes/login");

const PORT = 3000;
const HOST_NAME = "0.0.0.0";

const app = express();
app.use(express.static("client"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/signup", signupRouter);
app.use("/login", loginRouter);

app.listen(PORT, HOST_NAME, () => {
  console.log(`Server running at ${HOST_NAME}:${PORT}`);
});

module.exports = app;
