const assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/server");
// let expect = require("chai");

chai.use(chaiHttp);
var expect = chai.expect;

describe("#indexOf()", function () {
  it("should return -1 when the value is not present", function () {
    assert.equal([1, 2, 3].indexOf(4), -1);
  });
});

describe("/GET book", () => {
  it("it fail with incorrect login details", (done) => {
    const userData = { username: "incorrectUserName", password: "password" };
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

  it("it pass with no login details", (done) => {
    const userData = {};
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

  it("it pass with wrong password ", (done) => {
    const userData = {
      username: "correctUserName",
      password: "incorrectPassword",
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

  it("it pass with wrong username", (done) => {
    const userData = {
      username: "incorrectUserName",
      password: "correctPassword",
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

// async function setup() {}
