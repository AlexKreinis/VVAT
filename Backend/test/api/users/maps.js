const expect = require("chai").expect;
const request = require("supertest");
const app = require("../../../server.js");
const connectDB = require("../../../config/db");

describe("Get maps", () => {
  before((done) => {
    connectDB();
  });
});

let authToken;

it("OK. register new user for maps", (done) => {
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

it("OK. loginuser for maps", (done) => {
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

it("OK. get maps", (done) => {
  request(app)
    .get("/api/maps/getmaps")
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property("data");
      done();
    })
    .catch((err) => done(err));
});

it("OK. got schedule", (done) => {
  request(app)
    .get("/api/maps/getevents/100/200") //<--STATIC VARS
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property("events");
      done();
    })
    .catch((err) => done(err));
});

it("OK. added event", (done) => {
  request(app)
    .post("/api/maps/addevent")
    .set({ "x-auth-token": authToken })
    .send({
      lat: "14",
      lon: "14",
      name: "testAddevent",
      start: "12:00",
      end: "14:00",
    })
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property("msg");
      done();
    })
    .catch((err) => done(err));
});

it("OK. get rating for event", (done) => {
  request(app)
    .get("/api/maps/getratings/111111111111111111111111")
    .set({ "x-auth-token": authToken })
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property("rating");
      done();
    })
    .catch((err) => done(err));
});

it("OK. deleteuser for maps", (done) => {
  request(app)
    .delete("/api/auth/delete/testname@mail.com")
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property("msg");
      done();
    })
    .catch((err) => done(err));
});
