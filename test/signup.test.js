const fs = require("fs");
const path = require("path");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/server");
const expect = chai.expect;
chai.use(chaiHttp);

const jsonPath = "../data/mockedData.json";
const validUserName1 = "test@test.com";
const validUserName2 = "validuser";
const validUserName3 = "user123";
const validUserName4 = "1234user!";
const validPassword1 = "Password1!";
const validPassword2 = "PASSWORd22&";
const validPassword3 = "!!()1pASSworD";
const validPassword4 = '"PassworDis$!Valid4';
const invalidUserName1 = "user";
const invalidUserName2 = "user1";
const invalidPassword1 = "password";
const invalidPassword2 = "password1";
const invalidPassword3 = "password!2";
const invalidPassword4 = "pass!P";
const invalidPassword5 = "PASSWORD!1";
const invalidPassword6 = "!@#$%^!!!!!!$2";
const duplicateUser = "sameuser";

describe("Test signup", () => {
  before(() => {
    setup(); //checks for json file and adds required mocked data
  });

  after(() => {
    cleanup(); // delete json data
  });

  it("should pass with valid signup creds 1", (done) => {
    const userData = { username: validUserName1, password: validPassword1 };
    chai
      .request(server)
      .post("/signup")
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.contain("Sign Up Successful");
        expect(err).to.equal(null);
        done();
      });
  });

  it("should pass with valid signup creds 2", (done) => {
    const userData = { username: validUserName2, password: validPassword2 };
    chai
      .request(server)
      .post("/signup")
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.contain("Sign Up Successful");
        expect(err).to.equal(null);
        done();
      });
  });

  it("should pass with valid signup creds 3", (done) => {
    const userData = { username: validUserName3, password: validPassword3 };
    chai
      .request(server)
      .post("/signup")
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.contain("Sign Up Successful");
        expect(err).to.equal(null);
        done();
      });
  });

  it("should pass with valid signup creds 4", (done) => {
    const userData = { username: validUserName4, password: validPassword4 };
    chai
      .request(server)
      .post("/signup")
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.contain("Sign Up Successful");
        expect(err).to.equal(null);
        done();
      });
  });

  it("should fail no username", (done) => {
    const userData = {
      username: "",
      password: validPassword1,
    };
    chai
      .request(server)
      .post("/signup")
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.contain(
          "Invalid username. Username must be 6 characters or more"
        );
        done();
      });
  });

  it("should fail no password", (done) => {
    const userData = {
      username: validUserName1,
      password: "",
    };
    chai
      .request(server)
      .post("/signup")
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.contain(
          "Invalid password. Password must 8 characters or longer, at least one special, one uppercase, one lowercase character and one number"
        );
        done();
      });
  });

  it("should fail no password or username", (done) => {
    const userData = {
      username: "",
      password: "",
    };
    chai
      .request(server)
      .post("/signup")
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.contain(
          "Invalid password. Password must 8 characters or longer, at least one special, one uppercase, one lowercase character and one number"
        );
        done();
      });
  });

  it("should fail with invalid password 1", (done) => {
    const userData = {
      username: validUserName1,
      password: invalidPassword1,
    };
    chai
      .request(server)
      .post("/signup")
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.contain(
          "Invalid password. Password must 8 characters or longer, at least one special, one uppercase, one lowercase character and one number"
        );
        done();
      });
  });

  it("should fail with invalid password 2", (done) => {
    const userData = {
      username: validUserName1,
      password: invalidPassword2,
    };
    chai
      .request(server)
      .post("/signup")
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.contain(
          "Invalid password. Password must 8 characters or longer, at least one special, one uppercase, one lowercase character and one number"
        );
        done();
      });
  });

  it("should fail with invalid password 3", (done) => {
    const userData = {
      username: validUserName1,
      password: invalidPassword3,
    };
    chai
      .request(server)
      .post("/signup")
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.contain(
          "Invalid password. Password must 8 characters or longer, at least one special, one uppercase, one lowercase character and one number"
        );
        done();
      });
  });

  it("should fail with invalid password 4", (done) => {
    const userData = {
      username: validUserName1,
      password: invalidPassword4,
    };
    chai
      .request(server)
      .post("/signup")
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.contain(
          "Invalid password. Password must 8 characters or longer, at least one special, one uppercase, one lowercase character and one number"
        );
        done();
      });
  });

  it("should fail with invalid password 5", (done) => {
    const userData = {
      username: validUserName1,
      password: invalidPassword5,
    };
    chai
      .request(server)
      .post("/signup")
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.contain(
          "Invalid password. Password must 8 characters or longer, at least one special, one uppercase, one lowercase character and one number"
        );
        done();
      });
  });

  it("should fail with invalid password 6", (done) => {
    const userData = {
      username: validUserName1,
      password: invalidPassword6,
    };
    chai
      .request(server)
      .post("/signup")
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.contain(
          "Invalid password. Password must 8 characters or longer, at least one special, one uppercase, one lowercase character and one number"
        );
        done();
      });
  });

  it("should fail with invalid username 1", (done) => {
    const userData = {
      username: invalidUserName1,
      password: validPassword1,
    };
    chai
      .request(server)
      .post("/signup")
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.contain(
          "Invalid username. Username must be 6 characters or more"
        );
        done();
      });
  });

  it("should fail with invalid username 2", (done) => {
    const userData = {
      username: invalidUserName2,
      password: validPassword1,
    };
    chai
      .request(server)
      .post("/signup")
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.contain(
          "Invalid username. Username must be 6 characters or more"
        );
        done();
      });
  });

  it("should fail with already used username", (done) => {
    const userData = {
      username: duplicateUser,
      password: validPassword1,
    };
    chai
      .request(server)
      .post("/signup")
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.contain(
          "An account already exists with this username"
        );
        done();
      });
  });
});

function setup() {
  const duplicateUserData = [
    { username: duplicateUser, password: validPassword1 },
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
  fs.writeFileSync(
    path.resolve(__dirname, jsonPath),
    JSON.stringify(duplicateUserData)
  );
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
