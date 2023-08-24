const express = require("express");
const fs = require("fs");
const path = require("path");
const signUpRoute = express.Router();

var passwordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
); //min 8 chars, at least one special, one upper, one lower & a number

var userNameRegex = new RegExp(/^.{6,}$/); // min 6 chars

signUpRoute.post("/", (req, res) => {
  if (!fs.existsSync(path.resolve(__dirname, "../data/mockedData.json"))) {
    fs.closeSync(
      fs.openSync(path.resolve(__dirname, "../data/mockedData.json"), "w")
    );
  }

  if (!isValidRegex(passwordRegex, req.body.password)) {
    res.status(400);
    res.json(
      "Invalid password. Password must 8 characters or longer, at least one special, one uppercase, one lowercase character and one number"
    );
    return;
  }

  if (!isValidRegex(userNameRegex, req.body.username)) {
    res.status(400);
    res.json("Invalid username. Username must be 6 characters or more");
    return;
  }

  const userNameLowercase = req.body.username.toLowerCase();

  //creates new user data JSON
  const newUserData = {
    username: userNameLowercase,
    password: req.body.password,
  };

  // reads existing user data json file
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
    const json = JSON.parse(usersjson);
    if (json.find(({ username }) => username == userNameLowercase)) {
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

// checks if regex is valid
function isValidRegex(regex, password) {
  return regex.test(password);
}

module.exports = signUpRoute;
