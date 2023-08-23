const express = require("express");
const loginRoute = express.Router();
const fs = require("fs");
const path = require("path");

loginRoute.post("/", (req, res) => {
  if (fs.existsSync(path.resolve(__dirname, "../data/mockedData.json"))) {
    let users = fs.readFileSync(
      path.resolve(__dirname, "../data/mockedData.json"),
      "utf-8"
    );
    const usersJson = JSON.parse(users.toString());
    // iterate over usersJsons to match username/password
    for (i in usersJson) {
      if (usersJson[i].username == req.body.username) {
        if (usersJson[i].password == req.body.password) {
          res.json("Login Successful");
          return;
        }
      }
    }
    //if no match found we return error
    res.status(401);
    res.json("Incorrect Username/Password3");
    return;
  } else {
    // if file does not exist then no usernames/passwords exist
    res.status(401);
    res.json("Incorrect Username/Password4");
  }
});

module.exports = loginRoute;
