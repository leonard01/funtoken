const express = require("express");
const fs = require("fs");
const path = require("path");
const signUpRoute = express.Router();

signUpRoute.post("/", (req, res) => {
  if (!fs.existsSync(path.resolve(__dirname, "../data/mockedData.json"))) {
    fs.closeSync(
      fs.openSync(path.resolve(__dirname, "../data/mockedData.json"), "w")
    );
  }
  // set username to lowercase
  const userNameLowercase = JSON.stringify(
    req.body.username
  ).toLocaleLowerCase();
  const newUserData = {
    username: JSON.parse(userNameLowercase),
    password: req.body.password,
  };
  console.log(newUserData);
  let usersjson = fs.readFileSync(
    path.resolve(__dirname, "../data/mockedData.json"),
    "utf-8"
  );

  //check if file is empty
  if (usersjson.length == 0) {
    //add data to json file
    fs.writeFileSync(
      path.resolve(__dirname, "../data/mockedData.json"),
      JSON.stringify([newUserData])
    );
  } else {
    // if account already exists, return error and exit
    const json = JSON.parse(usersjson.toString());
    if (
      json.find(({ username }) => username == JSON.parse(userNameLowercase))
    ) {
      res.status(400);
      res.json("An account already exists with this username");
      return;
    }
    // push new data to existing user json and write
    json.push(newUserData);
    fs.writeFileSync(
      path.resolve(__dirname, "../data/mockedData.json"),
      JSON.stringify(json)
    );
  }
  res.json("Sign Up Successful");
});

module.exports = signUpRoute;
