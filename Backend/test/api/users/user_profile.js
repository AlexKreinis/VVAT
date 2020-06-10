const expect = require("chai").expect;
const request = require("supertest");

const app = require("../../../server.js");
const connectDB = require("../../../config/db");
let authToken;

describe("Register user", () => {
  before((done) => {
    connectDB();
  });
});

it("OK. register new user first", (done) => {
  request(app)
    .post("/api/auth/register")
    .send({ name: "testname", email: "testname@mail.com", password: "123456" })
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property("token");
      done();
    })
    .catch((err) => done(err));
});

it("OK. loginuser", (done) => {
  request(app)
    .post("/api/auth/login")
    .send({ email: "testname@mail.com", password: "123456" })
    .then((res) => {
      const body = res.body;
      authToken = body.token;
      expect(body).to.contain.property("token");
      done();
    })
    .catch((err) => done(err));
});

it("OK. editprofile", (done) => {
  request(app)
    .post("/api/profile/saveprofile")
    .send({ name: "testnameedit", description: "testdesc" })
    .set({ "x-auth-token": authToken })
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property("user");
      done();
    })
    .catch((err) => done(err));
});

it("OK. getprofile", (done) => {
  request(app)
    .get("/api/auth/getuser")
    .set({ "x-auth-token": authToken })
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property("user");
      done();
    })
    .catch((err) => done(err));
});

it("OK. get event history", (done) => {
  request(app)
    .get("/api/profile/eventhistory")
    .set({ "x-auth-token": authToken })
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property("eventHistory");
      done();
    })
    .catch((err) => done(err));
});

it("OK. getUserProfile", (done) => {
  request(app)
    .get("/api/profile/finduserprofile/testname@mail.com")
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property("other");
      done();
    })
    .catch((err) => done(err));
});

it("OK. deleteuser", (done) => {
  request(app)
    .delete("/api/auth/delete/testname@mail.com")
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property("msg");
      done();
    })
    .catch((err) => done(err));
});
