const assert = require("assert");
const fs = require("fs");
const path = require("path");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/server");
const app = require("../src/server");
const expect = chai.expect;
chai.use(chaiHttp);

const jsonPath = "../data/mockedData.json";
const validUserName1 = "test@test.com";
const validUserName2 = "validuser";
const validUserName3 = "user123";
const validUserName4 = "1234user!";
const validPassword1 = "Password1!";
const validPassword2 = "PASSWORd22&";
const validPassword3 = "!!()pASSworD";
const validPassword4 = '"PassworDis$!Valid4';

describe("Test login", () => {
  before(() => {
    setup(); // userData to json file
  });

  after(() => {
    cleanup(); // delete json data
  });

  it("should pass with valid login creds 1", (done) => {
    const userData = { username: validUserName1, password: validPassword1 };
    chai
      .request(server)
      .post("/login")
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.contain("Login Successful");
        expect(err).to.equal(null);
        done();
      });
  });

  it("should pass with valid login creds 2", (done) => {
    const userData = { username: validUserName2, password: validPassword2 };
    chai
      .request(server)
      .post("/login")
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.contain("Login Successful");
        expect(err).to.equal(null);
        done();
      });
  });

  it("should pass with valid login creds 3", (done) => {
    const userData = { username: validUserName3, password: validPassword3 };
    chai
      .request(server)
      .post("/login")
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.contain("Login Successful");
        expect(err).to.equal(null);
        done();
      });
  });

  it("should pass with valid login creds 4", (done) => {
    const userData = { username: validUserName4, password: validPassword4 };
    chai
      .request(server)
      .post("/login")
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.contain("Login Successful");
        expect(err).to.equal(null);
        done();
      });
  });

  it("should it fail when mixing username and password from different users", (done) => {
    const userData = {
      username: validUserName2,
      password: validPassword1,
    };
    chai
      .request(server)
      .post("/login")
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.text).to.contain("Incorrect Username/Password");
        done();
      });
  });

  it("should it fail no username", (done) => {
    const userData = {
      username: "",
      password: validPassword1,
    };
    chai
      .request(server)
      .post("/login")
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.text).to.contain("Incorrect Username/Password");
        done();
      });
  });

  it("should it fail no password", (done) => {
    const userData = {
      username: validUserName1,
      password: "",
    };
    chai
      .request(server)
      .post("/login")
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.text).to.contain("Incorrect Username/Password");
        done();
      });
  });
});

function setup() {
  const userData = [
    { username: validUserName1, password: validPassword1 },
    { username: validUserName2, password: validPassword2 },
    { username: validUserName3, password: validPassword3 },
    { username: validUserName4, password: validPassword4 },
  ];

  if (fs.existsSync(path.resolve(__dirname, jsonPath))) {
    try {
      fs.unlinkSync(path.resolve(__dirname, jsonPath));
    } catch (err) {
      console.error(err);
    }
    fs.closeSync(fs.openSync(path.resolve(__dirname, jsonPath), "w"));
  } else {
    fs.closeSync(fs.openSync(path.resolve(__dirname, jsonPath), "w"));
  }
  fs.writeFileSync(path.resolve(__dirname, jsonPath), JSON.stringify(userData));
}

function cleanup() {
  if (fs.existsSync(path.resolve(__dirname, jsonPath))) {
    try {
      fs.unlinkSync(path.resolve(__dirname, jsonPath));
    } catch (err) {
      console.error(err);
    }
    fs.closeSync(fs.openSync(path.resolve(__dirname, jsonPath), "w"));
  }
}
