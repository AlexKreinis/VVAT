const expect = require("chai").expect;
const request = require("supertest");

const app = require("../../../server.js");
const connectDB = require("../../../config/db");

it("OK. getUserProfile", (done) => {
  request(app)
    .get("/api/profile/finduserprofile/:t@m.com")
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property("other");
      done();
    })
    .catch((err) => done(err));
});

it("OK. Create user,Create event, Get event history", (done) => {
  let authToken;
  request(app)
    .post("/api/auth/register")
    .send({ name: "testname", email: "testname@mail.com", password: "123456" })
    .then((res) => {
      const body = res.body;
      authToken = body.token;
      expect(body).to.contain.property("token");
      done();
    })
    .catch((err) => done(err));
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
  request(app)
    .get("/api/profile/eventhistory")
    .set({ "x-auth-token": authToken })
    .then((res) => {
      //console.log(res.body);
      expect(body).to.contain.property("eventHistory");
      done();
    })
    .catch((err) => done(err));
  request(app)
    .delete("/api/auth/delete/testname@mail.com")
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property("msg");
      done();
    })
    .catch((err) => done(err));
});
